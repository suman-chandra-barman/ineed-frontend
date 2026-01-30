# Booking Process Documentation

## Overview

This booking system implements a comprehensive 5-step booking flow for service reservations. The system follows best practices for React/Next.js development with TypeScript, form validation, and component modularity.

## Architecture

### Components Structure

```
src/
├── components/
│   └── Booking/
│       ├── BookingModal.tsx              # Main modal container
│       ├── AdditionalFeaturesStep.tsx    # Step 1: Select add-on services
│       ├── ServicingInformationStep.tsx  # Step 2: Customer & location info
│       ├── DateTimeStep.tsx              # Step 3: Date & time selection
│       ├── PaymentStep.tsx               # Step 4: Payment & order summary
│       └── ConfirmationStep.tsx          # Step 5: Booking confirmation
├── types/
│   └── booking.type.ts                   # TypeScript interfaces
└── schemas/
    └── booking.schema.ts                 # Zod validation schemas
```

## Booking Flow

### Step 1: Additional Features (15% Complete)

- **Purpose**: Allow users to select optional add-on services
- **Features**:
  - Display list of available additional services
  - Show service image, name, description, price, and duration
  - Toggle selection with visual feedback
  - Calculate total additional cost
  - Summary of selected services

### Step 2: Servicing Information (30% Complete)

- **Purpose**: Collect customer details and service location
- **Form Fields**:
  - Full Name (required)
  - Email Address (required, validated)
  - Contact Number (required, min 10 digits)
  - State (required, dropdown with all US states)
  - Zip Code (required, min 5 characters)
  - Notes (optional, textarea)
  - Number of Bedrooms (optional)
  - Approximate Square Footage (optional)
- **Validation**: Uses React Hook Form + Zod for robust validation
- **Features**:
  - Real-time validation
  - Error messages below fields
  - Previous button to go back

### Step 3: Date & Time (60% Complete)

- **Purpose**: Schedule the service
- **Features**:
  - **Calendar**:
    - Custom calendar component
    - Month navigation
    - Visual selection of dates
    - Disabled past dates (can be implemented)
  - **Time Slots**:
    - Morning (9:00 AM - 12:00 PM)
    - Afternoon (12:00 PM - 4:00 PM)
    - Evening (4:00 PM - 7:00 PM)
  - **Recurring Service**:
    - Toggle for one-time vs recurring
    - Options: Weekly, Bi-Weekly, Monthly
    - Visual selection feedback
- **Validation**: Both date and time must be selected

### Step 4: Payment (80% Complete)

- **Purpose**: Process payment and show order summary
- **Features**:
  - Stripe payment integration placeholder
  - **Order Summary**:
    - Main service with image and price
    - List of additional services
    - Service fee breakdown
    - Additional service fee
    - Tax calculation (10%)
    - Total amount
  - Payment button
  - Previous button to modify selections

### Step 5: Confirmation (100% Complete)

- **Purpose**: Confirm successful booking
- **Features**:
  - Success message with icon
  - Transaction ID display
  - Complete booking summary
  - Price breakdown
  - "Start New Project" button to close modal

## Key Features

### State Management

- Centralized state in `BookingModal` component
- Single source of truth for all booking data
- Progressive data collection across steps

### Form Validation

- **Library**: React Hook Form + Zod
- **Benefits**:
  - Type-safe validation
  - Performance optimization
  - Reusable schemas
  - Clear error messages

### UI/UX Best Practices

1. **Progress Tracking**:
   - Visual checklist in sidebar
   - Progress bar at bottom
   - Step completion indicators

2. **Visual Feedback**:
   - Active step highlighting
   - Completed steps with checkmarks
   - Locked future steps
   - Hover states on interactive elements

3. **Navigation**:
   - Previous/Continue buttons
   - Modal close button
   - Backdrop click to close

4. **Responsive Design**:
   - Mobile-first approach
   - Grid layouts adapt to screen size
   - Sticky sidebar on desktop

### Accessibility

- Semantic HTML
- Keyboard navigation support
- ARIA labels (can be enhanced)
- Focus management
- Color contrast compliance

## Technical Implementation

### Type Safety

```typescript
// All data structures are fully typed
interface BookingState extends BookingData {
  currentStep: number;
  totalSteps: number;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceImage: string | { src: string };
}
```

### Form Validation Example

```typescript
export const servicingInformationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  // ... more fields
});
```

### Component Props Pattern

- Clear prop interfaces
- Required vs optional props
- Callback functions for data flow
- Type-safe event handlers

## Integration

### Using the Booking Modal

```tsx
import BookingModal from "@/components/Booking/BookingModal";

function ServicePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Book Now</button>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceId="1"
        serviceName="House Cleaning"
        servicePrice={50}
        serviceImage={image}
        additionalServices={additionalServices}
      />
    </>
  );
}
```

## Data Flow

1. **User clicks "Book Service"** → Modal opens
2. **Step 1**: User selects additional services → State updates
3. **Step 2**: User fills form → Validation → State updates
4. **Step 3**: User selects date/time → State updates
5. **Step 4**: User reviews and pays → Transaction ID generated
6. **Step 5**: Confirmation displayed → User can close

## Future Enhancements

### Short Term

- [ ] Real Stripe integration
- [ ] Backend API integration
- [ ] Email confirmation
- [ ] SMS notifications
- [ ] Booking history

### Long Term

- [ ] Calendar availability checking
- [ ] Real-time pricing updates
- [ ] Service provider assignment
- [ ] Booking modifications
- [ ] Cancellation policy
- [ ] Review system integration
- [ ] Discount codes
- [ ] Multi-language support

## Testing Recommendations

### Unit Tests

- Form validation schemas
- Date/time calculations
- Price calculations
- State management logic

### Integration Tests

- Complete booking flow
- Form submissions
- Navigation between steps
- Error handling

### E2E Tests

- Full user journey
- Payment processing
- Confirmation flow

## Performance Considerations

1. **Code Splitting**: Modal loaded on-demand
2. **Memoization**: Expensive calculations memoized
3. **Form Optimization**: React Hook Form minimizes re-renders
4. **Image Optimization**: Next.js Image component used

## Security Considerations

1. **Input Validation**: Both client and server-side (when integrated)
2. **XSS Prevention**: React's built-in protection
3. **Payment Security**: Stripe handles sensitive data
4. **API Authentication**: Should be implemented on backend

## Styling

- **Framework**: Tailwind CSS
- **Component Library**: Shadcn/ui
- **Icons**: Lucide React
- **Responsive**: Mobile-first approach
- **Theme**: Customizable through Tailwind config

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

```json
{
  "react": "^19.x",
  "next": "^16.x",
  "react-hook-form": "^7.x",
  "zod": "^4.x",
  "@hookform/resolvers": "^5.x",
  "lucide-react": "^0.x"
}
```

## Contributing

When adding new steps or modifying the flow:

1. Update TypeScript types in `booking.type.ts`
2. Add validation schemas in `booking.schema.ts`
3. Create/modify step components
4. Update the main `BookingModal.tsx`
5. Update this documentation

## Support

For questions or issues, please refer to the project documentation or contact the development team.

# Availability Settings Page

This folder contains the availability management page for providers to set their working days and time slots.

## Structure

- **page.tsx** - Main availability display page
- Related modal: **EditAvailabilityModal.tsx** (in `src/components/Dashboard/`)

## Features

### Display Page (`page.tsx`)

- Shows current availability configuration
- Displays all 7 days of the week with selection status
- Shows 3 time slots (Morning, Afternoon, Evening) with availability
- Counter badges showing how many days/slots are available
- Edit button to open the modal

### Edit Modal (`EditAvailabilityModal.tsx`)

- Interactive checkboxes to select/deselect days and time slots
- "Select All" / "Deselect All" buttons for quick actions
- Real-time counter updates
- Form submission with save/cancel options
- Visual feedback with color changes on selection
- Helpful tip for users

## Data Structure

```typescript
interface AvailabilityData {
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  timeSlots: {
    morning: boolean; // 8:00 AM – 12:00 PM
    afternoon: boolean; // 12:00 PM – 4:00 PM
    evening: boolean; // 4:00 PM – 8:00 PM
  };
}
```

## Usage

Navigate to `/provider/settings/availability` to access the page. Click the "Edit" button to modify availability settings.

## Type Definitions

See `src/types/availability.type.ts` for all interface definitions.

## Integration

To connect with your API:

1. Replace mock data in page.tsx `useState` with data fetched from your API
2. Update the `handleSave` function to make API calls
3. Add error handling and loading states as needed

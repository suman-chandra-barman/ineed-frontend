# Service Details Page

A fully responsive service details page with image carousel, service information, pricing, and customer reviews.

## Features

### 1. **Service Gallery with Carousel** (`ServiceGallery.tsx`)

- Uses `embla-carousel-react` for smooth image navigation
- Main carousel with prev/next navigation buttons
- Vertical thumbnail navigation on desktop, horizontal on mobile
- Responsive design with proper fallback for missing images
- Active thumbnail highlighting

### 2. **Service Information** (`ServiceInfo.tsx`)

- Collapsible service overview section
- Read more/less functionality for long descriptions
- Additional services section with:
  - Service image, name, and description
  - Price and duration display
  - Hover effects for better UX
- Fully responsive grid layout

### 3. **Service Booking Sidebar** (`ServiceBooking.tsx`)

- Sticky positioning on desktop
- Price display with original price and discount badge
- Book Service CTA button
- Service hours schedule showing:
  - Daily operating hours
  - Closed days highlighted in red
- Responsive design that adapts to mobile

### 4. **Customer Reviews Section** (`Reviews.tsx`)

- Overall rating summary with star display
- Rating breakdown by stars (1-5) with visual bars
- Individual review cards featuring:
  - User avatar with fallback
  - Name, date, and service type
  - Star rating
  - Review comment
  - Like/Dislike interaction buttons
- "Load more" functionality for pagination
- Responsive grid layout

## Responsive Design

### Desktop (lg: 1024px+)

- 3-column grid: 2 columns for content, 1 for sidebar
- Vertical thumbnail carousel
- Side-by-side review summary cards

### Tablet (md: 768px - 1023px)

- Single column layout
- Horizontal thumbnail carousel
- Stacked review cards

### Mobile (< 768px)

- Full-width single column
- Horizontal scrolling thumbnails with indicators
- Stacked layout for all sections
- Touch-optimized interactions

## File Structure

```
src/
├── app/
│   └── (main)/
│       └── services/
│           └── [id]/
│               └── page.tsx          # Main service details page
└── components/
    └── ServiceDetails/
        ├── ServiceGallery.tsx         # Image carousel component
        ├── ServiceInfo.tsx            # Service overview & additional services
        ├── ServiceBooking.tsx         # Pricing & booking sidebar
        └── Reviews.tsx                # Customer reviews section
```

## Usage

Navigate to `/services/[id]` where `[id]` is the service identifier.

Example: `/services/1` will display the service details page.

## Customization

### To modify service data:

Edit the `serviceData` object in [services/[id]/page.tsx](<../app/(main)/services/[id]/page.tsx>)

### To change styling:

- Update Tailwind classes in individual components
- Modify colors, spacing, and breakpoints as needed
- Global styles are in [globals.css](../app/globals.css)

## Dependencies

- `embla-carousel-react`: Image carousel functionality
- `lucide-react`: Icons throughout the page
- `next/image`: Optimized image loading (can be integrated)
- Tailwind CSS: Responsive styling

## Future Enhancements

- [ ] Integrate with API for dynamic data
- [ ] Add image zoom/lightbox functionality
- [ ] Implement actual booking flow
- [ ] Add review submission form
- [ ] Integrate with authentication for likes/dislikes
- [ ] Add image lazy loading optimization
- [ ] Implement skeleton loading states

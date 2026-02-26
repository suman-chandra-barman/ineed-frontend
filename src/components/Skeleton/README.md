# Skeleton Components

Loading skeleton components for the application. These components provide visual feedback to users while content is being fetched from APIs.

## Structure

Each skeleton component is organized in its own file for better maintainability and reusability:

```
Skeleton/
├── index.ts                      # Central export file
├── CategoryCardSkeleton.tsx      # Individual category card skeleton
├── ServiceCardSkeleton.tsx       # Individual service card skeleton
├── CategoryGridSkeleton.tsx      # Grid of category skeletons
├── ServiceGridSkeleton.tsx       # Grid of service skeletons
└── README.md                     # This file
```

## Components

### Individual Skeletons

#### CategoryCardSkeleton

Loading skeleton that matches the CategoryCard component structure.

```tsx
import { CategoryCardSkeleton } from "@/components/Skeleton";
```

#### ServiceCardSkeleton

Loading skeleton that matches the ServiceCard component structure.

```tsx
import { ServiceCardSkeleton } from "@/components/Skeleton";
```

### Grid Skeletons

#### CategoryGridSkeleton

Displays a grid of category card skeletons.

**Props:**

- `count` (optional): Number of skeleton cards to display (default: 4)

```tsx
import { CategoryGridSkeleton } from "@/components/Skeleton";

<CategoryGridSkeleton count={4} />;
```

#### ServiceGridSkeleton

Displays a grid of service card skeletons.

**Props:**

- `count` (optional): Number of skeleton cards to display (default: 9)

```tsx
import { ServiceGridSkeleton } from "@/components/Skeleton";

<ServiceGridSkeleton count={9} />;
```

## Usage Example

```tsx
import { ServiceGridSkeleton } from "@/components/Skeleton";

function ServicesPage() {
  const { data, isLoading } = useGetServicesQuery();

  if (isLoading) {
    return <ServiceGridSkeleton count={9} />;
  }

  // ... render actual content
}
```

## Best Practices

1. **Match the original component structure**: Each skeleton should mirror the layout and spacing of its corresponding component

2. **Use semantic naming**: Component names should clearly indicate what they are skeletons for

3. **Keep them separate**: Each skeleton component should be in its own file for better code organization

4. **Export from index**: Use the index.ts file for clean imports

5. **Add proper TypeScript types**: Always define prop interfaces for better type safety

6. **Use consistent animation**: All skeletons use the `animate-pulse` utility class for consistency

7. **Document props**: Always document component props and default values

## Adding New Skeletons

When adding a new skeleton component:

1. Create a new file: `ComponentNameSkeleton.tsx`
2. Add JSDoc comments explaining the component
3. Define TypeScript interfaces for props
4. Export the component
5. Add export to `index.ts`
6. Update this README with the new component

## Related Components

- **ErrorDisplay**: Located in `@/components/Shared/ErrorDisplay`
- **EmptyState**: Located in `@/components/Shared/ErrorDisplay`

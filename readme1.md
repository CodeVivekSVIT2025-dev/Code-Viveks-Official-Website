# CODE VIVEKS - College Coding Club

## Overview

CODE VIVEKS is a student-led coding club website for Swami Vivekananda Institute of Technology (SVIT), Secunderabad. The platform serves as a community hub for aspiring developers, showcasing the club's structure, events, projects, and providing contact information for prospective members. The application features a modern, animated user interface with smooth page transitions, responsive design, and comprehensive content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18** with **TypeScript** for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **React Router DOM** for client-side routing with animated page transitions
- Single Page Application (SPA) architecture with route-based code splitting

**UI Component System**
- **shadcn/ui** as the primary component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Custom CSS variables for theming (HSL color format) defined in `src/index.css`
- Component composition pattern with separate UI components in `src/components/ui/`

**Animation & Interactions**
- **Framer Motion** for page transitions and component animations
- Custom page transition wrapper (`PageTransition.tsx`) with sliding overlay effects
- Scroll-based animations with Intersection Observer API
- Embla Carousel for interactive content carousels

**State Management**
- **TanStack React Query** (v5) for server state management and data fetching
- Local component state using React hooks (`useState`, `useEffect`, `useRef`)
- Context API for theme management via `next-themes`
- Custom hooks in `src/hooks/` for reusable logic (mobile detection, outside click detection, toast notifications)

**Routing Structure**
- Main routes: Home (`/`), About, Teams, Events, Projects, Contact
- 404 Not Found page for invalid routes
- Persistent navigation (Navbar) and footer across all routes
- `ScrollToTop` component ensures page starts at top on route change

### Design System

**Color System**
- HSL-based color tokens for light/dark theme support
- Primary gradient colors for brand identity (purple, blue, pink transitions)
- Semantic color naming (primary, secondary, accent, muted, destructive)
- Custom glow effects for interactive elements

**Typography**
- Inter font family (Google Fonts) with multiple weights (300-900)
- Responsive text sizing using Tailwind's responsive utilities
- Gradient text effects for emphasis

**Layout Patterns**
- Container-based layouts with max-width constraints
- Responsive grid systems (1-column mobile, 2-3 columns desktop)
- Flexbox for component alignment
- Bento grid layouts for feature showcases

### Component Architecture

**Page Components** (`src/pages/`)
- Each page wraps its section component in `PageTransition`
- Pages import and render corresponding section components from `src/components/sections/`

**Section Components** (`src/components/sections/`)
- Large, feature-rich components for each page section
- Self-contained with local state and effects
- Intersection Observer for scroll animations
- Data imported from centralized content files

**Shared Components** (`src/components/`)
- **Navbar**: Responsive navigation with mobile menu, smooth scrolling, hover effects
- **Footer**: Social links, branding, contact information
- **PageTransition**: Global page transition wrapper
- **ScrollToTop**: Automatic scroll-to-top on route change

**UI Components** (`src/components/ui/`)
- Reusable, accessible components from shadcn/ui
- Radix UI primitives for complex interactions (dialogs, dropdowns, accordions)
- Custom components: `animated-testimonials`, `apple-cards-carousel`, `bento-grid`, `comet-card`, `timeline`

### Data Management

**Content Structure** (`src/data/`)
- **`content.tsx`**: Centralized club information object (`clubInfo`) containing:
  - Club metadata (name, tagline, institution)
  - Navigation items
  - Social media links
  - Contact information
  - Events (featured and scheduled)
  - Projects
  - Team structure
  - Leadership hierarchy
  - Statistics
- **`leadershipUi.tsx`**: Transforms raw leadership data into UI-ready card configurations

**Data Flow**
- Static content imported directly into components
- No backend API calls in current implementation
- Content updates require code changes and redeployment

### Responsive Design Strategy

**Breakpoints**
- Mobile-first approach with Tailwind's default breakpoints
- Custom mobile detection hook (`use-mobile.tsx`) at 768px threshold
- Conditional rendering for mobile vs desktop experiences
- Responsive images and typography scaling

**Mobile Optimizations**
- Hamburger menu navigation
- Touch-friendly interactive elements
- Reduced animation complexity on mobile
- Optimized carousel interactions for touch gestures

### Performance Considerations

**Build Optimizations**
- Vite's native ES modules for faster development
- Tree-shaking for minimal bundle size
- Code splitting at route level
- Asset optimization through Vite plugins

**Runtime Optimizations**
- React Query for efficient data caching (if used with API)
- Memoization of expensive computations with `useMemo`
- Lazy loading of route components (potential improvement)
- Optimized re-renders with proper key props

**Development Configuration**
- TypeScript strict mode disabled for rapid development
- ESLint with relaxed rules (unused vars/params allowed)
- Hot Module Replacement for instant feedback

## External Dependencies

### UI & Styling Libraries

- **@radix-ui/* (multiple packages)**: Unstyled, accessible UI primitives for building high-quality components
- **tailwindcss + autoprefixer + postcss**: Utility-first CSS framework with processing
- **class-variance-authority**: CVA for managing component variants
- **clsx + tailwind-merge**: Utility for conditional className merging
- **next-themes**: Theme management (light/dark mode support)

### Animation Libraries

- **framer-motion**: Declarative animations and page transitions
- **embla-carousel-react**: Touch-friendly carousel component
- **motion**: Additional animation utilities

### Form & Validation

- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: Schema validation (likely used with forms)

### Icons

- **lucide-react**: Comprehensive icon library
- **@tabler/icons-react**: Additional icon set

### Routing & State

- **react-router-dom**: Client-side routing
- **@tanstack/react-query**: Server state management and caching

### Utilities

- **date-fns**: Date manipulation and formatting
- **cmdk**: Command palette component
- **input-otp**: OTP input component
- **vaul**: Drawer component (for mobile sheets)
- **sonner**: Toast notification system

### Development Dependencies

- **TypeScript + @types/***: Type safety and IntelliSense
- **Vite + @vitejs/plugin-react-swc**: Build tool with SWC for faster compilation
- **ESLint + plugins**: Code quality and consistency
- **react-day-picker**: Calendar/date picker component
- **recharts**: Charting library (for potential data visualization)

### Asset Management

- Static assets stored in `public/` directory (robots.txt)
- Image imports from `src/assets/` (PNG files for logos and social icons)
- Font loading via Google Fonts CDN (Inter family)

### Configuration Files

- **vite.config.ts**: Development server on port 5000, path aliases (`@/` → `src/`)
- **tailwind.config.ts**: Custom theme extensions, container settings, 2xl breakpoint at 1400px
- **tsconfig.json**: Path aliases, relaxed type checking for development speed
- **components.json**: shadcn/ui configuration with Aceternity UI registry
# Design Guidelines: Central de Gerenciamento e Sincronização Sankhya-Oracle

## Design Approach

**Selected Framework**: Design System Approach - Material Design with Linear inspiration
**Rationale**: Enterprise admin dashboard requiring information density, clear hierarchy, and established patterns for data-heavy interfaces. Linear's clean aesthetic provides visual clarity while Material Design offers robust component patterns.

---

## Typography System

**Font Family**: 
- Primary: Inter (via Google Fonts CDN)
- Monospace: JetBrains Mono (for logs, IDs, technical data)

**Type Scale**:
- Page Titles: text-3xl font-semibold (30px)
- Section Headers: text-xl font-semibold (20px)
- Subsection Headers: text-lg font-medium (18px)
- Body Text: text-sm font-normal (14px)
- Labels: text-xs font-medium uppercase tracking-wide (12px)
- Table Headers: text-xs font-semibold uppercase (12px)
- Captions/Meta: text-xs font-normal (12px)
- Code/Technical: text-sm font-mono (14px)

**Hierarchy Rules**: Maintain clear visual distinction through size and weight variation. Page titles stand alone with generous whitespace. Section headers divide content blocks with consistent spacing.

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (within components): 2, 4
- Component padding: 4, 6
- Section spacing: 8, 12
- Page margins: 12, 16

**Grid Structure**:
- Main container: max-w-7xl mx-auto px-6
- Dashboard metrics: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Table layouts: full width with internal px-6 py-4
- Forms: max-w-2xl for optimal readability
- Sidebar navigation: fixed w-64 with main content ml-64

**Responsive Breakpoints**: Mobile-first, stack to single column on mobile, 2-column tablet, multi-column desktop

---

## Component Library

### Navigation
**Sidebar Navigation** (Fixed Left):
- Width: w-64, full height with sticky positioning
- Logo area at top (h-16) with px-6
- Navigation items: px-6 py-3 with text-sm
- Active state: distinct visual treatment with subtle left border indicator
- Grouping: Divide into sections (Gerenciamento, Sincronização, Sistema) with uppercase labels
- Icon placement: Leading icons from Heroicons (24x24)

**Top Bar**:
- Height: h-16 with shadow-sm
- Right-aligned: User profile, notifications, logout
- Breadcrumb navigation on left for context

### Dashboard Metrics Cards
- Card container: rounded-lg border with p-6
- Metric layout: Vertical stack with icon at top
- Number display: text-3xl font-bold
- Label: text-sm with subtle styling
- Trend indicator: Small badge showing change percentage
- Grid layout: 4 cards across desktop (Pendentes, Sincronizados, Falhas, Próxima Execução)

### Data Tables
- Container: rounded-lg border overflow-hidden
- Header row: sticky top-0 with elevated treatment
- Cell padding: px-6 py-4
- Row hover: subtle background transition
- Alternating rows: NO zebra striping (cleaner look)
- Action buttons: Right-aligned icon buttons (edit, delete, sync)
- Pagination: Bottom bar with page numbers and items-per-page selector
- Filters: Top bar with search input and dropdown filters (empresa, status, tipo)

### Forms
- Input groups: mb-6 consistent spacing
- Labels: block mb-2 with text-sm font-medium
- Inputs: w-full px-4 py-2 rounded-md border
- Focus states: Ring treatment for keyboard navigation
- Helper text: text-xs mt-1 below inputs
- Required indicators: Red asterisk on labels
- Submit buttons: Right-aligned primary action
- Cancel/secondary: Adjacent to submit with visual hierarchy

### Status Indicators
- Badges for sync status:
  - PENDENTE_ENVIO: Amber treatment
  - SINCRONIZADO: Green treatment  
  - FALHA_ENVIO: Red treatment
- Size: px-3 py-1 rounded-full text-xs font-medium
- Icons: Leading status icon from Heroicons

### Charts/Graphs (Recharts)
- Container: rounded-lg border p-6
- Title: text-lg font-semibold mb-4
- Chart height: h-64 for dashboard overview
- Tooltips: Clean styling with relevant data points
- Legend: Bottom positioned with horizontal layout

### Modals/Overlays
- Backdrop: Semi-transparent overlay
- Modal: max-w-2xl centered with rounded-lg
- Header: px-6 py-4 with title and close button
- Content: px-6 py-4 with max-h-[70vh] overflow-y-auto
- Footer: px-6 py-4 with action buttons right-aligned

### Buttons
- Primary: px-4 py-2 rounded-md font-medium
- Secondary: Border variant with transparent background
- Icon buttons: p-2 square with rounded-md
- Sizes: Small (py-1 px-3), Default (py-2 px-4), Large (py-3 px-6)
- Loading states: Spinner icon replacement

### Log Viewer
- Container: font-mono text-sm
- Entry layout: Grid with timestamp | type | status | message columns
- Expandable rows: Click to reveal full error details
- Syntax highlighting: For JSON/technical data in expanded view
- Export button: Top-right for downloading logs

---

## Page-Specific Layouts

### Login Page
- Centered card: max-w-md with p-8
- Logo at top center
- Form inputs stacked vertically with mb-4
- Full-width submit button
- Minimal design, no hero image needed

### Dashboard
- 4-column metrics grid at top (gap-6)
- Below metrics: 2-column layout
  - Left: Recent activity table (67% width)
  - Right: Upcoming sync countdown + quick stats (33% width)
- Charts section: 2 charts side-by-side showing success/failure trends
- All sections: mb-8 spacing between

### Empresas (Companies)
- Top bar: Search + "Nova Empresa" button (right-aligned)
- Filter chips: Below search for Ativas/Inativas
- Table: Full width with columns (Nome, Status, Última Sync, Credenciais, Ações)
- Action buttons per row: "Testar Conexão" | "Sincronizar" | Edit | Delete
- Modal form: Opens for create/edit with tabbed sections (Dados Gerais, Credenciais Sankhya)

### Logs
- Advanced filter bar: Empresa dropdown, Tipo (IN/OUT), Status, Date range
- Table with columns: Timestamp | Empresa | Tipo | Status | Duração | Ações
- Click row: Expands to show full error message and technical details
- Pagination: 25/50/100 items per page selector

### Configurações (Settings)
- Tabbed interface: Geral | Sankhya | Políticas
- Form layout: 2-column grid for related fields
- Interval inputs: Number input with unit selector (minutos/horas)
- Endpoint configuration: Full-width inputs with validation
- Save button: Sticky bottom bar for easy access

---

## Icon Strategy

**Library**: Heroicons (Outline style) via CDN
**Usage**:
- Navigation: 20x20 leading icons
- Buttons: 16x16 inline icons
- Status indicators: 16x16 in badges
- Table actions: 20x20 icon buttons
- Dashboard metrics: 32x32 feature icons

**Common Icons**:
- Dashboard: ChartBarIcon
- Empresas: BuildingOfficeIcon
- Logs: DocumentTextIcon
- Configurações: CogIcon
- Sync: ArrowPathIcon
- Success: CheckCircleIcon
- Error: XCircleIcon
- Warning: ExclamationTriangleIcon

---

## Animation Strategy

**Minimal, Purposeful Animations**:
- Page transitions: NO animations (instant navigation)
- Hover states: Subtle opacity/background changes only
- Modal appearance: Fade in backdrop, scale modal (150ms)
- Loading states: Spinner rotation for sync operations
- Table row hover: Background transition (100ms)
- Toast notifications: Slide in from top-right (200ms)

**Countdown Timer**: Live updating display for próxima execução with seconds precision

---

## Images

**No hero images required** - This is a functional admin dashboard focused on data and operations. Visual elements are iconography and data visualizations only.

---

## Accessibility Standards

- All interactive elements: Keyboard navigable with visible focus rings
- Form inputs: Associated labels with proper ARIA attributes
- Tables: Proper header scope for screen readers
- Color contrast: All text meets WCAG AA standards
- Status indicators: Icon + text/color combination (not color alone)
- Modals: Focus trap and escape key handling
# NGO Monthly Reporting System

A production-ready React frontend application for NGO monthly reporting with support for individual report submission, bulk CSV uploads, and an admin dashboard with real-time metrics.

## Features

- **Submit Monthly Reports**: Form-based submission with comprehensive validation
- **Bulk CSV Upload**: Upload multiple reports via CSV with real-time job status tracking
- **Admin Dashboard**: View aggregated metrics across all NGOs for any month
- **Mock Mode**: Demo the application without a backend
- **Responsive Design**: Mobile-first approach using Material UI
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

- **Framework**: React 18 with Vite
- **UI Library**: Material UI (MUI) v5
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query) with polling support
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Linting & Formatting**: ESLint + Prettier

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` to configure:

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_USE_MOCKS=false
```

- `VITE_API_BASE_URL`: Backend API URL
- `VITE_USE_MOCKS`: Set to `true` to enable mock mode (no backend required)

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Mock Mode

The application includes a complete mock data system that allows you to demo all features without a backend:

1. Set `VITE_USE_MOCKS=true` in your `.env` file
2. Run the dev server
3. All API calls will be intercepted and return mock data

Mock behaviors:
- **Submit Report**: Returns success after validation
- **Upload CSV**: Simulates a job that progresses over 5 seconds
- **Dashboard**: Returns sample metrics (returns empty state for January 2025)

## Pages

### 1. Submit Report (`/submit`)

Form for submitting monthly NGO reports with the following fields:
- NGO ID (required, text)
- Month (required, YYYY-MM format)
- People Helped (required, integer ≥ 0)
- Events Conducted (required, integer ≥ 0)
- Funds Utilized (required, integer ≥ 0)

Features:
- Real-time validation with inline error messages
- Server-side error handling
- Success/error toast notifications
- Form reset functionality

### 2. Bulk Upload (`/upload`)

Upload multiple reports via CSV file with real-time progress tracking.

Features:
- Drag & drop file selection
- CSV format help panel
- Real-time job status with progress bar
- Automatic polling (every 2 seconds) until completion
- Success/failure notifications

**CSV Format:**
```
ngo_id,month,people_helped,events_conducted,funds_utilized
NGO_001,2025-09,120,5,75000
```

### 3. Dashboard (`/dashboard`)

Admin dashboard showing aggregated metrics for a selected month.

Metrics displayed:
- Total NGOs Reporting (distinct count)
- Total People Helped (sum)
- Total Events Conducted (sum)
- Total Funds Utilized (sum, formatted with ₹ symbol)

Features:
- Month selector
- Refresh button
- Loading skeletons
- Empty state for months with no data
- Responsive card grid layout

## API Contracts

The frontend is designed to work with the following API endpoints:

### POST `/report`

Submit a single monthly report.

**Request:**
```json
{
  "ngo_id": "NGO_001",
  "month": "2025-09",
  "people_helped": 120,
  "events_conducted": 5,
  "funds_utilized": 75000
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Report submitted successfully"
}
```

**Error Response (400/409):**
```json
{
  "status": "error",
  "message": "Validation failed",
  "fieldErrors": {
    "ngo_id": "NGO ID is required",
    "month": "Invalid month format"
  }
}
```

### POST `/reports/upload`

Upload a CSV file with multiple reports.

**Request:** `multipart/form-data` with field name `file`

**Success Response (200):**
```json
{
  "job_id": "job_123456",
  "status": "pending"
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "message": "Invalid CSV format"
}
```

### GET `/job-status/{job_id}`

Poll for upload job status.

**Success Response (200):**
```json
{
  "status": "processing",
  "processed": 50,
  "total": 100,
  "error_message": null
}
```

Status values: `pending`, `processing`, `success`, `failed`

### GET `/dashboard?month=YYYY-MM`

Get aggregated metrics for a specific month.

**Success Response (200):**
```json
{
  "month": "2025-09",
  "total_ngos_reporting": 42,
  "total_people_helped": 15420,
  "total_events_conducted": 127,
  "total_funds_utilized": 8750000
}
```

**Empty Response (404):**
```json
{
  "status": "empty"
}
```

## Validation Rules

### Frontend Validation

- **ngo_id**: Non-empty string, trimmed
- **month**: Must match `YYYY-MM` format, month must be 01-12
- **people_helped**: Integer ≥ 0, no decimals
- **events_conducted**: Integer ≥ 0, no decimals
- **funds_utilized**: Integer ≥ 0, no decimals

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── client.js           # Axios instance
│   │   └── endpoints.js        # API endpoint wrappers
│   ├── components/
│   │   ├── FileDropzone.jsx    # CSV file upload component
│   │   ├── JobStatus.jsx       # Job progress display
│   │   ├── MetricCard.jsx      # Dashboard metric card
│   │   ├── MonthPicker.jsx     # Month selection input
│   │   └── Navbar.jsx          # Top navigation bar
│   ├── hooks/
│   │   └── useJobPoll.js       # Custom hook for job polling
│   ├── mocks/
│   │   ├── handlers.js         # Mock API handlers
│   │   └── index.js            # Mock/real API switcher
│   ├── routes/
│   │   ├── BulkUpload.jsx      # /upload page
│   │   ├── Dashboard.jsx       # /dashboard page
│   │   └── SubmitReport.jsx    # /submit page
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   └── theme.js                # MUI theme configuration
├── .env                        # Environment variables
├── .env.example                # Environment template
├── .eslintrc.cjs               # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── package.json                # Dependencies
└── vite.config.js              # Vite configuration
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- All form inputs have proper `aria-label` attributes
- Progress indicators use `aria-valuenow`
- Keyboard navigation support
- High contrast text
- Screen reader compatible

## Screenshots

### Submit Report Page
Clean form interface with validation and error handling
- All required fields clearly labeled
- Real-time validation feedback
- Success/error toast notifications

### Bulk Upload Page
CSV upload with real-time job progress tracking
- File dropzone with accept filters
- Live progress bar showing processed/total rows
- Status badges (pending, processing, success, failed)
- CSV format help panel

### Admin Dashboard
Comprehensive metrics overview
- Month selector for filtering data
- Four metric cards with icons:
  - Total NGOs Reporting
  - Total People Helped
  - Total Events Conducted
  - Total Funds Utilized (with ₹ formatting)
- Responsive grid layout
- Empty state messaging

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

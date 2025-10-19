# Quick Start Guide

## Get Running in 30 Seconds

```bash
# You've already done this:
npm install

# The app is running at:
http://localhost:5173
```

## Current Configuration

✅ **Mock Mode is ENABLED** (no backend needed)

The app is using simulated data from `src/mocks/handlers.js`

## Try These Features

### 1️⃣ Submit a Report
- Navigate to: http://localhost:5173/submit
- Fill in the form (any valid data)
- Click Submit
- ✅ See success toast

### 2️⃣ Upload a CSV
- Navigate to: http://localhost:5173/upload
- Click the dropzone (select any .csv file)
- Click Upload
- ⏱️ Watch the progress bar fill over 5 seconds
- ✅ See completion status

### 3️⃣ View Dashboard
- Navigate to: http://localhost:5173/dashboard
- 📊 See 4 metric cards with sample data
- 🔄 Change months to see different data
- Try "2025-01" to see empty state

## Files You Can Explore

```
📂 Key Files:
├── src/routes/SubmitReport.jsx    ← Submit form page
├── src/routes/BulkUpload.jsx      ← CSV upload page
├── src/routes/Dashboard.jsx       ← Metrics dashboard
├── src/mocks/handlers.js          ← Mock API responses
├── .env                           ← Environment config
└── README.md                      ← Full documentation
```

## Switch to Real Backend

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:4000
VITE_USE_MOCKS=false
```

Then restart: `npm run dev`

## Common Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
npm run format    # Format code with Prettier
```

## Troubleshooting

**Q: Port 5173 already in use?**
A: Kill the existing process or Vite will auto-increment to 5174

**Q: Form validation not working?**
A: Check browser console for errors. All validation rules are in `src/routes/SubmitReport.jsx`

**Q: Upload not progressing?**
A: Mock upload takes exactly 5 seconds. Check `src/mocks/handlers.js` to adjust timing

**Q: Dashboard shows no data?**
A: Try months other than "2025-01" (which returns empty state by design)

## Next Steps

1. ✅ Verify all 3 pages work in browser
2. ✅ Test form validation with invalid data
3. ✅ Watch CSV upload progress
4. ✅ Explore dashboard metrics
5. 📖 Read full README.md for API contracts
6. 🎨 Customize theme in `src/theme.js`
7. 🔌 Connect to real backend when ready

## Project Stats

- **16 source files** across routes, components, hooks, API, and mocks
- **React 18** with Vite for fast HMR
- **Material UI v5** for professional UI
- **React Query** for data fetching
- **React Hook Form + Yup** for validation
- **100% JavaScript** (no TypeScript)
- **Zero backend required** in mock mode

Enjoy building! 🚀

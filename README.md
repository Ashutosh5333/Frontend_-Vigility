# Analytics Dashboard - Frontend

## Overview
This is the frontend application for the Interactive Product Analytics Dashboard. Built with React, Redux Toolkit, and Tailwind CSS, it provides an intuitive interface for visualizing product usage analytics.

## Technology Stack
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Chart.js with react-chartjs-2
- **Date Picker**: react-datepicker
- **HTTP Client**: Axios
- **Cookie Management**: js-cookie

## Project Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js              # Axios configuration and API calls
│   ├── components/
│   │   ├── BarChart.jsx        # Feature usage bar chart
│   │   ├── Filters.jsx         # Dashboard filters component
│   │   ├── LineChart.jsx       # Time trend line chart
│   │   └── PrivateRoute.jsx    # Route protection wrapper
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard page
│   │   ├── Login.jsx           # Login page
│   │   └── Register.jsx        # Registration page
│   ├── redux/
│   │   ├── analyticsSlice.js   # Analytics state management
│   │   ├── authSlice.js        # Authentication state management
│   │   └── store.js            # Redux store configuration
│   ├── App.js                  # Main app component
│   ├── index.js                # App entry point
│   └── index.css               # Global styles with Tailwind
├── .env.example                # Environment variables template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT token
- ✅ Protected routes
- ✅ Persistent authentication (localStorage)
- ✅ Automatic token refresh handling

### Dashboard
- ✅ Interactive bar chart showing feature usage
- ✅ Line chart displaying time trends
- ✅ Advanced filters (Date Range, Age, Gender)
- ✅ Cookie-based filter persistence
- ✅ Click tracking for all interactions
- ✅ Real-time chart updates
- ✅ Responsive design

### User Experience
- ✅ Loading states with spinners
- ✅ Error handling with user-friendly messages
- ✅ Smooth animations and transitions
- ✅ Mobile-responsive layout
- ✅ Accessible components

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update to your backend API URL:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Step 3: Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage Guide

### Registration
1. Navigate to `/register`
2. Fill in the registration form:
   - Username (min 3 characters)
   - Password (min 6 characters)
   - Age (1-120)
   - Gender (Male/Female/Other)
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the dashboard

### Login
1. Navigate to `/login`
2. Enter your credentials
3. Click "Sign in"
4. You'll be redirected to the dashboard

**Demo Credentials:**
- Username: `john_doe`
- Password: `password123`

### Dashboard Features

#### Filters
- **Date Range**: Select start and end dates to filter analytics
- **Age Group**: Filter by age ranges (<18, 18-40, >40)
- **Gender**: Filter by gender (Male, Female, Other)
- **Reset**: Clear all filters with one click

Filters are automatically saved in cookies and restored on page refresh.

#### Bar Chart (Feature Usage)
- Displays total clicks per feature
- Click any bar to view its time trend in the line chart
- Bars are color-coded (selected feature is highlighted)

#### Line Chart (Time Trend)
- Shows daily click trends for the selected feature
- Updates automatically when you click a bar
- Displays smooth trend lines with data points

#### Tracking
Every interaction is automatically tracked:
- Changing date filters → tracks `date_filter`
- Changing age filter → tracks `age_filter`
- Changing gender filter → tracks `gender_filter`
- Clicking a bar → tracks `bar_chart_click`
- Clicking refresh → tracks `refresh_button`

## Cookie Management

The application stores the following preferences in cookies:
- `startDate` - Last selected start date
- `endDate` - Last selected end date
- `age` - Last selected age filter
- `gender` - Last selected gender filter

Cookies expire after 30 days. When you return to the dashboard, your last filters are automatically applied.

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: { id, username, age, gender },
    token: "jwt_token",
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  analytics: {
    featureClicks: [...],
    timeTrend: [...],
    filters: { startDate, endDate, age, gender },
    selectedFeature: string | null,
    loading: boolean,
    error: string | null
  }
}
```

### Auth Slice Actions
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `clearError()` - Clear error messages

### Analytics Slice Actions
- `fetchAnalyticsData(params)` - Fetch chart data
- `trackFeature(featureName)` - Track user interaction
- `setFilters(filters)` - Update filters
- `setSelectedFeature(feature)` - Set selected feature for line chart

## API Integration

### Endpoints Used
```javascript
// Authentication
POST /api/auth/register
POST /api/auth/login

// Analytics
POST /api/analytics/track
GET /api/analytics/data
```

### Request/Response Examples

**Login:**
```javascript
// Request
POST /api/auth/login
{
  "username": "john_doe",
  "password": "password123"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "john_doe",
    "age": 25,
    "gender": "Male"
  }
}
```

**Track Event:**
```javascript
// Request
POST /api/analytics/track
Headers: { Authorization: "Bearer token" }
{
  "feature_name": "date_filter"
}

// Response
{
  "success": true,
  "message": "Interaction tracked successfully"
}
```

**Get Analytics:**
```javascript
// Request
GET /api/analytics/data?startDate=2024-01-01&endDate=2024-01-31&age=18-40&gender=Male&feature=date_filter
Headers: { Authorization: "Bearer token" }

// Response
{
  "success": true,
  "data": {
    "featureClicks": [...],
    "timeTrend": [...]
  }
}
```

## Styling

### Tailwind CSS
The application uses Tailwind CSS for styling with a custom color palette:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',

  }
}
```

### Custom Components
- Rounded corners with shadows
- Smooth transitions
- Hover effects
- Loading animations
- Responsive grid layouts

# Sprint Energy Coach - Backend API

A FastAPI backend for the Sprint Energy Coach corporate energy management dashboard.

## Features

- **Employee Dashboard API**: Personal energy consumption tracking, team comparisons, device monitoring
- **Admin Dashboard API**: Company-wide energy analytics, employee management, department targets
- **Real-time Data**: Energy usage monitoring and analytics
- **RESTful API**: Clean, documented endpoints with automatic OpenAPI/Swagger documentation
- **CORS Enabled**: Ready for React frontend integration

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
```bash
cd backend
```

2. **Install dependencies directly (no virtual environment needed):**
```bash
pip3 install fastapi uvicorn pydantic python-multipart
```
   Or install from requirements file:
```bash
pip3 install -r requirements.txt
```

3. **Run the development server:**
```bash
python3 -m uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Employee Dashboard Endpoints

- `GET /api/employee/dashboard` - Complete employee dashboard data
- `GET /api/employee/dashboard/{employee_id}` - Dashboard for specific employee
- `GET /api/employee/real-time-usage` - Real-time energy usage data
- `GET /api/employee/devices` - Employee's device consumption
- `GET /api/employee/nudges` - Energy-saving recommendations
- `GET /api/employee/activity` - Recent activity feed
- `GET /api/employee/team-progress` - Team comparison data

### Admin Dashboard Endpoints

- `GET /api/admin/dashboard` - Complete admin dashboard data
- `GET /api/admin/employees` - All employee data and metrics
- `GET /api/admin/company-summary` - Company-wide energy summary
- `GET /api/admin/real-time-usage` - Company real-time usage
- `GET /api/admin/departments` - Department targets and progress
- `POST /api/admin/set-target` - Set employee energy targets
- `POST /api/admin/employee` - Create new employee
- `GET /api/admin/quick-actions` - Available admin actions

## Data Models

The API uses Pydantic models for request/response validation:

- **Employee Dashboard**: Energy rings, team progress, device usage, nudges
- **Admin Dashboard**: Company summary, employee data, department targets
- **Real-time Data**: Usage points, consumption metrics

## Frontend Integration

Update your React frontend to use the API:

1. **Update Employee Dashboard** (`frontend/src/Dashboard/Employee.js`):
```javascript
// Replace mock data loading with:
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/employee/dashboard');
      const apiData = await response.json();
      setData(apiData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      // Fallback to mock data if needed
    }
  };
  fetchData();
}, []);
```

2. **Update Admin Dashboard** (`frontend/src/Dashboard/Admin.js`):
```javascript
// Replace mock data loading with:
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/dashboard');
      const apiData = await response.json();
      setData(apiData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };
  fetchData();
}, []);
```

## Development

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── api/                 # API route handlers
│   │   ├── employee.py      # Employee dashboard endpoints
│   │   └── admin.py         # Admin dashboard endpoints
│   ├── schemas/             # Pydantic models
│   │   ├── employee.py      # Employee data models
│   │   └── admin.py         # Admin data models
│   ├── services/            # Business logic (future)
│   └── data/                # JSON data files
│       ├── employee_data.json
│       └── admin_data.json
├── requirements.txt
└── README.md
```

### Running Tests

```bash
# Install test dependencies (optional)
pip3 install pytest pytest-asyncio httpx

# Run tests
pytest
```

### API Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Future Enhancements

- **Database Integration**: Replace JSON files with PostgreSQL/SQLite
- **Authentication**: JWT-based user authentication
- **Real-time Updates**: WebSocket connections for live data
- **ML Features**: Energy prediction and optimization algorithms
- **IoT Integration**: Connect to actual energy monitoring devices
- **Deployment**: Docker containerization and cloud deployment

## Environment Variables

Create a `.env` file for configuration:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# Database (when implemented)
# DATABASE_URL=postgresql://user:password@localhost/energy_coach

# Security (when implemented)
# SECRET_KEY=your-secret-key
# ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the SunHacks hackathon submission.
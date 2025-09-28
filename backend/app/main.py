from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import employee, admin, auth

# Create FastAPI app instance
app = FastAPI(
    title="Sprint Energy Coach API",
    description="Backend API for Sprint Energy Coach - Corporate Energy Management Dashboard",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc documentation
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server
        "http://127.0.0.1:3000",
        "http://localhost:3001",  # Alternative React port
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)
app.include_router(
    employee.router, 
    prefix="/api/employee", 
    tags=["Employee Dashboard"]
)
app.include_router(
    admin.router, 
    prefix="/api/admin", 
    tags=["Admin Dashboard"]
)

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API health check
    """
    return {
        "message": "Sprint Energy Coach API is running!",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "healthy"
    }

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {"status": "healthy", "service": "Sprint Energy Coach API"}
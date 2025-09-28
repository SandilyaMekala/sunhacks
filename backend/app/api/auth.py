from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import LoginRequest, LoginResponse, User
import json
import os

router = APIRouter()

# Mock user data - in production, this would be in a database
MOCK_USERS = {
    "employee.demo": {
        "id": 1,
        "username": "employee.demo",
        "password": "demo123",
        "name": "John Employee",
        "role": "employee",
        "email": "john@acmelabs.com",
        "department": "Engineering"
    },
    "admin.demo": {
        "id": 2,
        "username": "admin.demo", 
        "password": "admin123",
        "name": "Jane Admin",
        "role": "admin",
        "email": "jane@acmelabs.com",
        "department": "Management"
    },
    # Additional demo users
    "anita.rao": {
        "id": 3,
        "username": "anita.rao",
        "password": "password123",
        "name": "Anita Rao",
        "role": "employee",
        "email": "anita@acmelabs.com",
        "department": "Engineering"
    }
}

def generate_mock_token(user_data):
    """Generate a mock JWT token (in production, use proper JWT library)"""
    import base64
    token_data = {
        "user_id": user_data["id"],
        "username": user_data["username"],
        "role": user_data["role"]
    }
    # This is a simple base64 encoding - use proper JWT in production
    token = base64.b64encode(json.dumps(token_data).encode()).decode()
    return f"mock_token_{token}"

def verify_user(username: str, password: str):
    """Verify user credentials"""
    user = MOCK_USERS.get(username)
    if user and user["password"] == password:
        return user
    return None

@router.post("/employee/login", response_model=LoginResponse)
async def employee_login(request: LoginRequest):
    """
    Employee login endpoint
    """
    user_data = verify_user(request.username, request.password)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if user_data["role"] not in ["employee"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Employee credentials required.",
        )
    
    # Generate token
    access_token = generate_mock_token(user_data)
    
    # Prepare user info (exclude password)
    user_info = {
        "id": user_data["id"],
        "username": user_data["username"],
        "name": user_data["name"],
        "role": user_data["role"],
        "email": user_data["email"],
        "department": user_data["department"]
    }
    
    return LoginResponse(
        access_token=access_token,
        user=user_info
    )

@router.post("/admin/login", response_model=LoginResponse)
async def admin_login(request: LoginRequest):
    """
    Admin login endpoint
    """
    user_data = verify_user(request.username, request.password)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if user_data["role"] not in ["admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin credentials required.",
        )
    
    # Generate token
    access_token = generate_mock_token(user_data)
    
    # Prepare user info (exclude password)
    user_info = {
        "id": user_data["id"],
        "username": user_data["username"],
        "name": user_data["name"],
        "role": user_data["role"],
        "email": user_data["email"],
        "department": user_data["department"]
    }
    
    return LoginResponse(
        access_token=access_token,
        user=user_info
    )

@router.get("/verify")
async def verify_token():
    """
    Verify token endpoint (for future use)
    """
    return {"message": "Token verification endpoint - to be implemented"}

@router.post("/logout")
async def logout():
    """
    Logout endpoint (for future use)
    """
    return {"message": "Logged out successfully"}

@router.get("/users/demo")
async def get_demo_users():
    """
    Get demo user credentials for testing
    """
    demo_users = []
    for username, user_data in MOCK_USERS.items():
        demo_users.append({
            "username": username,
            "password": user_data["password"],
            "role": user_data["role"],
            "name": user_data["name"]
        })
    
    return {
        "demo_users": demo_users,
        "note": "These are demo credentials for testing purposes"
    }
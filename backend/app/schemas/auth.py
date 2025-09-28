from pydantic import BaseModel
from typing import Optional

# Authentication request schemas
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class User(BaseModel):
    id: int
    username: str
    name: str
    role: str
    email: Optional[str] = None
    department: Optional[str] = None
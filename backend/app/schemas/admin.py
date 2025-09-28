from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Admin Dashboard Schemas

class AdminInfo(BaseModel):
    loggedAs: str

class CompanySummary(BaseModel):
    name: str
    todayKWh: int
    todayCost: int
    todayCO2: float
    comparisonPercent: int
    comparisonPeriod: str
    totalEmployees: int
    avgPerEmployee: int
    topPerformer: str
    needsAttention: str

class EmployeeData(BaseModel):
    id: int
    name: str
    target: int
    used: int
    forecast: int
    unit: str
    department: str
    efficiency: int
    rank: int

class RealTimeUsagePoint(BaseModel):
    time: str
    kWe: int

class DepartmentTarget(BaseModel):
    name: str
    progress: int

class Device(BaseModel):
    name: str
    usage: float
    hours: float  # Changed from str to float
    efficiency: int

class EmployeeFootprint(BaseModel):
    name: str
    department: str
    workingPattern: str
    totalMonthly: float
    dailyAverage: float
    carbonFootprint: float
    costImpact: float  # Changed from int to float to match JSON
    devices: List[Device]
    weeklyTrend: List[float]  # Changed from weeklyTrends to weeklyTrend, and int to float
    achievements: List[str]
    topRecommendation: str

class AdminDashboardResponse(BaseModel):
    adminInfo: AdminInfo
    companySummary: CompanySummary
    employeeData: List[EmployeeData]
    realTimeUsage: List[RealTimeUsagePoint]
    departmentTargets: List[DepartmentTarget]
    quickActions: List[str]
    employeeFootprints: Dict[str, EmployeeFootprint]

# Request schemas for admin operations
class SetTargetRequest(BaseModel):
    employee_name: str
    target_kwh: int
    period: str = "monthly"  # monthly, weekly, daily

class CreateEmployeeRequest(BaseModel):
    name: str
    department: str
    target_kwh: int
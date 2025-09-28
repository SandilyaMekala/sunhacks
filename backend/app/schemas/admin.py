from pydantic import BaseModel
from typing import List, Optional

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

class EmployeeData(BaseModel):
    name: str
    target: int
    used: int
    forecast: int
    unit: str

class RealTimeUsagePoint(BaseModel):
    time: str
    kWe: int

class DepartmentTarget(BaseModel):
    name: str
    progress: int

class AdminDashboardResponse(BaseModel):
    adminInfo: AdminInfo
    companySummary: CompanySummary
    employeeData: List[EmployeeData]
    realTimeUsage: List[RealTimeUsagePoint]
    departmentTargets: List[DepartmentTarget]
    quickActions: List[str]

# Request schemas for admin operations
class SetTargetRequest(BaseModel):
    employee_name: str
    target_kwh: int
    period: str = "monthly"  # monthly, weekly, daily

class CreateEmployeeRequest(BaseModel):
    name: str
    department: str
    target_kwh: int
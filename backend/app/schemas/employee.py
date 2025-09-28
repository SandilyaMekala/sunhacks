from pydantic import BaseModel
from typing import List, Optional

# Employee Dashboard Schemas

class EmployeeInfo(BaseModel):
    loggedAs: str

class CompanyTarget(BaseModel):
    targetKWh: int
    currentKWh: int
    progressPercent: int
    unit: str

class EnergyPeriod(BaseModel):
    used: float
    target: int

class EnergyRings(BaseModel):
    today: EnergyPeriod
    week: EnergyPeriod
    month: EnergyPeriod

class TeamProgress(BaseModel):
    you: int
    avgDept: int
    topPeer: int

class RealTimeUsagePoint(BaseModel):
    hour: str
    usage: int

class Device(BaseModel):
    name: str
    usage: float
    unit: str

class EmployeeDashboardResponse(BaseModel):
    employeeInfo: EmployeeInfo
    companyTarget: CompanyTarget
    energyRings: EnergyRings
    teamProgress: TeamProgress
    realTimeUsage: List[RealTimeUsagePoint]
    myDevices: List[Device]
    nudges: List[str]
    recentActivity: List[str]

# Base employee schema for individual employee data
class EmployeeBase(BaseModel):
    employee_id: Optional[int] = None
    name: Optional[str] = None
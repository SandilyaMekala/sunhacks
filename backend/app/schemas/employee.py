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

class Task(BaseModel):
    name: str
    category: str
    duration: str
    carbonFootprint: float
    unit: str
    efficiency: str
    description: str
    carbonIntensity: str
    tips: str

class TaskSummary(BaseModel):
    totalTasks: int
    totalCarbonFootprint: float
    averageCarbonPerTask: float
    mostEfficientTask: str
    highestImpactTask: str
    dailyCarbonTarget: float
    carbonProgress: float
    unit: str

class Streak(BaseModel):
    current: int
    best: int
    type: str
    description: str

class Badge(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    color: str
    earnedDate: str
    points: int
    rarity: str

class Achievement(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    progress: int
    target: int
    unit: str
    reward: str
    category: str

class Leaderboard(BaseModel):
    weeklyRank: int
    monthlyRank: int
    totalEmployees: int
    percentile: int

class DailyTask(BaseModel):
    id: str
    name: str
    description: str
    points: int
    completed: bool
    progress: Optional[int] = None
    target: Optional[int] = None
    icon: str
    category: str

class WeeklyChallenge(BaseModel):
    name: str
    description: str
    progress: int
    target: int
    reward: str
    icon: str
    deadline: str

class Gamification(BaseModel):
    currentPoints: int
    level: int
    levelName: str
    nextLevel: str
    pointsToNextLevel: int
    totalPointsForNextLevel: int
    streak: Streak
    badges: List[Badge]
    achievements: List[Achievement]
    leaderboard: Leaderboard
    dailyTasks: List[DailyTask]
    weeklyChallenge: WeeklyChallenge

class EmployeeDashboardResponse(BaseModel):
    employeeInfo: EmployeeInfo
    companyTarget: CompanyTarget
    energyRings: EnergyRings
    teamProgress: TeamProgress
    realTimeUsage: List[RealTimeUsagePoint]
    myDevices: List[Device]
    myTasks: Optional[List[Task]] = None
    taskSummary: Optional[TaskSummary] = None
    gamification: Optional[Gamification] = None
    nudges: List[str]
    recentActivity: List[str]

# Base employee schema for individual employee data
class EmployeeBase(BaseModel):
    employee_id: Optional[int] = None
    name: Optional[str] = None
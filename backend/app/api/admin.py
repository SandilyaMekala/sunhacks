from fastapi import APIRouter, HTTPException, Body
from typing import List
import json
import os
from app.schemas.admin import AdminDashboardResponse, SetTargetRequest, CreateEmployeeRequest

router = APIRouter()

# Path to the JSON data file
ADMIN_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "admin_data.json")

def load_admin_data():
    """Load admin dashboard data from JSON file"""
    try:
        with open(ADMIN_DATA_PATH, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Admin data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in admin data file")

def save_admin_data(data):
    """Save admin dashboard data to JSON file"""
    try:
        with open(ADMIN_DATA_PATH, 'w') as file:
            json.dump(data, file, indent=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save data: {str(e)}")

@router.get("/dashboard", response_model=AdminDashboardResponse)
async def get_admin_dashboard():
    """
    Get complete admin dashboard data including:
    - Company summary (today's consumption, cost, CO2)
    - All employee data with targets and forecasts
    - Real-time company usage
    - Department targets and progress
    - Quick action items
    """
    data = load_admin_data()
    return AdminDashboardResponse(**data)

@router.get("/employees")
async def get_all_employees():
    """
    Get detailed information about all employees including targets and performance
    """
    data = load_admin_data()
    employees = data["employeeData"]
    
    # Calculate additional metrics
    total_employees = len(employees)
    on_track = sum(1 for emp in employees if emp["forecast"] <= 0)
    at_risk = total_employees - on_track
    
    return {
        "employees": employees,
        "summary": {
            "total_employees": total_employees,
            "on_track": on_track,
            "at_risk": at_risk,
            "average_usage": sum(emp["used"] for emp in employees) // total_employees
        }
    }

@router.get("/company-summary")
async def get_company_summary():
    """
    Get company-wide energy summary and comparison metrics
    """
    data = load_admin_data()
    summary = data["companySummary"]
    
    # Calculate additional insights
    cost_per_kwh = round(summary["todayCost"] / summary["todayKWh"], 2)
    co2_per_kwh = round(summary["todayCO2"] / summary["todayKWh"] * 1000, 3)  # kg per kWh
    
    return {
        "summary": summary,
        "insights": {
            "cost_per_kwh": cost_per_kwh,
            "co2_per_kwh_kg": co2_per_kwh,
            "trend": "improving" if summary["comparisonPercent"] < 0 else "worsening"
        }
    }

@router.get("/real-time-usage")
async def get_company_real_time_usage():
    """
    Get company-wide real-time energy usage data
    """
    data = load_admin_data()
    usage_data = data["realTimeUsage"]
    
    # Calculate current usage and peak
    current_usage = usage_data[-1]["kWe"] if usage_data else 0
    peak_usage = max(point["kWe"] for point in usage_data) if usage_data else 0
    
    return {
        "usage_data": usage_data,
        "current_kW": current_usage,
        "peak_kW": peak_usage,
        "timestamp": "2025-09-27T15:30:00Z"
    }

@router.get("/departments")
async def get_department_targets():
    """
    Get all department targets and progress
    """
    data = load_admin_data()
    departments = data["departmentTargets"]
    
    # Calculate department insights
    avg_progress = sum(dept["progress"] for dept in departments) // len(departments)
    best_dept = max(departments, key=lambda x: x["progress"])
    worst_dept = min(departments, key=lambda x: x["progress"])
    
    return {
        "departments": departments,
        "insights": {
            "average_progress": avg_progress,
            "best_performing": best_dept,
            "needs_attention": worst_dept
        }
    }

@router.post("/set-target")
async def set_employee_target(request: SetTargetRequest):
    """
    Set energy consumption target for an employee
    """
    data = load_admin_data()
    employees = data["employeeData"]
    
    # Find and update employee
    employee_found = False
    for employee in employees:
        if employee["name"] == request.employee_name:
            old_target = employee["target"]
            employee["target"] = request.target_kwh
            employee_found = True
            
            # Recalculate forecast based on current usage
            # This is a simple forecast calculation - in reality would be more complex
            usage_ratio = employee["used"] / request.target_kwh
            if usage_ratio > 1.1:
                employee["forecast"] = int((usage_ratio - 1) * 100)
            elif usage_ratio < 0.9:
                employee["forecast"] = -int((1 - usage_ratio) * 100)
            else:
                employee["forecast"] = 0
            
            break
    
    if not employee_found:
        raise HTTPException(status_code=404, detail=f"Employee '{request.employee_name}' not found")
    
    # Save updated data
    save_admin_data(data)
    
    return {
        "message": f"Target updated for {request.employee_name}",
        "old_target": old_target,
        "new_target": request.target_kwh,
        "period": request.period
    }

@router.post("/employee")
async def create_employee(request: CreateEmployeeRequest):
    """
    Add a new employee to the system
    """
    data = load_admin_data()
    employees = data["employeeData"]
    
    # Check if employee already exists
    if any(emp["name"] == request.name for emp in employees):
        raise HTTPException(status_code=400, detail=f"Employee '{request.name}' already exists")
    
    # Add new employee
    new_employee = {
        "name": request.name,
        "target": request.target_kwh,
        "used": 0,  # Start with 0 usage
        "forecast": 0,  # No forecast data initially
        "unit": "kWh/mo"
    }
    
    employees.append(new_employee)
    
    # Save updated data
    save_admin_data(data)
    
    return {
        "message": f"Employee '{request.name}' created successfully",
        "employee": new_employee
    }

@router.get("/quick-actions")
async def get_quick_actions():
    """
    Get available quick actions for admin
    """
    data = load_admin_data()
    return {
        "actions": data["quickActions"],
        "available_actions": [
            "Set employee targets",
            "Start energy challenge",
            "Generate monthly report",
            "Send energy tips",
            "Schedule maintenance"
        ]
    }
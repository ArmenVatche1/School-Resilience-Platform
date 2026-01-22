from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import random

app = FastAPI(title="FPP Skill Generator + Teacher Dashboard System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================================
# 1. LOGIN MODEL + USERS
# ================================

class LoginInput(BaseModel):
    username: str
    password: str

# Simple hard-coded prototype accounts
USERS = {
    "student1": {"password": "student123", "role": "student"},
    "teacher1": {"password": "teacher123", "role": "teacher"},
}

@app.post("/api/login")
async def login(data: LoginInput):
    user = USERS.get(data.username)
    if not user or user["password"] != data.password:
        return {"success": False, "error": "Invalid username or password"}

    return {"success": True, "role": user["role"]}


# ================================
# 2. STUDENT INPUT MODEL
# ================================

class StatementInput(BaseModel):
    student_id: str
    skill: str
    context: str
    action: str
    impact: str


# ================================
# 3. VERB FAMILIES
# ================================

VERBS = {
    "Resilience": ["kept going", "persisted", "didn't give up"],
    "Adaptability": ["adapted", "adjusted", "handled change"],
    "Problem-Solving": ["solved a challenge", "evaluated options", "figured out a solution"],
    "Communication": ["communicated clearly", "explained my ideas", "shared information effectively"],
    "Collaboration": ["worked with others", "supported teammates", "contributed to group goals"],
}


# ================================
# 4. PATTERNS A / B / C
# ================================

def pattern_a(verb: str, data: StatementInput) -> str:
    return f"I {verb} when {data.context}, by {data.action}, which {data.impact}."

def pattern_b(verb: str, data: StatementInput) -> str:
    return f"I {verb} by {data.action}, leading to {data.impact}."

def pattern_c(verb: str, data: StatementInput) -> str:
    return f"I demonstrated {data.skill.lower()} when {data.context}, which {data.impact}."

PATTERNS = [pattern_a, pattern_b, pattern_c]


# ================================
# 5. STUDENT SUBMISSION STORAGE
# ================================

SUBMISSIONS = []  # Stored in memory for prototype


# ================================
# 6. OFSTED CHECKLIST
# ================================

OFSTED_KEYWORDS = {
    "Problem-Solving": ["solve", "evaluated", "figure", "solution", "challenge"],
    "Communication": ["communicated", "explained", "shared", "presented"],
    "Resilience": ["persisted", "kept going", "didn't give up", "overcame"],
    "Collaboration": ["team", "group", "worked with", "supported"],
    "Adaptability": ["adapted", "adjusted", "handled change", "flexible"],
}

def check_ofsted(statement: str):
    result = {}
    for category, keywords in OFSTED_KEYWORDS.items():
        result[category] = any(k.lower() in statement.lower() for k in keywords)
    return result


# ================================
# 7. MAIN STUDENT STATEMENT GENERATOR
# ================================

@app.post("/api/generate")
async def generate_statement(data: StatementInput):

    verb = random.choice(VERBS.get(data.skill, ["used my skills"]))
    pattern = random.choice(PATTERNS)
    statement = pattern(verb, data)
    word_count = len(statement.split())

    # Save submission
    submission = {
        "student_id": data.student_id,
        "skill": data.skill,
        "statement": statement,
        "word_count": word_count,
        "timestamp": datetime.now().isoformat(),
        "ofsted_check": check_ofsted(statement),
    }
    SUBMISSIONS.append(submission)

    return {
        "statement": statement,
        "word_count": word_count,
        "ofsted_check": submission["ofsted_check"],
    }


# ================================
# 8. TEACHER DASHBOARD: VIEW ALL SUBMISSIONS
# ================================

@app.get("/api/submissions")
async def teacher_dashboard():
    return SUBMISSIONS

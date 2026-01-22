# School Resilience Platform  
## Skills Statement Generator (Internship Prototype)

## Overview

This repository contains a **Skills Statement Generator prototype** developed as part of a **University-funded internship** with **School Resilience Platform (SRP)**.

The tool is designed to support **student reflection, employability skills articulation, and evidence tracking**, while also providing **teachers with Ofsted-aligned insight** into student learning outcomes.

The system is intended to be used as a **course-embedded add-on**, not as a standalone public website.

---

## What the System Does

### For Students
- Log in using a student account
- Enter:
  - Skill
  - Context
  - Action
  - Impact
- Automatically generate a short, CV-ready skills statement
- Receive immediate feedback on:
  - word count
  - Ofsted-aligned evidence indicators
- Submissions are saved automatically for teacher review

### For Teachers
- Log in using a teacher account
- View all student submissions in one dashboard
- See:
  - student identifier
  - selected skill
  - generated statement
  - word count
  - submission timestamp
- Review automatic **Ofsted checklist mapping** for each submission
- Refresh the dashboard to view new student entries

---

## Skills & Ofsted Alignment

The system is built around SRP’s **Human Superpowers framework**, including:

- Resilience  
- Adaptability  
- Problem-Solving  
- Communication  
- Collaboration  

Each generated statement is automatically analysed using a **keyword-based Ofsted-style checklist** to highlight evidence of:

- personal development  
- communication  
- teamwork  
- resilience  
- problem-solving  

This reduces the need for manual review and supports inspection-ready evidence collection.

---

## Technology Stack

### Backend
- Python
- FastAPI
- Uvicorn

### Frontend
- React
- Vite
- Tailwind CSS

### Architecture
- Frontend and backend run as **separate services**
- REST API communication
- In-memory data storage (prototype stage)

---

## How to Run the Project Locally

### Backend Setup
Run these in terminal:
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

In another teb of terminal run this:

cd frontend
npm install
npm run dev

Application Flow

Student logs in

Student completes the skills form

System generates a structured statement

Submission is saved by the backend

Ofsted checklist analysis is applied automatically

Teacher logs in

Teacher reviews all student submissions in one dashboard

Scaling the Project

This prototype is intentionally lightweight and designed to be extended.

Authentication

Replace hard-coded users with:

secure login system

JWT authentication

Single Sign-On (SSO)

Data Storage

Replace in-memory storage with:

PostgreSQL or MySQL

Firebase

integration with school MIS systems

Ofsted Analysis

Expand keyword matching to:

weighted scoring

rubric-based evaluation

AI-assisted qualitative feedback

Curriculum Integration

Embed directly into:

SRP courses

lesson modules

structured reflection activities

Reporting

Export summaries for:

inspections

student portfolios

progress reviews

CV or personal statement generation

Project Scope (Internship)

This project represents one module of a wider SRP employability and resilience platform.

The focus of this module is:

reflective learning

skills articulation

evidence mapping

It is designed to integrate with future tools such as:

CV builders

personal statement generators

portfolio systems

Armen Kevorkian
School Resilience Platform – AI-Assisted Employability Tools
Week 1: Research, System Understanding, Prototype Development
1. Project Context

This week focused on understanding the underlying logic, structure, and goals of the School Resilience Platform’s AI-assisted employability and career-readiness tools. The internship project revolves around transforming the “Future-Proof Pathways” (FPP) Human Superpowers framework into a digital skill-statement generator that creates short, student-friendly sentences demonstrating employability skills.

The primary tasks this week included:

Studying the educational and technical blueprint documents.

Extracting the logic rules needed to generate valid skill statements.

Designing and implementing a functioning backend using FastAPI.

Building the foundational frontend using React, Vite, and TailwindCSS.

Ensuring the prototype aligns with the FPP categories, patterns, and constraints.

Documenting all research, decisions, and methodologies.

This document provides a comprehensive record of all research and technical understanding developed this week.

🟦 2. Research Into Human Superpowers Framework

The “Future-Proof Pathways” framework structures employability skills into five core categories known as Human Superpowers. These are meant to help students articulate their strengths in a simple, accessible way.

2.1 Human Superpowers Categories

Resilience – continuing effort despite challenges

Adaptability – adjusting to new conditions, flexibility

Problem-Solving – evaluating, analyzing, creating solutions

Communication – expressing ideas clearly, speaking, presenting

Collaboration – working effectively with others

Research insight:
These categories serve as the foundational classification system for the generator. Any statement must map to one of these five.

2.2 Why These Categories Matter

They provide a common vocabulary for students and educators.

They align with national employability frameworks.

They simplify the logic required for generating statements.

They allow consistent scaling — every new student behavior aligns to one of the five superpowers.

🟦 3. Input Model Research

The blueprint documents clearly define the required inputs for generating a skills-based statement:

Required Inputs (Blueprint Requirements):

Skill → chosen from one of the Human Superpowers

Context → situation in which the skill was demonstrated

Action → what the student actually did

Impact → positive result of the action

Research insight:
The input model mirrors a simplified STAR method (Situation, Task, Action, Result). This makes statements grounded and meaningful.

🟦 4. Sentence Structure Models (Patterns A, B, C)

The documentation described three official sentence patterns:

Pattern A (Completed This Week)

Structure:
“I [verb] when [context], by [action], which [impact].”

This is the version implemented in the first backend prototype.

Pattern B (To be implemented next)

“I [verb] by [action], leading to [impact].”

Pattern C (To be implemented next)

“I demonstrated [skill] when [context], which [impact].”

Research insight:
Patterns allow variation and prevent outputs from sounding repetitive.
They also help educators match different literacy levels.

🟦 5. Verb Mapping Research

The FPP documents include recommended verb families for each superpower. Example mappings (studied and extracted from blueprint):

Skill	Example Verbs
Resilience	kept going, persisted
Adaptability	adapted, adjusted
Problem-Solving	solved a challenge, evaluated options
Communication	communicated clearly, explained ideas
Collaboration	worked with others, supported teammates

Research insight:
The verbs communicate how the student expresses that skill.
This mapping ensures consistency and avoids over-complex sentences.

You implemented a simplified version of these mappings in the backend prototype.

🟦 6. Word Count & Validation Rules

From the blueprint guidelines, the generator must enforce:

Length requirement:

Minimum: 18 words

Maximum: 40 words

Tone requirements:

Student-friendly language

No exaggeration

Clear and concise

First-person statements (“I…”)

Input validation requirements:

All four fields must be provided

Skill must map to a valid category

Word count must meet thresholds

Verb must match the selected skill

Research insight:
These constraints ensure statements stay readable and suitable for schools, CVs, and digital portfolios.

🟦 7. Technical Architecture Research

The system includes two major components:

7.1 Backend Architecture (FastAPI)
Responsibilities:

Handle input from frontend

Validate skill, context, action, impact

Select appropriate verb

Apply Pattern A sentence logic

Enforce word count

Return structured JSON response

Why FastAPI?

Extremely fast, modern, and lightweight

Auto-generates Swagger documentation

Easy JSON handling

Simple async support

Perfect for rapid prototyping

Backend implemented this week includes:

CORS middleware

Pydantic input model

Verb dictionary

Pattern A generation logic

Word-count constraint logic

7.2 Frontend Architecture (React + Vite + Tailwind)
Responsibilities:

Input form for skill + context + action + impact

Submit fields to backend

Display generated result

Basic UI/UX layout

Form state management

Why React + Vite?

Fast development

Hot reloading

Easy component structure

Industry standard

Perfect for multi-step expansion next week

Research insight:
UI is intentionally basic for Week 1 — the goal was functionality and alignment with blueprint.

🟦 8. Development Challenges & Solutions
Challenge 1 — Folder navigation & environment setup

Solution: clarified project root, separated backend and frontend, used correct paths.

Challenge 2 — npm audit warnings

Solution: researched and confirmed they do NOT affect prototype; safe to ignore.

Challenge 3 — Connecting frontend → backend

Solution: added correct API URL, configured CORS, tested manually.

Challenge 4 — Sentence logic alignment

Solution: extracted Pattern A exactly from blueprint and validated mapping.

🟦 9. What Was Completed This Week
✔ Research

Human Superpowers model

Input model

Patterns A/B/C

Verb families

Blueprint constraints

AI-supported statement logic

Technical architecture

✔ Backend (working)

FastAPI server

Input model

Verb mapping

Pattern A generation

Word-count enforcement

JSON response handling

Swagger documentation

✔ Frontend (working)

UI skeleton

Form inputs

Fetch request to backend

Live statement generation

Basic styling with Tailwind

✔ Documentation

Folder structure creation

Research notes

Timesheet draft

Prototype readme

# Project

MOVI Persona

---

# Mission

Build a movie-themed personality diagnosis platform.

Users answer cinematic scenario questions.

The system analyzes behavioral tendencies and assigns a movie archetype.

The goal is not clinical psychology.

The goal is:

- entertainment
    
- self-discovery
    
- movie recommendation
    
- social sharing
    
- cinematic immersion
    

---

# Core Product Vision

This product is NOT:

- a movie database
    
- a movie review site
    
- a streaming service
    
- a psychological diagnosis tool
    

This product IS:

A Movie Archetype Discovery Experience

The user should feel:

"What kind of movie protagonist would I be?"

---

# Source of Truth

Implementation must follow the documents below.

Priority Order

1. docs/security.md
    
2. docs/scoring_engine.md
    
3. docs/data_model.md
    
4. docs/mapping.md
    
5. docs/archetypes.md
    
6. docs/rules.md
    
7. docs/questions.md
    
8. docs/result_templates.md
    
9. docs/axis_validation.md
    
10. docs/branding.md
    

If documents conflict:

Higher priority wins.

---

# Security Requirements

Security requirements are mandatory.

Convenience never overrides security.

All implementations must follow:

docs/security.md

---

# Security Rules

Never hardcode secrets.

Never expose API keys.

Never store credentials in source code.

Never bypass authorization checks.

Never trust client input.

Validate all user input.

Sanitize all rendered content.

---

# Copyright Rules

Respect intellectual property.

Allowed

- movie titles
    
- release years
    
- directors
    
- genres
    
- short descriptions
    

Do not assume permission to use:

- movie posters
    
- studio artwork
    
- official logos
    
- movie screenshots
    

Copyright-sensitive assets require explicit review.

---

# Brand Identity

UI and UX decisions must follow:

docs/branding.md

The application should feel like:

A movie poster about the user.

Not:

- a dashboard
    
- a survey
    
- a spreadsheet
    
- a streaming platform
    

---

# Psychological Framework

Inspired by:

- Big Five Personality Theory
    
- Narrative Identity Theory
    
- Moral Psychology
    
- Behavioral Analysis
    

Results are entertainment.

Results are not medical advice.

Results are not psychological diagnoses.

---

# Diagnosis Engine

The scoring system is defined only in:

docs/scoring_engine.md

Never create scoring logic outside the scoring engine specification.

Never hardcode archetype calculations inside UI components.

All scoring logic must remain transparent and auditable.

---

# Architecture

Phase 1

Frontend Only

No Backend

No Database

No Authentication

No External AI APIs

---

# Technology Stack

Preferred

- React
    
- TypeScript
    
- Vite
    
- TailwindCSS
    

State Management

- Zustand  
    or
    
- React Context
    

---

# Data Structure

Questions must be configuration-driven.

Do not hardcode questions.

Preferred format

JSON

Example

questions.json

archetypes.json

recommendations.json

---

# Directory Structure

MOVI Persona/
  project/
    README.md
    AGENTS.md
  docs/
    branding.md
    security.md
    scoring_engine.md
    data_model.md
    mapping.md
    archetypes.md
    rules.md
    questions.md
    axis_validation.md
    result_templates.md
    roadmap.md
  src/
    components/
    pages/
    data/
    utils/
    types/

---

# User Experience Principles

The user should start the diagnosis quickly.

Avoid long onboarding.

Avoid large blocks of text before diagnosis begins.

The first screen should focus on:

Curiosity

Immersion

Action

---

# Homepage Goal

The homepage has one job:

Start the diagnosis.

Recommended structure

Hero

↓

How It Works

↓

Example Archetypes

↓

Start Diagnosis

---

# Question Experience

Questions must feel cinematic.

Avoid

- generic surveys
    
- academic questionnaires
    

Use

- narrative scenes
    
- emotional decisions
    
- dramatic tension
    

Every question should feel like a movie scene.

---

# Result Experience

The result screen is the most important screen.

The result page should feel like:

A movie poster of the user's life.

---

# Required Result Sections

MVP may render simplified versions of these sections.

Long-form reports may be generated from templates and archetype source data.

1. Hero Poster
    
2. Character Overview
    
3. Psychological Analysis
    
4. Behavioral Analysis
    
5. Screenwriter Report
    
6. Behavioral Intelligence Report
    
7. Strengths
    
8. Weaknesses
    
9. Recommended Movies
    
10. Share Card
    

---

# Behavioral Intelligence Report

Must be fictional.

Do not reference:

CIA

FBI

Government Agencies

Use:

Behavioral Intelligence Report

Behavioral Analysis Report

Narrative Analysis Report

---

# Visual Style

Keywords

- Cinematic
    
- Premium
    
- Elegant
    
- Mysterious
    
- Shareable
    

Primary Color

Deep Navy

Accent

Gold

Background

Near Black
 
 Use filenames in uppercase from src/data”
---

# Accessibility

Responsive design required.

Support:

- Mobile
    
- Tablet
    
- Desktop
    

Accessibility should not be sacrificed for aesthetics.

---

# Performance Rules

Target

Page load under 2 seconds.

Avoid unnecessary dependencies.

Avoid heavy client-side processing.

Optimize images.

Lazy load non-critical assets.


Legacy 12-axis terminology is deprecated.

When generating content:

Always use

Core Dimensions
Secondary Traits

Never generate reports using legacy axis names.

---

# Trait Naming Convention

Always use canonical trait codes internally.

Allowed codes:

- RISK
- SACRIFICE
- COLLECTIVISM
- JUSTICE

Display labels may differ.

Never use display labels as storage keys.

# Future Roadmap

Phase 1

Diagnosis MVP

---

Phase 2

Movie Recommendations

Movie History Map

---

Phase 3

User Accounts

Cloud Sync

---

Phase 4

AI Character Analysis

AI Movie Companion

---

# AI Integration Rules

Phase 1

External AI APIs are prohibited.

Reason

- cost control
    
- simplicity
    
- security
    

Future AI features must remain optional.

The core diagnosis must always work offline.

---

# Development Principles

Configuration over hardcoding.

Documentation over assumptions.

Security over convenience.

Maintainability over shortcuts.

User trust over growth.

---

# Success Criteria

The user completes the diagnosis within:

5-10 minutes

The user receives:

- a movie archetype
    
- a shareable identity
    
- a memorable experience
    

Success is achieved when the user says:

"This feels like a movie poster of my life."

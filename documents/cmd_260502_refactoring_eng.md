# =========================================
# ■ English Version
# =========================================

## ■ Purpose
This project aims to safely modularize a 1800+ line HTML/JS game
into a fully data-driven architecture with stage-swappable design.

Important rules:
- Game behavior must NOT change
- This is structural refactoring only
- No logic changes allowed

---

## ■ Core Design Principles

### ① Separation of Concerns
Strict separation of:

- Behavior (AI)
- Rendering (visuals)
- UI (interface)
- Data (text/config)
- World (stage/environment)
- Meta information (version/history/build)

---

### ② Data-Driven Design
- No dialogue inside code
- External data controls all text and parameters
- AI outputs only state codes

---

### ③ Stage-Swappable Architecture
- Same AI, multiple game variations
- Stage defines parameters only
- Core engine remains fixed

---

## ■ Final Folder Structure

/index.html

/core/
  gameLoop.js
  stateManager.js
  config.js

/entities/
  human.js
  block.js

/world/
  world.js
  collapse.js

/render/
  renderer.js
  spriteCache.js
  zOrder.js

/ui/
  text_system.js
  score.js

/text/
  human_text_jp.js
  human_text_us.js
  human_text_base.js

/stage/
  stage_jp.js
  stage_us.js
  stage_loader.js

/data/
  constants.js
  rules.js

/meta/
  version.js
  changelog.js
  buildInfo.js

---

## ■ Layer Responsibilities

### core
Main game loop and state control

### entities
AI behavior and object logic only

### world
Environment and collapse system

### render
Rendering only (NO logic allowed)

### ui
Score and interface display

### text
Pure dialogue data (NO logic)

### stage
Game balancing parameters only

### data
Global constants and rules

### meta
Versioning, changelog, build metadata (non-game logic)

---

## ■ Text System Rules

- human.js outputs ONLY state codes

Example:
FALL / CLIMB / DROWN / IDLE

- Text is resolved externally via dictionaries

---

## ■ Stage Rules

- Numeric parameters only
- Text pack selection only
- No behavior logic allowed

---

## ■ Meta Rules

- version.js → version control
- changelog.js → moved from source history
- buildInfo.js → build/debug info

STRICT RULE:
- Must NOT affect gameplay logic
- Must NOT be used by AI behavior

---

## ■ Absolute Forbidden Rules

- No dialogue inside human.js
- No game logic inside render
- No branching inside stage
- No logic inside text files
- No gameplay dependency on meta

---

## ■ Success Criteria

- Identical gameplay behavior
- No physics or timing changes
- No UI breaking
- No AI behavior deviation

---

## ■ Failure Criteria

- Any behavior change
- Missing features
- UI corruption
- Randomness changes

---

## ■ Final Goal

- Fully modular architecture
- Data-driven text system
- Stage-swappable design
- Complete separation of behavior and presentation
- Meta-layer isolation

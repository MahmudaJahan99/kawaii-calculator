# 🍬 Kawaii Calc

> *Math, but make it adorable.*

A cutesy-themed calculator app built with **React 19** as part of a hands-on learning journey. This project focuses on real-world React patterns, clean file structure, and professional habits — wrapped in a pastel candy aesthetic.

---

## ✨ Features

- Full arithmetic: addition, subtraction, multiplication, division
- Percentage and negation (`%`, `+/-`)
- Chained operations (e.g. `5 + 3 × 2`)
- Expression display showing the current operation
- Divide-by-zero and edge-case handling
- Animated button presses with Framer Motion
- Fully responsive, centered layout

---

## ⚛️ React Concepts Practiced

| Concept | Where |
|---|---|
| `useState` | `useCalculator.js` — all calculator state |
| Custom Hooks | `useCalculator.js` — logic fully decoupled from UI |
| Component composition | `Calculator → ButtonGrid → CalcButton` |
| Props & destructuring | All components receive typed props |
| Data-driven rendering | `ButtonGrid` maps `BUTTON_CONFIG` array |
| CSS Modules | Scoped styles per component |
| `StrictMode` | `main.jsx` — catches impure renders in dev |
| Controlled state | Display is 100% driven by hook state |

---

## 🗂️ Project Structure

```
kawaii-calc/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── Calculator.jsx
│   │   │   ├── Calculator.module.css
│   │   │   ├── Display.jsx
│   │   │   ├── Display.module.css
│   │   │   ├── ButtonGrid.jsx
│   │   │   ├── ButtonGrid.module.css
│   │   │   ├── CalcButton.jsx
│   │   │   └── CalcButton.module.css
│   │   └── ui/
│   │       └── Logo.jsx
│   ├── hooks/
│   │   └── useCalculator.js
│   ├── utils/
│   │   └── calculate.js
│   ├── constants/
│   │   └── buttons.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.cjs
├── vite.config.js
└── package.json
```

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styles |
| [Framer Motion](https://www.framer.com/motion/) | Button animations |
| [clsx](https://github.com/lukeed/clsx) | Conditional className utility |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Code quality & formatting |

---

## 🎨 Design System

**Fonts** — Google Fonts

| Font | Role |
|---|---|
| Baloo 2 | Logo / display headings |
| Nunito | Button labels |
| DM Mono | Calculator display numbers |

**Color Palette**

| Token | Hex | Role |
|---|---|---|
| `--kc-bg` | `#FFF8F0` | Page background |
| `--kc-pink` | `#FFB7C5` | Equals button |
| `--kc-lavender` | `#C8B6E2` | Operator buttons |
| `--kc-mint` | `#B5EAD7` | Action buttons |
| `--kc-peach` | `#FFDAB9` | Accent / cheeks |
| `--kc-text` | `#4A3F3F` | Primary text |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/kawaii-calc.git
cd kawaii-calc

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

---

## 📐 Naming Conventions

- **Components** — PascalCase: `CalcButton.jsx`
- **Hooks** — camelCase + `use` prefix: `useCalculator.js`
- **CSS Modules** — same name as component: `CalcButton.module.css`
- **Constants** — camelCase file, SCREAMING_SNAKE exports: `BUTTON_CONFIG`
- **Utilities** — camelCase, pure functions: `calculate.js`
- **Event handlers** — `handle` prefix: `handleButtonPress`

---

## 🗺️ Build Roadmap

- [x] Step 1 — Theme & global styles
- [x] Step 2 — Constants & pure logic utilities
- [x] Step 3 — `useCalculator` custom hook
- [x] Step 4 — UI components + CSS Modules
- [ ] Step 5 — Wire hook into components (`App.jsx`)
- [ ] Step 6 — Framer Motion animations
- [ ] Step 7 — Polish (keyboard support, favicon, responsive)

---

## 🧠 Key Architecture Decisions

**Why one `useState` instead of four?**
All four state values change together on every button press. A single `setCalcState` call produces a single render, preventing momentary inconsistent states.

**Why separate `calculate.js` from the hook?**
Pure functions with no React dependencies are trivially testable and reusable. If the logic is ever wrong, you know exactly where to look.

**Why `BUTTON_CONFIG` as a data array?**
Adding or rearranging buttons requires changing one config object — zero component changes. This is the data-driven UI pattern used in production React apps.

---

## 👩‍💻 Author

Built as Project #2 of a React 19 learning journey.

---

*Made with 🍓 and a lot of `parseFloat`*

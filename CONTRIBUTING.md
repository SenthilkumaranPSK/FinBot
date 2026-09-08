# Contributing to Place Gaurd 🛡️

Thank you for your interest in contributing to **Place Gaurd (PlaceGuard AI)**! We welcome contributions from developers, designers, and students worldwide to build the most secure and helpful campus placement ecosystem.

---

## 🛠️ Development Setup

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/your-username/place-gaurd.git
   cd place-gaurd
   ```

2. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

3. **Start Development Environment**:
   ```bash
   npm run dev
   ```
   - Frontend runs at: `http://localhost:5173`
   - Backend API runs at: `http://localhost:5000`

---

## 🌿 Branch Naming & Git Conventions

- `feat/feature-name`: New features (e.g. `feat/salary-negotiation-ai`)
- `fix/bug-description`: Bug fixes (e.g. `fix/ats-keyword-parser`)
- `docs/doc-update`: Documentation changes
- `refactor/code-cleanup`: Refactoring without functional changes

---

## 📋 Pull Request Process

1. Ensure code builds without errors (`npm run build` in `client`).
2. Follow existing code formatting and styling guidelines.
3. Provide a clear and descriptive pull request summary with screenshots if UI changes were made.
4. Link any related issues in the PR description.

---

## 💡 Code Style Guidelines

- **React / Frontend:** Modern functional components with hooks, Lucide icons, and TailwindCSS utility classes.
- **State:** Context API (`PlacementContext.jsx`, `ThemeContext.jsx`) for global state with local persistence.
- **Animations:** Framer Motion for smooth transitions.

Thank you for helping make campus recruitment safer and more transparent for everyone! 🚀

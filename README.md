# 📝 Dynamic To-Do List Web App

A clean, responsive, front-end To-Do List web application built exclusively with **HTML5, CSS3, and Vanilla JavaScript** featuring a modern **White & Orange** theme.

---

## 🎨 UI/UX Design: White & Orange Theme
- **Color Palette**:
  - Primary Orange: `#f97316` / `#ea580c`
  - Warm Orange Tints: `#fff7ed` (50), `#ffedd5` (100), `#fed7aa` (200)
  - Pure White & Soft Creams: `#ffffff` & `#faf8f5`
  - Subtle Warm Elevation & Card Shadows: `0 16px 36px -8px rgba(249, 115, 22, 0.1)`
- **Completed State**: Custom circular orange badge with white checkmark, strikethrough text, and soft orange accent background.
- **Micro-interactions**: Smooth task slide-in on addition, smooth fade-slide on deletion, and active button click animations.

---

## 🚀 Features & Hint-by-Hint Breakdown

| # | Prompt Hint | Implementation Details |
|---|---|---|
| **1** | **Setup basic HTML** | Semantic structure in `index.html` featuring `<input id="task-input">`, `<button id="add-btn">`, and `<ul id="task-list">`. |
| **2** | **Style layout with CSS** | Styled in `styles.css` with centered card layout, responsive flexbox, Plus Jakarta Sans typography, and custom orange checkboxes. |
| **3** | **JS event listeners on Add button** | Form submit listener and Add button click listener with validation to prevent empty tasks. |
| **4** | **Append tasks dynamically** | `renderTasks()` creates `<li>` task elements, sets attributes, and mounts them to the DOM. |
| **5** | **Mark tasks complete (toggle class)** | Toggling the `.completed` class dynamically updates text-decoration, checkbox fill, and background color. |
| **6** | **Remove button for each task** | Trash icon button triggers `deleteTask()` with a smooth exit transition (`.removing`). |
| **7** | **Test add, complete, delete** | Verified via browser testing across all three core operations. |
| **8** | **Instant UI updates without reload** | Handled with `e.preventDefault()` on form submit and immediate state re-rendering. |

---

## 📂 Project Structure

```
todo-list-app/
├── index.html       # HTML5 structure (input, add button, filters, list container)
├── styles.css       # White & Orange theme styling, animations, and responsive layout
├── script.js        # Vanilla JS logic (state management, DOM manipulation, localStorage)
└── README.md        # Documentation and running guide
```

---

## 🛠️ How to Run in VS Code & Chrome Browser

### Option A: Using Live Server (Recommended)
1. Open the project folder in **VS Code**:
   ```powershell
   code C:\Users\andrews\.gemini\antigravity\scratch\todo-list-app
   ```
2. If not installed, search for the extension **"Live Server"** by *Ritwick Dey* in the Extensions tab (`Ctrl+Shift+X`) and click **Install**.
3. Right-click on `index.html` in the VS Code file explorer.
4. Select **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
5. The app will launch in your default **Chrome Browser** at `http://127.0.0.1:5500/index.html`.

### Option B: Direct in Chrome Browser
Double-click `index.html` or open PowerShell and run:
```powershell
Start-Process chrome.exe "C:\Users\andrews\.gemini\antigravity\scratch\todo-list-app\index.html"
```

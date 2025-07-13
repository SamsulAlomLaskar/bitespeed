# Visual Flow Builder For BiteSpeed

A modular, interactive drag-and-drop flow builder built using **React 19**, **React Flow**, and **Zustand**. Users can add custom nodes (like “Send Message”), connect them, and configure their settings via a dynamic side panel. Validation prevents invalid saves, ensuring a clean and structured flow.

---

## ✨ Features

- 🔲 Drag and drop **"Message"** nodes from the sidebar.
- 🧩 Editable node content via the **Settings Panel**.
- 🔗 Connect nodes visually using edges with a **delete button**.
- ✅ **Validation** before saving the flow.
- 🧠 Global state managed with **Zustand**.
- 🎨 Styled using **modular CSS (CSS Modules)** for scoped and maintainable styles.

---

## 🧱 Project Structure


---

## 🛠️ Tech Stack

- **React 19**
- **React Flow v11**
- **Zustand** – for state management
- **Lucide React** & **FontAwesome** – for node icons
- **CSS Modules** – for modular and scoped styles
- **Vite** – for fast development build

---

## 🚀 Getting Started

### 1. Install dependencies
npm install

### 2. Run the app
npm run dev

## Flow Logic Summary
Dragging a node adds it to the canvas.

Clicking a node opens the settings panel to update content.

Only one outgoing edge per node is allowed.

Nodes with unconnected target handles trigger a validation error on save.

All styling is scoped using CSS modules.

## Modular Styling
All component styles (like SettingsPanel.module.css) are modular and follow naming conventions.

## 📸 Sample UI
Message node styled with header, WhatsApp icon, and delete button.

Nodes panel on left, canvas in center, settings panel on right.

Save button at the top-right corner of the canvas.
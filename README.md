*Live Portfolio:* [Visit My Portfolio](https://my-portfolio-one-eta-30.vercel.app)

---
# Jaddu Veera Babu — Portfolio

Personal portfolio website for Jaddu Veera Babu, AI & Machine Learning Engineer.

Built with **React 18 + Vite 5** — no Tailwind dependency, fully self-contained.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed → [nodejs.org](https://nodejs.org)

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg          ← Neural node icon
├── src/
│   ├── index.css            ← Global reset & base styles
│   ├── main.jsx             ← React entry point
│   └── Portfolio.jsx        ← Main portfolio component (all sections)
├── index.html
├── package.json
└── vite.config.js
```

---

## ✏️ Personalisation Checklist

| What to change | Where |
|---|---|
| GitHub profile URL | `Portfolio.jsx` → search `https://github.com` |
| LinkedIn profile URL | `Portfolio.jsx` → search `https://linkedin.com` |
| Resume PDF | Add `resume.pdf` to `public/`, update href to `/resume.pdf` |
| Contact form | Replace `handleSubmit` with a Formspree / EmailJS call |

### Add your Resume PDF

1. Put your PDF in `public/Jaddu_Veera_Babu_Resume.pdf`
2. In `Portfolio.jsx`, find the Resume `<a>` tag and update:
```jsx
<a href="/Jaddu_Veera_Babu_Resume.pdf" download>
```

### Wire up the contact form (Formspree — free)

1. Create a free account at [formspree.io](https://formspree.io)
2. Get your form endpoint (e.g. `https://formspree.io/f/abcdefgh`)
3. In `Portfolio.jsx`, update `handleSubmit`:
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  setFormSent(true);
  setTimeout(() => setFormSent(false), 4000);
  setFormData({ name: "", email: "", message: "" });
};
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to:

- **Vercel** (easiest): `npx vercel` in the project root
- **Netlify**: drag & drop `dist/` at [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: use the `gh-pages` package

---

## 🎨 Tech Stack

- React 18
- Vite 5
- Inline styles (no CSS framework needed)
- Pure Canvas API for the neural network hero animation
- IntersectionObserver for scroll-reveal effects

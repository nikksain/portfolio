# 🏗️ Nikhil Sain — Civil Engineering Portfolio

A fully responsive, production-ready portfolio website built with pure HTML, CSS, and JavaScript.
No frameworks. No build tools. Upload and it works.
**🌐 Custom Domain:** https://nikhilsain.me

---

## 📁 File Structure

All files go in the **root folder** of your GitHub repository (no subfolders needed).

```
your-repo/
│
├── index.html          ← Main website (do not edit structure)
├── data.js             ← ✅ YOUR CONTENT — the ONLY file you need to edit
├── app.js              ← Website engine (do not edit)
│
├── tokens.css          ← Colors, fonts, spacing
├── base.css            ← Reset, typography, layout foundations
├── components.css      ← Buttons, nav, cards, footer, cursor, loader
├── sections.css        ← Hero, About, Skills, Projects, Blog, etc.
├── responsive.css      ← Mobile & tablet breakpoints
│
├── CNAME               ← Custom domain: nikhilsain.me
├── .nojekyll           ← Required for GitHub Pages
├── README.md           ← This file
│
├── nikhil.png          ← Your profile photo
│
├── gallery1.jpg        ← Gallery / project photos
├── gallery2.jpeg
├── gallery3.jpeg
├── gallery4.jpeg
├── gallery5.jpeg
│
├── micad1.jpg          ← MICADA internship images (used in Projects + Gallery)
├── micad2.jpg
├── micad3.jpg
├── mussoorie1.jpg      ← Surveying camp image
│
├── civilfest.jpeg      ← Estructra 2025 certificate image ✅
├── bloodcamp.jpeg      ← Blood Donation certificate image ✅
├── manali.jpeg         ← NMMS / Manali tour certificate (upload when you have it)
│
├── dcrustlogo.png      ← DCRUST university logo
├── modellogo.png       ← Model school logo
└── favicon.png         ← Browser tab icon
```

---

## 🚀 How to Deploy on GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Name it **`portfolio`** (or any name you want)
4. Set visibility to **Public**
5. Click **"Create repository"**

### Step 2 — Upload All Files
1. In your new repository, click **"uploading an existing file"**
2. **Drag and drop ALL files** from this folder into the upload area
3. Make sure ALL images (`.jpg`, `.jpeg`, `.png`) are included
4. Add a commit message like `"Upload portfolio"`
5. Click **"Commit changes"**

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings** tab
2. Scroll to **"Pages"** in the left sidebar
3. Under **Source**, select **"main"** branch and **"/ (root)"** folder
4. Click **Save**
5. Wait 2–3 minutes
6. Your site is live at `https://YOUR-USERNAME.github.io/portfolio/`

### Step 4 — Upload Your Manali Certificate Image
When you have the Manali / NMMS certificate photo, save it as `manali.jpeg`
and upload it to your repo root. The NMMS certificate card will show it automatically.

---

## ✏️ How to Update Your Content

### ✅ The ONLY file you ever need to edit: `data.js`

Open `data.js` in any text editor (Notepad on Windows, TextEdit on Mac) and find the section you want to change.

---

### 🔹 Change Personal Info
```javascript
personal: {
  firstName:  'Nikhil',                       // ← Your first name
  lastName:   'Sain',                         // ← Your last name
  email:      'civil.nikhilsain@gmail.com',   // ← Your email
  phone:      '+91 XXXXXXXXXX',               // ← Add your phone number here
  location:   'Gurgaon, Haryana, India',      // ← Your location
  cgpa:       '7.54',                         // ← Your CGPA
  gradYear:   '2026',                         // ← Graduation year
  resumeLink: 'https://drive.google.com/...', // ← Your resume Google Drive link
}
```

---

### 🔹 Change the Typewriter Roles (Hero Section)
```javascript
typedRoles: [
  'Civil Engineer',
  'B.Tech Final Year',
  'Infrastructure Enthusiast',
  // Add or remove roles here
],
```

---

### 🔹 Update About Me Bio
```javascript
about: {
  bio1: 'I am <strong>Nikhil Sain</strong>...',  // ← Edit your intro
  bio2: 'During my internship...',               // ← Edit internship paragraph
  bio3: 'I have a solid foundation...',          // ← Edit closing paragraph
}
```
You can use `<strong>bold text</strong>` inside the bio strings.

---

### 🔹 Add a New Project
Find the `projects:` array in `data.js` and add a new entry:
```javascript
{
  title:    'Your Project Title',
  filter:   'structural',       // options: water / survey / structural / highway / other
  tags:     ['Tag1', 'Tag2'],
  tagTypes: ['gold', 'steel'],  // 'gold' = amber badge, 'steel' = blue badge
  image:    'your-photo.jpg',   // filename in repo root, or '' for no image
  desc:     'Project description here...',
  location: 'City, State',
  duration: 'Duration',
  type:     'Academic / Government / etc.',
  icon:     '🔧',               // emoji shown if no image
},
```

---

### 🔹 Add a Certification
```javascript
{
  issuer:   'Organisation Name',
  title:    'Certificate Title',
  desc:     'What the certificate is for.',
  year:     '2024',
  image:    'cert-photo.jpeg',  // filename in repo root, or '' for no image
  demoLink: '#demo',            // '#demo' shows "Demo Certificate Link" tag
},
```

---

### 🔹 Add an Achievement
```javascript
{
  icon:  'fas fa-trophy',       // Font Awesome icon class
  title: 'Achievement Title',
  desc:  'Short description of the achievement.',
  year:  '2024',
},
```
Browse icons at [fontawesome.com/icons](https://fontawesome.com/icons)

---

### 🔹 Add a Gallery Photo
```javascript
{ src: 'your-photo.jpg', caption: 'Caption Text', icon: '📷' },
```
Upload the image file to your repo root first, then add this line to the `gallery:` array.

---

## 🎨 Customizing Colors & Fonts

Open `tokens.css` and edit these values:

```css
/* Main accent color (gold) */
--accent-2: #E8A420;

/* Secondary accent (steel blue) */
--steel-3: #4D8FCC;

/* Dark background */
--bg-primary: #060D18;

/* Display / heading font */
--font-display: 'Fraunces', Georgia, serif;

/* Body text font */
--font-body: 'Outfit', system-ui, sans-serif;
```

If you change the font name, also update the Google Fonts `<link>` in `index.html`.

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Dark / Light mode toggle | ✅ Saves your preference |
| Custom animated cursor | ✅ Desktop only |
| Page loading animation | ✅ |
| Scroll progress bar | ✅ |
| Hero typewriter animation | ✅ |
| Smooth scroll navigation | ✅ |
| Active section highlighting | ✅ |
| Scroll-reveal animations | ✅ |
| Skills radar chart | ✅ Chart.js |
| Project filter tabs | ✅ |
| Photo gallery with slideshow | ✅ |
| Gallery lightbox | ✅ |
| Blog CTA → Blogger page | ✅ |
| Contact form (mailto) | ✅ |
| Copy email to clipboard | ✅ |
| Back-to-top button | ✅ |
| Toast notifications | ✅ |
| Fully responsive (mobile + desktop) | ✅ |
| SEO meta tags | ✅ |
| Accessibility (ARIA labels) | ✅ |
| Blueprint SVG hero decoration | ✅ |
| Certificate image display | ✅ |

---

## 🖼️ Image Tips

- Use **JPG/JPEG** for photos, **PNG** for logos and icons
- Resize photos to around **1200px wide** before uploading
- Keep file sizes under **500 KB** for fast loading
- Use [squoosh.app](https://squoosh.app) for free image compression

---

## 📞 Contact

For questions about this portfolio: **civil.nikhilsain@gmail.com**

---

*Built with HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools — just upload and it works.*

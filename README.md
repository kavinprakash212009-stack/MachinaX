# MachinaX – Engineering Tomorrow. Today.

> **MachinaX** is a premier futuristic static website designed with Apple-grade Liquid Glass UI, frosted glassmorphism, liquid crystal button micro-interactions, responsive 3D card tilt effects, ambient neural canvas particle networks, and high-performance client-side rendering.

Built strictly with **HTML5, CSS3, and Vanilla JavaScript**—with zero build steps, zero Node.js server dependencies, and full static compatibility for direct `file:///` browser viewing and instant **Vercel** deployment.

---

## Final Project Directory Structure

```text
MachinaX/
│
├── index.html                  # Homepage with Hero, 3D visualizer, About teaser & Featured Projects
├── about.html                  # Detailed Manifesto, 3 Pillar Glass Cards, and Milestones
├── explore.html                # 6 Technology Domains with interactive filtering and specs modal
├── projects.html               # Project Portfolio with interactive schematics modal
├── blogs.html                  # Magazine interface with search and category filtering
├── contact.html                # Telemetry Dispatch & Contact Form (mailto transmission)
├── privacy.html                # Privacy policy
├── terms.html                  # Terms and conditions
├── robots.txt                  # Search engine directives (excludes /admin/)
├── sitemap.xml                 # XML sitemap for SEO discovery
│
├── blog/
│   └── article-template.html   # Standalone reading experience with reading progress bar
│
├── admin/
│   └── index.html              # MachinaX Control Center (Static Content & JSON Generator)
│
├── css/
│   ├── style.css               # Design system, glassmorphism tokens, and layout styles
│   ├── animations.css          # Keyframes, glows, 3D tilts, and accessibility overrides
│   └── responsive.css          # Mobile drawer navigation and responsive breakpoints
│
├── js/
│   ├── main.js                 # Preloader, floating nav, ambient neural canvas, modals
│   ├── animations.js           # Scroll reveals, 3D card tilt, magnetic buttons, counters
│   ├── blogs.js                # Search, category filter, dynamic article viewer
│   └── projects.js             # Project filtering and specifications modal
│
├── data/
│   ├── blogs.json              # Public published articles dataset (JSON)
│   ├── blogs-data.js           # Offline/file:// fallback dataset (JS)
│   ├── projects.json           # Projects portfolio dataset (JSON)
│   └── projects-data.js        # Offline/file:// fallback dataset (JS)
│
├── assets/
│   ├── icons/
│   │   └── logo.svg            # MachinaX vector brand emblem
│   └── images/                 # Responsive SVG vector graphics for all projects & blogs
│
└── README.md                   # Operations and deployment guide
```

---

## 1. How to Open the Website Locally

No development server or `npm install` is required!

1. Open your file explorer and navigate to `d:\MachinaX`.
2. Double-click **`index.html`** to open it directly in Google Chrome, Microsoft Edge, Firefox, Brave, or Safari.
3. Every page, animation, interactive particle canvas, project specification modal, and blog listing works immediately.

*(Optional: If you prefer using VS Code's "Live Server" extension, right-click `index.html` and click "Open with Live Server".)*

---

## 2. How to Edit Website Content

- **Brand Colors & Theme Variables**: Open [css/style.css](file:///d:/MachinaX/css/style.css#L8-L45). Modify `:root` variables:
  - `--electric-blue: #00D9FF`
  - `--violet: #623BFF`
  - `--crystal-purple: #B7A0FF`
  - `--bg-primary: #080B16`
- **Homepage Copy**: Open [index.html](file:///d:/MachinaX/index.html) to edit headings, hero text, and call-to-actions.
- **Navigation Links**: Each HTML file has a `<header class="site-header">` block with identical relative links for seamless static transitions.

---

## 3. How to Add a Blog Article

The blog system reads its data from `data/blogs.json` and `data/blogs-data.js`.

### Method A: Using the MachinaX Control Center (Visual Generator)
1. Open `admin/index.html` in your browser.
2. In the **Blog Generator** tab, fill in your title, category, author, read time, excerpt, tags, and markdown content.
3. Click **"GENERATE JSON ENTRY"** and click **"COPY TO CLIPBOARD"**.
4. Open `data/blogs.json` and paste the entry into the JSON array.
5. Also paste the entry into `data/blogs-data.js` so it functions in offline `file:///` mode.
6. When you push or upload to Vercel, the new article automatically appears on the Blogs page!

### Method B: Directly in `data/blogs.json`
Add an object with this structure:
```json
{
  "id": "my-new-discovery",
  "slug": "my-new-discovery",
  "title": "Quantum Neural Interfaces",
  "excerpt": "A brief synopsis of the research breakthrough.",
  "category": "Robotics",
  "date": "2026-11-15",
  "readTime": "5 min read",
  "author": "Dr. Aris Thorne",
  "authorRole": "Lead Systems Architect",
  "image": "assets/images/blog-robotics.svg",
  "tags": ["Robotics", "Quantum", "Hardware"],
  "featured": false,
  "content": "### Section Title\n\nYour article body content here..."
}
```

---

## 4. How to Add Project Cards

1. Open `admin/index.html` and switch to the **Project Generator** tab (or edit `data/projects.json` directly).
2. Append your project item:
```json
{
  "id": "project-quantum-relay",
  "title": "Project Quantum-Relay: Orbital Waveguides",
  "category": "Engineering",
  "categorySlug": "engineering",
  "status": "Operational",
  "image": "assets/images/project-hyperion.svg",
  "summary": "Brief summary of the engineering accomplishment.",
  "specs": {
    "Bandwidth": "100 Gbps",
    "Operating Temp": "15 mK",
    "Loss": "< 0.001%"
  },
  "description": "Comprehensive engineering breakdown.",
  "techStack": ["Quantum", "Cryogenics", "Laser Metamaterials"]
}
```
3. Update both `data/projects.json` and `data/projects-data.js`. The card will immediately render on `projects.html` with full interactive modal specs.

---

## 5. How to Replace the Contact Email

The placeholder email used across the project is:
`kavinprakash212009@gmail.com`

To replace it with your own custom or company email:
1. Search and replace `kavinprakash212009@gmail.com` with `your-email@yourdomain.com` across:
   - `contact.html` (form helper and display texts)
   - `js/main.js` (line in `initContactForm()` where `recipient` is defined)
   - `admin/index.html`
   - `index.html`, `about.html`, `explore.html`, `projects.html`, `blogs.html`, `privacy.html` (footer contact sections)

*(Optional: If you prefer a serverless form provider like Formspree or Web3Forms, simply set the form action in `contact.html` to `action="https://formspree.io/f/YOUR_ID"`).*

---

## 6. How to Upload the Website to Vercel

### Method 1: Drag & Drop via the Vercel Dashboard (Fastest, No Git required)
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Under "Import Other Repository" or "Deploy a template", choose **"Deploy Third-Party / Drag & Drop Folder"**.
4. Drag the entire `MachinaX` folder into the upload window.
5. Vercel automatically detects `index.html` as the static entry point.
6. Click **Deploy**. Your website will be live in 10 seconds!

### Method 2: Via GitHub & Vercel Git Integration (Recommended for Continuous Publishing)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial MachinaX release"
   git remote add origin https://github.com/your-username/machinax.git
   git branch -M main
   git push -u origin main
   ```
2. In Vercel, click **"Add New Project"** and select your GitHub repository.
3. Keep the default settings (Framework Preset: **Other**, Build Command: empty, Output Directory: empty / root).
4. Click **Deploy**. Every time you edit `data/blogs.json` and commit, Vercel rebuilds and deploys automatically!

---

## 7. How to Connect a Custom Domain on Vercel

1. In your Vercel Project Dashboard, click on **Settings** &rarr; **Domains**.
2. Enter your custom domain (e.g. `machinax.tech` or `www.machinax.tech`) and click **Add**.
3. Vercel will provide your DNS records:
   - **A Record**: Point `@` to `76.76.21.21`
   - **CNAME Record**: Point `www` to `cname.vercel-dns.com`
4. Log into your domain registrar (Namecheap, GoDaddy, Cloudflare, Google Domains/Squarespace) and add the records into your DNS Manager.
5. Vercel will automatically issue a free SSL certificate within a few minutes.

---

## Browser Support & Accessibility

- **Tested Browsers**: Chrome 120+, Edge 120+, Firefox 120+, Safari 17+, iOS Safari, Chrome for Android.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce` ensures users sensitive to motion experience comfortable static layouts without unnecessary transforms or blinking.
- **Lighthouse Performance**: Optimized SVG assets, zero blocking scripts, system font fallbacks, and pure CSS layout calculations guarantee 95+ performance scores.

---

&copy; 2026 MachinaX. All Rights Reserved.
**ENGINEERING TOMORROW. TODAY.**


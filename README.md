# 🖥️ AMX OS — Showcase, Installer & Widget Studio

> The official interactive workbench, custom installer wizard, and widget studio for **AMX OS** — an elegant, modern Android reskin OS featuring macOS-inspired glossy glass textures, responsive system elements, and dark/light fluid transitions.

---

## 🎨 Project Overview

This application serves as a comprehensive tool and showcase dashboard for developers, Android heavy-customizers, and prospective users of **AMX OS**. It contains interactive components that mimic the OS aesthetics and guide you through customization, code sandboxing, and device installation.

### Key Functional Modules:
1. **💾 OS Customizer & Preview Canvas**: Customize base variables for AMX OS (such as enabling/disabling the macOS-inspired Dock, tweaking the Dynamic Island state, switching accents, and altering brand modes like Cyberpunk and Ivory minimal).
2. **📲 Interactive Device Installer**: Select supported Android devices (including Google Pixel, OnePlus, Xiaomi, and Samsung ports) and view step-by-step instructions with custom flashing commands structured by recovery methods (`fastboot`, `recovery-zip`, or `sideload`).
3. **✨ Interactive Widget Studio**: Customize, test, and render system-like widgets (Clocks, Frosty Weather cards, Scratchpads, Dynamic Island trackers, and Custom Glossy Audio Players) right on a simulated mobile canvas.
4. **👥 Community Layout Board**: Explore pre-packaged layout configurations built by the community. You can dynamically import, download, and star presets in real-time.
5. **💻 Developer Corner**: Inspect declarative JSON structures, layout schemas, and official React SDK code blocks designed to compile system-level AMX components.

---

## 📂 Core Architecture (Local Template)

For the current standalone Vite template, your files are configured as follows:
* **`/src/App.tsx`**: The master container hosting the theme context, adaptive sidebar controls, live state, and responsive visual layout.
* **`/src/components/`**: Splittable visual components:
  * `WidgetStudio.tsx` - Handles custom canvas rendering, widgets positioning, and state simulation.
  * `InstallWizard.tsx` - Coordinates device list dropdown filters, flashing prerequisites, and CLI command preparation.
  * `CommunityBoard.tsx` - Manages template profiles, stargazing, and downloading preset configurations.
  * `ThemeToggle.tsx` - Toggles the master dark mode layer.
* **`/src/data.ts`**: Houses hardware codenames, zip download URLs, layout presets, and code snippets.
* **`/src/types.ts`**: Contains clean TypeScript interfaces for strict type validation.

---

## 🌐 Next.js Migration Strategy (For App Router)

Since you are migrating this application into **Next.js (App Router)** to deploy on Vercel, use the following clean layout conversion guide.

### 1. Folder Structure
Ensure your Next.js directory is structured as follows:

```text
my-nextjs-app/
├── public/                 
├── src/
│   ├── app/
│   │   ├── layout.tsx      
│   │   ├── page.tsx        
│   │   └── globals.css     
│   ├── components/        
│   │   ├── CommunityBoard.tsx
│   │   ├── InstallWizard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WidgetStudio.tsx
│   ├── data/               
│   │   └── data.ts
│   └── types/              
│       └── types.ts
├── package.json
└── tailwind.config.ts
```

### 2. File Conversion Checklist
* **`main.tsx` is completely redundant** in Next.js. You **do not** need to include it. HTML rendering context is managed automatically by Next.js's internal runtime under `layout.tsx` and `page.tsx`.
* **Add `"use client"`** at the very top of `src/app/page.tsx`, `WidgetStudio.tsx`, `InstallWizard.tsx`, and any other component using state variables, React Hooks, or animations (`motion`).
* **Update Icon Imports**: Ensure you are using clean, named imports from `lucide-react`. Make sure all icons are explicitly registered.
  - *Example import*:
    ```typescript
    import { Smartphone, Cpu, Battery, Layers, ArrowUpRight, Github, ExternalLink, HelpCircle } from "lucide-react";
    ```
* **Image Assets**: Replace simple dynamic imports with standard standard standard HTML `<img>` elements or utilize Next.js's custom `<Image>` component with standard domains config.

---

## 🚀 Deployment Instructions

### Option A: Deploys to Vercel (Recommended)

To deploy your fresh Next.js project on Vercel, the easiest route is to use the Vercel Git workflow:

1. Push your code into a **GitHub**, **GitLab**, or **Bitbucket** repository.
2. Visit your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** ➔ **"Project"**.
3. Import your repository and select **Next.js** as the Project Framework (detected automatically).
4. Click **Deploy**. Vercel will instantly build, optimize, and serve your app on a global edge network.

#### Manual Vercel CLI (Optional):
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login and deploy
vercel
```

---

### Option B: Linux Debian Deployment Commands

If you're deploying this app manually on a Linux Debian-based server (e.g. VPS, DigitalOcean, Linode) using Node, follow these step-by-step commands:

#### Step 1: Update Packages and Install Core Dependencies
```bash
sudo apt update && sudo apt upgrade -y

# Install git, curl, and build-essential
sudo apt install -y git curl build-essential

# Install Node.js standard v20 (Using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Step 2: Clone & Install Dependencies
```bash
# Clone your repository
git clone <your-repo-link> amx-dashboard
cd amx-dashboard

# Install required NPM modules with clean settings
npm install
```

#### Step 3: Compile and Test Build Production Mode
```bash
# Generate optimized output build
npm run build

# Start server to test local routing (usually on port 3000)
npm run start
```

#### Step 4: Configure PM2 (Process Manager for persistent uptime)
Keep your application running in the background even when you disconnect from the terminal:
```bash
# Install PM2 globally
sudo npm install -g pm2

# Run your production build with PM2 automatically
pm2 start npm --name "amx-dashboard" -- start

# Configure startup hook to run on reboot automatically
pm2 startup
pm2 save
```

---

## 📦 Required NPM Modules

To ensure your layout elements compile beautifully, verify that these dependencies are present in your `package.json` configurations prior to running builds:

* **Core Libraries**: `react`, `react-dom`
* **Styling Tools**: `tailwindcss`, `@tailwindcss/vite` (or standard PostCSS depending on your setup framework version)
* **Visual Polish**: `motion` (imported from `motion/react`) for ambient transition curves
* **Design Systems**: `lucide-react` for responsive graphical vector icons

---

## 💻 Contribution

1. Fork the codebase at the official `https://github.com/AMX` page.
2. Open feature branches: `git checkout -b feature/cool-new-widget`
3. Commit assets and submit polished Pull Requests.
## ResumeForge – Resume Builder

Modern, fast, and extensible resume builder built with React + Vite, Tailwind CSS, and a rich component system. Create a professional resume, sync activities from platforms, and export a text‑selectable PDF.

### Demo
- Local development: run the app and open the printed preview to export PDFs.

### Tech Stack

<p>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white" />
  <img alt="Shadcn UI" src="https://img.shields.io/badge/shadcn/ui-000000?logo=radixui&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white" />
  <img alt="Lucide" src="https://img.shields.io/badge/Lucide-000?logo=lucide&logoColor=white" />
  <img alt="React PDF" src="https://img.shields.io/badge/React%20PDF-121212?logo=adobeacrobatreader&logoColor=white" />
</p>

### Key Features
- Live resume editor with instant preview
- Platform integrations (GitHub, LinkedIn, Coursera, LeetCode, Devpost, Kaggle)
- Activity dashboard and sync indicator
- Text‑selectable, single‑page PDF export
- Modern UI components (shadcn/ui + Radix + Tailwind)

### Project Structure

```text
.
├─ public/
│  └─ PlatformImages/        # platform logos
├─ src/
│  ├─ components/
│  │  ├─ ResumeEditor.tsx    # editor controls
│  │  ├─ ResumePreview.tsx   # live preview + export action
│  │  ├─ ResumePdf.tsx       # React-PDF document (text selectable)
│  │  ├─ Integration*        # dashboards & integrations
│  │  └─ ui/                 # shadcn/ui components
│  ├─ hooks/
│  ├─ pages/
│  ├─ types/
│  └─ main.tsx
├─ index.html
└─ package.json
```

### Getting Started

0) Prerequisites
- Node.js 18+

1) Clone the repo
```bash
git clone < git clone https://link >
cd Resume-Builder
```

2) Install dependencies
```bash
npm install
```

3) Run locally
```bash
npm run dev
```

```

### PDF Export (Text‑Selectable)
The app uses a dedicated React‑PDF document (`ResumePdf.tsx`) to generate a PDF with selectable text and consistent A4 layout. Use the “Export PDF” button in the preview panel to download.

### Environment & Configuration
No environment variables are required for local usage. Platform integrations are mocked; you can wire real OAuth/API keys later.


flowchart TD
    A[Landing / Index] --> B[Open Builder]
    B --> C[ResumeEditor]
    C -->|Update fields| D[Resume State]
    D --> E[ResumePreview - Live]
    E -->|Export PDF| F[Generate React-PDF Doc]
    F --> G[Create PDF Blob]
    G --> H[Download resume.pdf]

    B --> I[Integrations Tab]
    I --> J[Connect Platform]
    J --> K[Fetch / Mock Activities]
    K --> L[Activity Sync]
    L -->|Add to Resume| D

    B --> M[Dashboard]
    M --> N[View Stats & Status]

    subgraph UI
      C
      E
      I
      L
      M
    end

    subgraph Data
      D
      K
    end

    subgraph Export
      F
      G
      H
    end
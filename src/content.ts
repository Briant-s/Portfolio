/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to personalize your portfolio.
 *  Everything the site renders comes from the `content` object.
 * ─────────────────────────────────────────────────────────────
 */

/** An extra labeled link shown on a project (modal + detail page). */
export interface ProjectLink {
  label: string;
  href: string;
}

/** A content section on the detailed project page. */
export interface ProjectDetailSection {
  heading: string;
  /** Paragraphs of body text. */
  body: string[];
}

export interface Project {
  /** URL-safe identifier used in /projects/:slug. Must be unique. */
  slug: string;
  title: string;
  /** Short description — shown on cards, in the modal, and as the summary. */
  description: string;
  /**
   * Project category, used by the type filter on the Projects page.
   * e.g. "Data Mining", "Software Engineering", "Web App".
   */
  type: string;
  /**
   * Tools/tech used, used by the tool filter. Keep names consistent
   * across projects (e.g. always "React", "Python", "FastAPI").
   */
  tools: string[];
  /** Freeform display tags (optional; falls back to `tools` if omitted). */
  tags?: string[];
  /** Image paths (in /public) or URLs. First image is used as the cover. */
  images?: string[];
  /** Primary live/demo link. */
  link?: string;
  /** Source code link. */
  source?: string;
  /** Extra labeled links (docs, blog post, video, etc.). */
  links?: ProjectLink[];
  /** Longer write-up shown on the detail page (/projects/:slug). */
  detail?: {
    /** Intro paragraphs. */
    overview: string[];
    /** Optional additional sections. */
    sections?: ProjectDetailSection[];
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/** An education / work experience entry shown on the Experience timeline. */
export interface ExperienceEntry {
  /** Role, degree, or title (e.g. "B.Sc. Computer Science"). */
  title: string;
  /** Institution or company (e.g. "Binus University"). */
  organization: string;
  /** Start year/label (e.g. "2024"). */
  start: string;
  /** End year/label, or "Present". */
  end: string;
  /** Optional short description bullet(s). */
  description?: string[];
}

/** A link rendered inside an About panel. */
export interface AboutLink {
  label: string;
  href: string;
}

/**
 * One selectable panel in the About section. The button (label/icon) shows
 * in the right-hand grid; selecting it renders this content on the left.
 */
export interface AboutPanel {
  /** Text shown on the selector button in the right column. */
  label: string;
  /** Optional Tabler icon key for the button. */
  icon?: AboutIconName;
  /**
   * Selector tile size in the bento grid (6-column track; default = half):
   *  - 'wide'      → full row
   *  - 'third'     → one third of a row (pairs with 'twoThirds')
   *  - 'twoThirds' → two thirds of a row
   *  - 'tall'      → spans 2 rows
   *  - 'large'     → full row, 2 rows tall
   *  - undefined   → half row (default)
   */
  tileSize?: "wide" | "third" | "twoThirds" | "tall" | "large";
  /** Heading shown at the top of the left panel. */
  heading: string;
  /** Body paragraphs. */
  body: string[];
  /**
   * Optional dynamic widget rendered in the left panel instead of (after)
   * the body text. Maps to a component in About.tsx.
   */
  widget?: "github" | "monkeytype";
  /** Optional links rendered under the body. */
  links?: AboutLink[];
  /** Optional image (path in /public or imported URL) shown in the panel. */
  image?: string;
  /** Alt text for the image. */
  imageAlt?: string;
}

export type AboutIconName =
  | "user"
  | "code"
  | "school"
  | "briefcase"
  | "heart"
  | "bulb"
  | "book"
  | "keyboard"
  | "github"
  | "spotify";

/** Monkeytype typing stats + keyboard setup for the About widget. */
export interface MonkeytypeStats {
  /** Your personal best words-per-minute. */
  wpm: number;
  /** Accuracy percentage (0–100). */
  accuracy: number;
  /** Test duration this PB was set on, e.g. "60s" or "15s". */
  time: string;
  /** Link to your Monkeytype profile. */
  profileUrl: string;
  /** Your keyboard / setup details, one line each. */
  keyboard: { label: string; value: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Tabler icon name key — mapped in Footer/Contact. */
  icon: "github" | "linkedin" | "twitter" | "instagram" | "mail" | "website";
}

export interface Content {
  name: string;
  role: string;
  /** Optional school/affiliation name rendered after the role. */
  school?: string;
  /** If set, the school name becomes a clickable link. */
  schoolUrl?: string;
  /** Short tagline shown in the hero. */
  tagline: string;
  /** Longer bio paragraph(s) for the About section (legacy/fallback). */
  about: string[];
  /** Selectable panels for the two-column About section. */
  aboutPanels: AboutPanel[];
  email: string;
  /** Contact phone number (shown + copyable in the hero). */
  phone?: string;
  location: string;
  resumeUrl?: string;
  /** GitHub username for the live activity widget. */
  githubUsername?: string;
  /** Display handle shown on hover of the hero name (e.g. "@Briant-s"). */
  githubHandle?: string;
  /** Monkeytype stats + setup for the About widget. */
  monkeytype?: MonkeytypeStats;
  socials: SocialLink[];
  projects: Project[];
  /**
   * Slugs of the projects to feature on the home page, in display order.
   * Lets you pick which (and the order) without reordering `projects`.
   * If empty/omitted, the first few projects are used as a fallback.
   */
  featuredSlugs?: string[];
  skills: SkillGroup[];
  /** Education / work experience timeline entries (most recent first). */
  experience: ExperienceEntry[];
}

export const content: Content = {
  name: "Briant Sandriano",
  role: "CS Student @",
  school: "Binus University",
  schoolUrl: "https://binus.ac.id/", // ← add the Binus University link here
  tagline:
    "I love doing data analytics and turning them into practical solutions",
  about: [
    "Hi! I’m a developer who enjoys working across the stack — from pixel-perfect interfaces to resilient backends. I care about writing maintainable code and delivering great user experiences.",
    "When I’m not coding, you can find me exploring new technologies, contributing to open source, or learning something completely unrelated.",
  ],
  aboutPanels: [
    {
      label: "Who I Am",
      icon: "user",
      tileSize: "tall",
      heading: "Who I Am",
      body: [
        "Hey there! I'm Briant, currently a CS student who enjoys turning messy data into clear, practical visualizations and tools that people can actually use.",
        "I enjoy working across the stack, but I’m happiest where analytics meets a clean interface.",
      ],
      links: [{ label: "Get in touch", href: "#contact" }],
    },
    {
      label: "Education",
      icon: "school",
      heading: "Education",
      body: [
        "Computer Science student at Binus University, focusing on database technologies.",
        "Coursework highlights: Data Mining, Database Technology, Big Data Processing, Data Engineering, Data Analytics, Data Structures, Algorithm and Programming.",
      ],
      links: [{ label: "Binus University", href: "https://binus.ac.id/" }],
    },
    {
      label: "Interests",
      icon: "heart",
      heading: "What I Enjoy",
      body: [
        "I enjoy combining Data Science and Analytics stuff with Software Engineering by creating apps and dashboards that combine the two",
        "Outside of code: I enjoy video games as much as the next person, an avid motorsport watcher especially Formula 1, and I also love listening to music.",
      ],
    },
    {
      label: "GitHub",
      icon: "github",
      tileSize: "twoThirds",
      heading: "GitHub Activity",
      body: [],
      widget: "github",
    },
    {
      label: "Typing Speed",
      icon: "keyboard",
      tileSize: "third",
      heading: "Monkeytype",
      body: [],
      widget: "monkeytype",
    },
  ],
  email: "briantsandriano@gmail.com",
  phone: "+62 812-8007-0122",
  location: "Jakarta / Indonesia",
  resumeUrl: "/resume.pdf", // place your PDF at portfolio/public/resume.pdf
  githubUsername: "Briant-S",
  githubHandle: "@Briant-s",
  monkeytype: {
    wpm: 166, // ← your personal-best WPM
    accuracy: 99, // ← accuracy % for that run
    time: "15s", // ← test duration (e.g. "15s", "30s", "60s")
    profileUrl: "https://monkeytype.com/profile/Br_1S", // ← your profile link
    keyboard: [
      { label: "Keyboard", value: "Lucky65 V2" },
      { label: "Switches", value: "WS Morandi" },
      { label: "Keycaps", value: "Black & White PBT" },
      { label: "Layout", value: "QWERTY" },
    ],
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Briant-s",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/briant-sandriano-936183285",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/briantsandriano",
      icon: "instagram",
    },
  ],
  // ── Home page picks ─────────────────────────────────────────
  // Choose which 3 projects appear on the home page (and their order)
  // by slug — no need to reorder the `projects` array below.
  featuredSlugs: [
    "ai-file-renamer",
    "campaign-response-pipeline",
    "hr-attrition-pipeline",
  ],
  projects: [
    {
      slug: "ai-file-renamer",
      title: "TiFo — AI File Renamer & Organization Tool",
      type: "Software Engineering",
      description:
        "A fully offline CLI tool that reads file contents and uses a local LLM to generate short, descriptive filenames and auto-organize files into folders.",
      tools: ["Python", "Ollama", "Sentence-Transformers", "PyTorch", "CLI"],
      images: ["/tifo.gif"],
      link: "https://giorrrr.github.io/Landing-Page-Data-Mining/",
      source: "https://github.com/Briant-s/file_renamer_organizer",
      detail: {
        overview: [
          "TiFO is a fully offline command-line tool that reads file contents and uses a local LLM to generate short, descriptive filenames — with structured JSON output enforced via Pydantic schemas.",
        ],
        sections: [
          {
            heading: "Problem Faced",
            body: [
              "In a world full of deadlines, organization matters. Many people don't have the time or effort to clean up their working spaces. Files and folders scattered everywhere with no sense of purpose. Our team wanted to provide a tool that is quick and fits in a professional setting for a wide range of users.",
            ],
          },
          {
            heading: "My Role",
            body: [
              "Lead developer of TiFo. Worked on project ideation, iterative project development, and goal alignment with upstream shareholders.",
            ],
          },
          {
            heading: "Implementation",
            body: [
              "TiFo is built using Python programming language. TiFo runs on the terminal with guided user interfaces for ease of use. Local LLM integration using the llama 3.2:3b model which behaves as the main backbone of the renaming feature. Uses a mix of external python libraries to handle multiple file extensions and a semantic folder classifer using all-MiniLM-L6-v2 embeddings for folder classifications.",
            ],
          },
        ],
      },
    },
    {
      slug: "umkm-loan-simulation",
      title: "Poestakas",
      type: "Software Engineering",
      description:
        "A full-stack loan simulation platform for Indonesian SMEs (UMKM), modeling KUR loan schemes with risk flagging and an AI business-proposal generator.",
      tools: ["React", "FastAPI", "Supabase", "Gemini API"],
      images: [],
      link: "", // live/demo URL (deployed on Vercel + Railway) — add if public
      source: "https://github.com/Briant-s/Poestakas", // ← your GitHub repo URL, e.g. "https://github.com/Briant-s/poestakas"
      links: [
        {
          label: "Documentation",
          href: "https://app.notion.com/p/SE-Group-3-305cf547802d80319fd5c7e72abb3b15",
        },
      ],
      detail: {
        overview: [
          "PoestaKas is a financial readiness platform that helps Indonesian UMKM assess their creditworthiness, simulate KUR loan scenarios, and generate AI-powered business proposals — empowering small businesses to make informed decisions before applying for credit.",
        ],
        sections: [
          {
            heading: "My Role",
            body: [
              "Led and managed a team consisting of 4 other developers. Prioritized in product & feature ideation, full-stack development consisting of UI/UX, user authentication using Supabase, API development, and project documentation. Deployed the project using Vercel and Railway for faster prototyping.",
            ],
          },
          {
            heading: "Simulation Engine",
            body: [
              "Built a simulation engine modeling KUR loan schemes, calculating installment composition and loan growth, with automated DTI-based risk flagging and recommendations.",
            ],
          },
        ],
      },
    },
    {
      slug: "hr-attrition-pipeline",
      title: "HR Employee Attrition Pipeline",
      type: "Data Mining",
      description:
        "An end-to-end ETL pipeline processing 1,470 employee records, powering a 4-page Power BI dashboard suite and surfacing key attrition drivers.",
      tools: ["Pentaho", "MySQL", "Power BI"],
      images: ["/de.png", "/8.png", "/9.png", "/10.png"],
      source: "https://github.com/Briant-s/DE_HRAttrition",
      detail: {
        overview: [
          "Built an end-to-end ETL pipeline processing 1,470 employee records. Team of 3.",
        ],
        sections: [
          {
            heading: "Dashboards & Insights",
            body: [
              "Powered a 4-page Power BI dashboard suite: retention, satisfaction, executive cost analysis, and demographics.",
              "Identified key attrition drivers including short-tenure employees and the HR department, informing retention-strategy recommendations.",
            ],
          },
        ],
      },
    },
    {
      slug: "xai-phishing-detection",
      title: "XAI for Phishing Email Detection",
      type: "Research",
      description:
        "An SVM-based ML pipeline with NLP feature extraction to classify phishing emails, for a research study on explainable AI's effect on human phishing-detection accuracy.",
      tools: ["Python", "SVM", "NLP", "Scikit-learn"],
      images: ["/xai_results.png", "/distribution_dashboard.png"],
      // link to the paper once available
      source: "https://github.com/Briant-s/xai_phishing_detection_study",
      detail: {
        overview: [
          "Built an SVM-based machine learning pipeline with NLP feature extraction to classify phishing emails, supporting a research study on explainable AI (XAI) and its effect on human phishing-detection accuracy.",
          "Co-authored paper currently under review at ICORIS 2026.",
        ],
      },
    },
    {
      slug: "campaign-response-pipeline",
      title: "Customer Campaign Response Pipeline",
      type: "Data Mining",
      description:
        "A complete CRISP-DM analytics pipeline (EDA, feature engineering, modeling, evaluation) deployed as an interactive Streamlit dashboard.",
      tools: ["Python", "Scikit-learn", "Streamlit"],
      images: ["/campaign1.png", "/campaign2.png"],
      link: "",
      source: "https://github.com/Briant-s/DA_CustomerResponse",
      detail: {
        overview: [
          "Built a complete CRISP-DM analytics pipeline — EDA, feature engineering, modeling, and evaluation — deployed via an interactive Streamlit dashboard. Team of 3.",
        ],
        sections: [
          {
            heading: "Modeling & Findings",
            body: [
              "Benchmarked Logistic Regression vs. Random Forest (ROC-AUC 0.83 vs. 0.84).",
              "Found that SMOTE degraded performance and increased false positives on the low-sample dataset.",
            ],
          },
        ],
      },
    },
    {
      slug: "project-tracking-canvas",
      title: "Project Tracking Canvas Tool",
      type: "Software Engineering",
      description:
        "A canvas-based project tracking tool with draggable, linkable nodes and embedded task checklists, built with React and Konva.js.",
      tools: ["React", "Konva.js", "Tailwind CSS", "Supabase"],
      images: ["/poestakas.png", "/poestakas2.png"],
      link: "", // deployed on Vercel — add URL
      source: "https://github.com/x3nozite/rect-up",
      detail: {
        overview: [
          "Served as primary frontend developer, designing the UI and node system using Konva.js for canvas rendering and Tailwind for styling. Team of 4.",
        ],
        sections: [
          {
            heading: "Canvas & Nodes",
            body: [
              "Contributed to canvas and node-connection logic enabling draggable, linkable nodes with embedded task checklists.",
              "Deployed on Vercel.",
            ],
          },
        ],
      },
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "R", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      category: "Tools",
      items: [
        "PowerBI",
        "Tableau",
        "Git/GitHub",
        "Linux",
        "Pentaho",
        "React",
        "Streamlit",
        "Supabase",
        "FastAPI",
        "Vite",
      ],
    },
    {
      category: "Technical Skills",
      items: [
        "Data Mining",
        "EDA",
        "Data Visualization",
        "Machine Learning",
        "React",
        "REST APIs",
        "Databases",
      ],
    },
  ],
  experience: [
    {
      title: "B.S. Computer Science",
      organization: "Binus University",
      start: "2024 August",
      end: "Present",
      description: [
        "Currently going through undergraduate studies with a specialization in Database Technologies.",
      ],
    },
    {
      title: "Early Education",
      organization: "Tunas Bangsa Christian School",
      start: "2012",
      end: "2024",
      description: ["Completed secondary education."],
    },
  ],
};

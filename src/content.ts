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
    "I love doing data analytics and turning them into practical visualizations",
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
        "Hi! I’m Briant — a CS student who loves turning messy data into clear, practical visualizations and tools people actually use.",
        "I enjoy working across the stack, but I’m happiest where analytics meets a clean interface.",
      ],
      links: [{ label: "Get in touch", href: "#contact" }],
    },
    {
      label: "Education",
      icon: "school",
      heading: "Education",
      body: [
        "Computer Science student at Binus University, focusing on data analytics and software engineering.",
        "Coursework highlights: algorithms, databases, machine learning, and statistics.",
      ],
      links: [{ label: "Binus University", href: "https://binus.ac.id/" }],
    },
    {
      label: "Interests",
      icon: "heart",
      heading: "What I Enjoy",
      body: [
        "Data analytics, visualization, and building small tools that remove friction.",
        "Outside of code: exploring new tech, and learning things completely unrelated to CS.",
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
      { label: "Switches", value: "Gateron Brown" },
      { label: "Keycaps", value: "PBT" },
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
  projects: [
    {
      slug: "project-one",
      title: "Project One",
      type: "Software Engineering",
      description:
        "A short description of what this project does, the problem it solves, and your role in building it.",
      tools: ["React", "TypeScript", "Node.js"],
      images: [], // e.g. ["/projects/project-one-1.png"]
      link: "https://example.com",
      source: "https://github.com/Briant-s/project-one",
      links: [{ label: "Case study", href: "https://example.com/case-study" }],
      detail: {
        overview: [
          "A fuller explanation of Project One: the motivation, the problem space, and what makes the approach interesting.",
          "Describe your specific contributions and the outcome or impact.",
        ],
        sections: [
          {
            heading: "The Challenge",
            body: [
              "Explain the core problem you set out to solve and any constraints.",
            ],
          },
          {
            heading: "How It Works",
            body: [
              "Walk through the architecture, key decisions, and trade-offs.",
            ],
          },
        ],
      },
    },
    {
      slug: "project-two",
      title: "Project Two",
      type: "Data Mining",
      description:
        "Another standout project. Highlight impact, scale, or interesting technical challenges you overcame.",
      tools: ["Python", "FastAPI", "Supabase"],
      images: [],
      link: "https://example.com",
      source: "https://github.com/Briant-s/project-two",
      detail: {
        overview: [
          "A fuller explanation of Project Two — the dataset, the analysis, and the insights produced.",
        ],
      },
    },
    {
      slug: "project-three",
      title: "Project Three",
      type: "Software Engineering",
      description:
        "A third project to round out your showcase. Keep descriptions concise and outcome-focused.",
      tools: ["Python", "FastAPI", "Docker"],
      images: [],
      source: "https://github.com/Briant-s/project-three",
      detail: {
        overview: ["A fuller explanation of Project Three."],
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
      title: "Computer Science",
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

/* ═══════════════════════════════════════════════════════════════════
   DATA.JS  —  Your Personal Content File
   ─────────────────────────────────────────────────────────────────
   ✅  THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE YOUR WEBSITE.

   HOW TO EDIT:
   • Find the section you want to change (look for the section labels)
   • Edit only the text inside quotes "..." or numbers
   • Save the file and upload to GitHub — the website updates instantly

   ⚠️  DO NOT rename or remove any variable keys (left side of the colon).
       Only change the values (right side of the colon, inside quotes).
   ═══════════════════════════════════════════════════════════════════ */

const PORTFOLIO_DATA = {

  /* ──────────────────────────────────────────────────────────────
     PERSONAL INFO
     ────────────────────────────────────────────────────────────── */
  personal: {
    firstName:    'Nikhil',
    lastName:     'Sain',
    fullName:     'Nikhil Sain',
    title:        'Civil Engineer',
    tagline:      'Building sustainable infrastructure — one project at a time.',
    email:        'civil.nikhilsain@gmail.com',
    phone:        '+91 XXXXXXXXXX',          // ← Add your phone number here
    location:     'Gurgaon, Haryana, India',
    availability: 'Open to Opportunities',
    gradYear:     '2026',
    university:   'DCRUST, Murthal',
    cgpa:         '7.60',
    internship:   '6 mo',
    classXII:     '84%',                     // shown only in Education section

    // Social links — leave empty string "" to hide
    linkedin:     'https://linkedin.com/in/nikhilsaincivil',
    github:       '',
    instagram:    'https://instagram.com/nikhilsain.me',
    twitter:      'https://twitter.com/nikhilsainme',
    youtube:      'https://www.youtube.com/@Nkhilsainvlog',

    // Google Drive folder link to your resume / CV
    resumeLink:   'https://drive.google.com/drive/folders/1vfSmDDP2cnuY8QxZAUAjO5apm7E2nHDV?usp=drive_link',

    // Profile photo filename — must be in the same folder as index.html
    photo:        'nikhil.png',
  },

  /* ──────────────────────────────────────────────────────────────
     ABOUT ME
     bio1, bio2, bio3 support <strong>bold</strong> HTML tags.
     ────────────────────────────────────────────────────────────── */
  about: {
    quote: 'The best civil engineers are not just builders — they are lifelong learners who find solutions in every challenge.',

    bio1: 'I am <strong>Nikhil Sain</strong>, a Civil Engineering student in my final year at <strong>DCRUST, Murthal</strong> (graduating 2026). I love to work on highway and structural design projects, and I am deeply interested in learning and contributing to these areas as a fresher civil engineer.',

    bio2: 'During my <strong>6-month internship with MICADA (Micro Irrigation &amp; Command Area Development Authority), Haryana Government</strong>, I gained direct, hands-on exposure to real infrastructure. I observed the complete construction process of an underground RCC water tank — from site marking and soil excavation to PCC work, RCC beam placement, and finishing. I also visited an <strong>8 MLD Sewage Treatment Plant</strong> in Mahendragarh where I learned how the full treatment cycle operates, visited a brick kiln, and explored several other civil infrastructure sites during this period.',

    bio3: 'I have a solid foundation in core civil engineering subjects, a genuine eagerness to learn, and the discipline to work effectively in teams. My surveying camp at Mussoorie sharpened my practical field skills in total station operations, fly levelling, and compass surveys.',

    // Tags shown as chips below the bio
    tags: [
      'Highway &amp; Structural Interest',
      'RCC Construction',
      'Water Infrastructure',
      'Field Surveying',
      'Team Leadership',
      'AutoCAD (Learning)',
      'Material Estimation',
      'MS Excel &amp; PowerPoint',
    ],

    // Three key highlights shown in the highlights card
    highlights: [
      'MICADA Internship — Irrigation Dept., Haryana Govt. (6 Months, 2025)',
      'Advanced Surveying Camp — Mussoorie, Uttarakhand (DCRUST)',
      '8 MLD STP Site Visit &amp; Learning — Mahendragarh, Haryana',
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     TYPING ROLES  (hero typewriter animation)
     ────────────────────────────────────────────────────────────── */
  typedRoles: [
    'Civil Engineer',
    'B.Tech Final Year',
    'Infrastructure Enthusiast',
    'Team Leader',
    'Site Learner',
  ],

  /* ──────────────────────────────────────────────────────────────
     SKILLS
     No percentages are displayed on the website.
     ────────────────────────────────────────────────────────────── */
  skills: {
    technical: [
      {
        name: 'AutoCAD',
        desc: 'Currently learning 2D drafting, structural layouts, and technical engineering drawings.',
        icon: 'fas fa-drafting-compass',
      },
      {
        name: 'MS Excel',
        desc: 'Engineering calculations, basic cost estimation, and tabular data management.',
        icon: 'fas fa-chart-bar',
      },
      {
        name: 'MS Word &amp; PowerPoint',
        desc: 'Professional report writing, project documentation, and presentation design.',
        icon: 'fas fa-file-word',
      },
      {
        name: 'Material Estimation',
        desc: 'Basic quantity surveying and BOQ preparation for civil engineering projects.',
        icon: 'fas fa-calculator',
      },
      {
        name: 'Team Leadership',
        desc: 'Led teams during survey camps, Estructra 2025 fest, and academic group projects.',
        icon: 'fas fa-users',
      },
      {
        name: 'Coding (AI-Assisted)',
        desc: 'Basic coding knowledge; built small projects with the help of AI tools and guidance.',
        icon: 'fas fa-code',
      },
    ],

    soft: [
      { name: 'Critical Thinking',      icon: 'fas fa-brain' },
      { name: 'Communication',          icon: 'fas fa-comments' },
      { name: 'Time Management',        icon: 'fas fa-clock' },
      { name: 'Attention to Detail',    icon: 'fas fa-eye' },
      { name: 'Problem Solving',        icon: 'fas fa-lightbulb' },
      { name: 'Project Planning',       icon: 'fas fa-tasks' },
      { name: 'Teamwork',               icon: 'fas fa-handshake' },
      { name: 'Willingness to Learn',   icon: 'fas fa-book-open' },
      { name: 'Site Observation',       icon: 'fas fa-map-marked-alt' },
      { name: 'Safety Awareness',       icon: 'fas fa-shield-alt' },
    ],

    radar: {
      labels: ['Structural Design', 'Highway Eng.', 'Surveying', 'Water Infra.', 'AutoCAD', 'Teamwork'],
      scores: [72, 78, 82, 80, 60, 90],
    },
  },

  /* ──────────────────────────────────────────────────────────────
     EDUCATION  —  shown as a vertical timeline
     ────────────────────────────────────────────────────────────── */
  education: [
    {
      year:   'Oct 2022 — Jun 2026 · Ongoing',
      degree: 'B.Tech in Civil Engineering',
      inst:   'Deenbandhu Chhotu Ram University of Science &amp; Technology (DCRUST), Murthal, Haryana, India',
      tags:   ['CGPA: 7.60 / 10.0', 'Highway &amp; Structural', 'Engineering Sciences'],
    },
    {
      year:   '2022',
      degree: 'Senior Secondary — Class XII (Science)',
      inst:   'HBSE Board — Govt. Model Sanskrit Senior Secondary School, Mahendragarh, Haryana',
      tags:   ['84% Marks', 'PCM — Science with Maths'],
    },
    {
      year:   '2020',
      degree: 'Matriculation — Class X',
      inst:   'HBSE Board — Govt. Model Sanskrit Senior Secondary School, Mahendragarh, Haryana',
      tags:   ['86% Marks', 'Science &amp; Mathematics'],
    },
  ],

  /* ──────────────────────────────────────────────────────────────
     PROJECTS
     filter: lowercase category used by filter tabs
     image:  filename — must be in the same folder as index.html
     icon:   emoji shown as fallback if image is missing
     ────────────────────────────────────────────────────────────── */
  projects: [
    {
      title:    'MICADA — Irrigation Department Internship',
      filter:   'water',
      tags:     ['RCC Construction', 'Water Treatment', 'Government'],
      tagTypes: ['gold', 'steel', 'steel'],
      image:    'micad1.jpg',
      desc:     '6-month professional internship with MICADA (Minor Irrigation &amp; Command Area Development Authority), Haryana Government. Observed and participated in the complete construction of an underground RCC water tank — from site marking, soil excavation, and PCC to RCC beam work and finishing. Also visited an 8 MLD STP in Mahendragarh, a brick kiln, and multiple other civil infrastructure sites.',
      location: 'Mahendragarh, Haryana',
      duration: '6 Months · 2024',
      type:     'Government Sector',
      icon:     '🏗️',
    },
    {
      title:    'Advanced Surveying Camp — Mussoorie',
      filter:   'survey',
      tags:     ['Total Station', 'Fly Levelling', 'Academic'],
      tagTypes: ['gold', 'steel', 'steel'],
      image:    'mussoorie1.jpg',
      desc:     'Intensive 1-month university-organized surveying camp at Mussoorie, Uttarakhand. Practical training in fly levelling, compass surveying, plane table surveys, and total station operations in challenging mountain terrain. Strengthened my field measurement, error detection, and team coordination skills.',
      location: 'Mussoorie, Uttarakhand',
      duration: '1 Month',
      type:     'DCRUST Academic',
      icon:     '🏔️',
    },
    // ── ADD MORE PROJECTS BELOW ──────────────────────────────────
    // {
    //   title:    'Your Project Title',
    //   filter:   'structural',
    //   tags:     ['Tag1', 'Tag2'],
    //   tagTypes: ['gold', 'steel'],
    //   image:    'your-photo.jpg',
    //   desc:     'Project description...',
    //   location: 'City, State',
    //   duration: 'Duration',
    //   type:     'Academic / Professional / etc.',
    //   icon:     '🔧',
    // },
  ],

  projectFilters: ['all', 'water', 'survey', 'structural', 'highway', 'other'],

  /* ──────────────────────────────────────────────────────────────
     ACHIEVEMENTS
     ────────────────────────────────────────────────────────────── */
  achievements: [
    {
      icon:  'fas fa-hard-hat',
      title: 'MICADA Government Internship',
      desc:  '6-month internship with MICADA, Haryana Govt. Hands-on exposure to RCC construction, STP operations, brick kiln, and multiple infrastructure sites.',
      year:  '2024',
    },
    {
      icon:  'fas fa-mountain',
      title: 'Mussoorie Survey Camp',
      desc:  'Completed 1-month advanced surveying camp — total station, fly levelling, and compass surveying in mountain terrain. Practical field skills strengthened.',
      year:  '2023',
    },
    {
      icon:  'fas fa-graduation-cap',
      title: 'DCRUST Academic Performance',
      desc:  'Maintaining 7.54 CGPA at one of Haryana\'s premier technical universities, with consistent performance across core civil engineering subjects.',
      year:  '2022–Present',
    },
    {
      icon:  'fas fa-water',
      title: '8 MLD STP Site Learning',
      desc:  'Visited and understood the complete sewage treatment cycle at an 8 MLD plant in Mahendragarh during MICADA internship. Learned inlet-to-outlet operations.',
      year:  '2024',
    },
    {
      icon:  'fas fa-paint-brush',
      title: 'Estructra 2025 — Designer',
      desc:  'Served as Designer for the official Civil Engineering Dept. fest at DCRUST Murthal, demonstrating creativity, leadership, and team collaboration skills.',
      year:  '2025',
    },
    {
      icon:  'fas fa-award',
      title: 'NMMS Scholarship',
      desc:  'Cleared the National Means-cum-Merit Scholarship examination and received a scholarship from the Haryana Government, along with a sponsored one-week Manali educational tour.',
      year:  'School',
    },
    {
      icon:  'fas fa-heartbeat',
      title: 'Blood Donation',
      desc:  'Volunteered at a community blood donation camp — contributing to public health and reflecting a commitment to social responsibility beyond academics.',
      year:  'Recent',
    },
    // ── ADD MORE ACHIEVEMENTS ─────────────────────────────────────
    // { icon: 'fas fa-trophy', title: '...', desc: '...', year: '...' },
  ],

  /* ──────────────────────────────────────────────────────────────
     EXPERIENCE  —  internship detail section
     ────────────────────────────────────────────────────────────── */
  experience: {
    company:  'MICADA — Minor Irrigation &amp; Command Area Development Authority',
    subtitle: 'Irrigation Department · Haryana Government · Mahendragarh District, Haryana',
    duration: '6 Months · 2024',

    metrics: [
      { value: '8 MLD', label: 'STP Visited'    },
      { value: '5+',    label: 'Site Types'      },
      { value: '6',     label: 'Months Duration' },
      { value: 'Govt.', label: 'Sector'          },
    ],

    items: [
      {
        icon:  'fas fa-water',
        title: 'Underground RCC Water Tank — Full Construction Cycle',
        desc:  'Observed and participated in the complete construction of an underground RCC water tank from scratch — site marking, soil excavation, PCC laying, RCC reinforcement, beam work, and final finishing stages. Gained a thorough understanding of each construction phase and quality considerations involved.',
      },
      {
        icon:  'fas fa-recycle',
        title: 'Sewage Treatment Plant (8 MLD) — Process Learning',
        desc:  'Visited an 8 MLD Sewage Treatment Plant in Mahendragarh, Haryana, and learned the complete treatment workflow — screening, sedimentation, aeration, secondary treatment, and final disposal. Understood the civil and mechanical components of environmental infrastructure.',
      },
      {
        icon:  'fas fa-fire',
        title: 'Brick Kiln — Manufacturing Site Visit',
        desc:  'Visited a brick kiln to understand brick manufacturing — raw material preparation, moulding, drying, and kiln firing. Gained practical knowledge of construction material production at the source level.',
      },
      {
        icon:  'fas fa-road',
        title: 'Multiple Civil Infrastructure Site Visits',
        desc:  'Explored several other civil engineering sites — irrigation canals, water storage structures, and public infrastructure projects across Mahendragarh district. Each visit added to practical understanding of field-level civil engineering work.',
      },
      {
        icon:  'fas fa-file-alt',
        title: 'Technical Observation &amp; Documentation',
        desc:  'Maintained structured notes and observations throughout the internship. Developed awareness of site safety, material quality, construction sequencing, and the practical challenges that arise on government infrastructure projects.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     CERTIFICATIONS
     image:    filename in same folder as index.html (or '' for none)
     demoLink: '#demo' shows a "Demo Certificate Link" tag
     ────────────────────────────────────────────────────────────── */
  certifications: [
    {
      issuer:   'Haryana Government — MICADA',
      title:    'Internship Completion Certificate',
      desc:     'Official certificate for completing 6-month engineering internship with MICADA, Minor Irrigation &amp; Command Area Development Authority, Haryana Government.',
      year:     '2024',
      image:    'micada99.jpg',
      demoLink: '#demo',
    },
    {
      issuer:   'Estructra 2025 — Civil Dept., DCRUST Murthal',
      title:    'Designer Certificate — Estructra Civil Fest',
      desc:     'Certificate of appreciation for serving as Designer for Estructra 2025, the official annual fest of the Civil Engineering Department at DCRUST Murthal.',
      year:     '2025',
      image:    'civilfest.jpeg',           // ✅ fixed: was civilfest.png
      demoLink: '#demo',
    },
    {
      issuer:   'Blood Donation Camp',
      title:    'Blood Donation Participation',
      desc:     'Participated in a community blood donation camp, demonstrating civic responsibility and social awareness beyond academic and professional commitments.',
      year:     'Recent',
      image:    'bloodcamp.jpeg',           // ✅ fixed: was bloodcamp.png
      demoLink: '#demo',
    },
    {
      issuer:   'Haryana Government',
      title:    'NMMS Scholarship &amp; Manali Educational Tour',
      desc:     'Cleared the National Means-cum-Merit Scholarship (NMMS) examination and received the scholarship. Also received a fully sponsored one-week educational tour to Manali by the Haryana Government.',
      year:     'School',
      image:    'NMMS.png',                         // ✅ manali image not in repo — add manali.jpeg when you have it
      demoLink: '#demo',
    },
    // ── ADD MORE CERTIFICATIONS ───────────────────────────────────
    // {
    //   issuer:   'Organisation Name',
    //   title:    'Certificate Title',
    //   desc:     'What it covers.',
    //   year:     '2024',
    //   image:    '',        // filename or '' for no image
    //   demoLink: '#demo',   // '#demo' = show demo tag, '' = hide
    // },
  ],

  /* ──────────────────────────────────────────────────────────────
     GALLERY
     src:     image filename (in the same folder as index.html)
     caption: text shown on the image
     icon:    emoji shown as fallback if image is not found
     ────────────────────────────────────────────────────────────── */
  gallery: [
    { src: 'gallery1.jpg',  caption: 'Structural Design Project',     icon: '🏗️' },
    { src: 'gallery2.jpeg', caption: 'Advanced Surveying Equipment',  icon: '🔭' },
    { src: 'gallery3.jpeg', caption: 'Construction Site Supervision', icon: '👷' },
    { src: 'gallery4.jpeg', caption: 'Field Survey Operations',       icon: '📐' },
    { src: 'gallery5.jpeg', caption: 'Water Infrastructure Project',  icon: '💧' },
    { src: 'micad1.jpg',    caption: 'MICADA — Internship Site Work', icon: '🏛️' },
    { src: 'micad2.jpg',    caption: 'RCC Construction Progress',     icon: '⚙️' },
    { src: 'micad3.jpg',    caption: 'Site Inspection &amp; Learning',icon: '🔍' },
    // ── ADD MORE PHOTOS ──────────────────────────────────────────
    // { src: 'photo.jpg', caption: 'Caption text', icon: '🔧' },
  ],

  /* ──────────────────────────────────────────────────────────────
     BLOG
     ────────────────────────────────────────────────────────────── */
  blogLink: 'https://nikhilsainblog.blogspot.com/',

  /* ──────────────────────────────────────────────────────────────
     CONTACT FORM
     ────────────────────────────────────────────────────────────── */
  contact: {
    formAction: 'mailto:civil.nikhilsain@gmail.com',
  },
};

// Make available to app.js (which loads after this file)
if (typeof module !== 'undefined') { module.exports = PORTFOLIO_DATA; }

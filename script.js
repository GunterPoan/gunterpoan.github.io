/* ==========================================================
   Data: Project & Research modal content
   ========================================================== */
const PROJECT_DATA = [
  {
    title: 'GPU Parallelization of Threshold Secret Sharing with Latin Cubes',
    image: 'assets/cuda_kernel.svg',
    desc: `
      <p>Threshold Secret Sharing (TSS) enables <strong>distributed trust</strong> and <strong>secure multi-party computation</strong>. A recent OLC-based approach replaces expensive polynomial interpolation with table lookups, but offline table generation remains a sequential bottleneck for large secrets.</p>
      <p>This paper presents the <strong>first GPU-accelerated (k,n) TSS framework</strong> using Latin Cubes. We decompose the workflow into <strong>five CUDA kernels</strong> exploiting data parallelism with <strong>coalesced global-memory access</strong>.</p>
      <p>Results on NVIDIA GPUs confirm <strong>bitwise correctness</strong> of share-create–reconstruct cycles with speedups of <b>40×–150×</strong> over optimized CPU baselines.</p>
    `,
    tags: ['C++', 'CUDA', 'Cryptography', 'Galois Field', 'Discrete Mathematics']
  },
  {
    title: 'Degrading Trustworthiness in CDR via Popularity Bias Poisoning',
    image: 'assets/cdr.png',
    desc: `
      <p>Published in <strong>IEEE BigDataService 2026</strong>. Cross-domain recommendation systems are vulnerable to data poisoning attacks that manipulate recommendation outcomes.</p>
      <p>This paper investigates a novel attack strategy that <strong>amplifies popularity bias</strong> by degrading prediction accuracy for <strong>unpopular items</strong> while maintaining overall system performance.</p>
      <p>Unlike traditional attacks requiring full training data access, our method only relies on <strong>publicly available user-item interactions</strong>.</p>
    `,
    tags: ['IEEE', 'Recommendation Systems', 'Adversarial ML', 'Poisoning Attack']
  },
  {
    title: 'Release Platform',
    image: 'assets/release-platform.svg',
    desc: `
      <p>
      A release management platform developed during the WNC internship. <strong>Integrates GitLab and Jira APIs</strong> to automate previously manual cross-tool operations into CI/CD workflows.
      Covers build, release, and issue tracking, significantly simplifying software delivery.
      </p>
      `,
    tags: ['Python', 'FastAPI', 'GitLab API', 'Jira API', 'CI/CD']
  },
  {
    title: 'SAML SSO System',
    image: 'assets/saml-sso.svg',
    desc: `
      <p>
      A full enterprise-grade SAML single sign-on implementation. Covers all endpoints for both Service Provider (SP) and Identity Provider (IDP).
      Backend APIs built with Python Django and FastAPI; frontend authorization interface developed with Vue.js.
      </p><p>
      Python generates SAML Requests to call the IDP server for authentication and token exchange.
      Backend handles account/password storage and token management; frontend implements the authorization flow in JavaScript.
      </p>
    `,
    tags: ['Python', 'Django', 'FastAPI', 'Vue.js', 'JavaScript', 'SAML']
  },
  {
    title: 'Multispeaker Transcription',
    image: 'assets/multispeaker.svg',
    desc: `
      <p>
      Third place at Meichu Hackathon 2023, Google Group.
      </p><p>
      A multispeaker transcription tool designed to help hearing-impaired individuals keep up with fast-paced meetings without cognitive overload.
      Uses  <strong>Reinforcement Learning (RL) model to idenetify speakers</strong>, integrating English/Chinese translation.
      </p><p>
      Combines speech recognition, speaker diarization, and natural language processing.
      </p>
    `,
    tags: ['Python', 'RL', 'NLP', 'Voice Recognition', 'Machine Translation']
  },
  {
    title: 'CPP 3D Engine',
    image: 'assets/cpp-3d-engine.svg',
    desc: `
      <p>
      A 3D engine built with C++ and object-oriented design.
      Core based on linear algebra, defining basic geometric classes (e.g., Cube, Tetrahedron).
      Each class is bound to a Hitbox for collision detection.
      </p>
    `,
    tags: ['C++', 'OOP', 'Linear Algebra']
  },
  {
    title: 'Discord/MS Teams Bot',
    image: 'assets/discord-bot.svg',
    desc: `
      <p>
      An LLM-integrated intelligent task management bot. Supports conversational task queries, priority setting,
      reading task JSON files, and generating responses and suggested summaries via LLM.
      Suitable for deployment in Discord or MS Teams channels to assist project management.
      </p>
    `,
    tags: ['Python', 'Discord API', 'LLM']
  }
];

/* ==========================================================
   Init
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTypewriter();
  initScrollDown();
  initScrollAnimations();
  initBackToTop();
  initProjectCards();
  initModal();
});

/* ==========================================================
   Navigation
   ========================================================== */
function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  // Scroll: add background to nav
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  // Active section on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
}

/* ==========================================================
   Typewriter Effect
   ========================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'Software Developer',
    'Full Stack Developer',
    'CUDA / GPU Computing',
    'Researcher & Developer'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 120;

  function tick() {
    const current = phrases[phraseIdx];
    const text = isDeleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);

    el.textContent = text;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    } else {
      delay = isDeleting ? 60 : 120;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ==========================================================
   Scroll down indicator
   ========================================================== */
function initScrollDown() {
  const btn = document.getElementById('scroll-down');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ==========================================================
   Scroll Animations (Intersection Observer)
   ========================================================== */
function initScrollAnimations() {
  const selectors = [
    '.section-title',
    '.about-text',
    '.timeline-item',
    '.exp-card',
    '.project-card',
    '.contact-content'
  ];

  const elements = document.querySelectorAll(selectors.join(', '));
  elements.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================
   Back To Top
   ========================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================
   Project / Research Card click -> Modal
   ========================================================== */
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index, 10);
      openModal(index);
    });
  });
}

/* ==========================================================
   Modal
   ========================================================== */
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(index) {
  const data = PROJECT_DATA[index];
  if (!data) return;

  const content = document.getElementById('modal-content');
  const imageHtml = data.image
    ? `<div class="modal-image"><img src="${data.image}" alt="${data.title}"></div>`
    : '';
  content.innerHTML = `
    <h3>${data.title}</h3>
    ${imageHtml}
    <div class="modal-desc">${data.desc.trim()}</div>
    <div class="project-tags">
      ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

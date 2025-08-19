const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const parentLinks = document.querySelectorAll('.has-submenu > a');
const mq = window.matchMedia('(max-width: 768px)');


hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('active');
});

// Mobile submenu toggle
parentLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!mq.matches) return; 
        e.preventDefault();
        const li = link.parentElement;
        const open = li.classList.contains('open');

        // close all
        document.querySelectorAll('.has-submenu').forEach(sib => {
            sib.classList.remove('open');
            sib.querySelector('a').setAttribute('aria-expanded', 'false');
        });

        // toggle clicked one
        if (!open) {
            li.classList.add('open');
            link.setAttribute('aria-expanded', 'true');
        }
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (mq.matches && !nav.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.has-submenu').forEach(li => {
            li.classList.remove('open');
            li.querySelector('a').setAttribute('aria-expanded', 'false');
        });
    }
});


// Lang select switch
const langSelect = document.getElementById('lang-select');

// Detect base path (e.g. "/myself" for GitHub Pages repo)
const basePath = window.location.pathname.split('/')[1]
  ? `/${window.location.pathname.split('/')[1]}`
  : '';

// 🔹 Auto-select based on current URL
(function setLangFromURL() {
  const currentPath = window.location.pathname;
  if (currentPath.startsWith(`${basePath}/en/`)) {
    langSelect.value = 'en';
  } else {
    langSelect.value = 'pt';
  }
})();

// 🔹 Change event handler
langSelect.addEventListener('change', () => {
  const selected = langSelect.value;
  const currentPath = window.location.pathname; // e.g. /myself/ or /myself/en/projects.html

  if (selected === 'en') {
    if (!currentPath.startsWith(`${basePath}/en/`)) {
      // Handle root and index
      if (
        currentPath === `${basePath}/` ||
        currentPath === `${basePath}/index.html`
      ) {
        window.location.pathname = `${basePath}/en/index.html`;
      } else {
        window.location.pathname =
          `${basePath}/en` + currentPath.replace(basePath, '');
      }
    }
  } else if (selected === 'pt') {
    if (currentPath.startsWith(`${basePath}/en/`)) {
      // Remove /en from path
      let newPath = currentPath.replace(`${basePath}/en`, basePath);

      // If it ends with / (like /myself/), stay there
      if (newPath === `${basePath}/`) {
        window.location.pathname = newPath;
      } else {
        window.location.pathname = newPath || `${basePath}/index.html`;
      }
    } else {
      // Already in PT root → stay
      window.location.pathname = currentPath;
    }
  }
});


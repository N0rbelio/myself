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



const langSelect = document.getElementById('lang-select');


const basePath = window.location.pathname.split('/')[1]
  ? `/${window.location.pathname.split('/')[1]}`
  : '';


(function setLangFromURL() {
  const currentPath = window.location.pathname;
  if (currentPath.startsWith(`${basePath}/en/`)) {
    langSelect.value = 'en';
  } else {
    langSelect.value = 'pt';
  }
})();




langSelect.addEventListener('change', async () => {
  const selected = langSelect.value;
  const currentPath = window.location.pathname; 
  let targetPath;

  if (selected === 'en') {
    if (!currentPath.startsWith(`${basePath}/en/`)) {
      targetPath = `${basePath}/en` + currentPath.replace(basePath, '');
      try {
        const res = await fetch(targetPath, { method: 'HEAD' });
        if (!res.ok) throw new Error('Page not found');
        window.location.pathname = targetPath;
      } catch {
        window.location.pathname = `${basePath}/404.html`;
      }
    }
  } else if (selected === 'pt') {
    if (currentPath.startsWith(`${basePath}/en/`)) {
      targetPath = currentPath.replace(`${basePath}/en`, basePath);
      window.location.pathname = targetPath || `${basePath}/index.html`;
    }
  }
});

(async function checkInvalidLangPage() {
  const path = window.location.pathname;
  const basePath = window.location.pathname.split('/')[1]
    ? `/${window.location.pathname.split('/')[1]}`
    : '';

  // Only check when inside /en/ or /pt/
  if (path.startsWith(`${basePath}/en/`) || path.startsWith(`${basePath}/pt/`)) {
    try {
      const res = await fetch(path, { method: "HEAD" });
      if (!res.ok) {
        window.location.replace(`${basePath}/404.html`);
      }
    } catch (e) {
      window.location.replace(`${basePath}/404.html`);
    }
  }
})();




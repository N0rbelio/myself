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

langSelect.addEventListener('change', () => {
    const selected = langSelect.value;
    
    // Redirect to the selected language page
    if (selected === 'en') {
    window.location.href = 'en/index.html'; 
    } else if (selected === 'pt') {
    window.location.href = '/index.html'; 
    }
});
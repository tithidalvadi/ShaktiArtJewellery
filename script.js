
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 600);
});
/* ---------- YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  backToTop.classList.toggle('show', y > 500);
  updateActiveNav();
});
/* ---------- MOBILE MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});
/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}
/* ---------- BACK TO TOP ---------- */
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
/* ---------- COLLECTIONS DATA ---------- */
const collections = [
  { title: 'Bridal and occasional jewelry', image: 'images/collection1.png', link: 'design1.html' },
  { title: 'Kundan jewellery raw material', image: 'images/collection2.png' , link: 'design2.html' },
  { title: 'Kundan rings & Kilangi', image: 'images/collection3.png' , link: 'design3.html' },
  { title: 'Kundan earrings & mangtika', image: 'images/collection5.png' , link: 'design5.html' },
  { title: 'Bangles', image: 'images/collection6.png' , link: 'design6.html' }
 /* { title: 'Design 08', image: 'images/photo8.png' },
  { title: 'Design 09', image: 'images/photo9.jpeg' },
  { title: 'Design 10', image: 'images/photo10.jpg' } */
];

const collectionGrid = document.getElementById('collectionGrid');

collections.forEach((c, i) => {
  const card = document.createElement('div');
  card.className = 'collection-card reveal';

  card.innerHTML = `
<a href="${c.link}" class="collection-link">
  <span class="collection-num">${String(i + 1).padStart(2, '0')}</span>
  <div class="collection-img">
    <img src="${c.image}" alt="${c.title}" loading="lazy">
  </div>
  <div class="collection-body">
    <h3>${c.title}</h3>
  </div>
</a>
`;

  collectionGrid.appendChild(card);
});
/* ---------- GALLERY DATA ---------- 
const galleryItems = [
  { src: 'images/gallery1.jpg', cat: 'featured' },
  { src: 'images/gallery2.jpg', cat: 'premium' },
  { src: 'images/gallery3.jpg', cat: 'trending' },
  { src: 'images/gallery4.jpg', cat: 'featured' },
  { src: 'images/gallery5.jpg', cat: 'premium' },
  { src: 'images/gallery6.jpg', cat: 'trending' },
  { src: 'images/gallery7.jpg', cat: 'featured' },
  { src: 'images/gallery8.jpg', cat: 'premium' },
  { src: 'images/gallery9.jpg', cat: 'trending' },
  { src: 'images/gallery10.jpg', cat: 'featured' }
];
const galleryGrid = document.getElementById('galleryGrid');
galleryItems.forEach((g, i) => {
  const ratio = [320, 380, 280, 420, 340, 360, 300, 400, 320, 380][i % 10];
  const item = document.createElement('div');
  item.className = 'gallery-item reveal';
  item.dataset.cat = g.cat;
  item.innerHTML = `<img src="${g.src}" alt="Gallery image ${i + 1}" loading="lazy" style="height:${ratio}px; object-fit:cover; width:100%;" />`;
  galleryGrid.appendChild(item);
});
/* ---------- GALLERY FILTERS ---------- 
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});
/* ---------- LIGHTBOX ---------- 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.getElementById('galleryGrid').addEventListener('click', e => {
  const img = e.target.closest('img');
  if (!img) return;
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('active'); });
/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('active');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});
/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name').trim();
  const phone = data.get('phone').trim();
  const email = data.get('email').trim();
  const business = data.get('business').trim();
  const message = data.get('message').trim();
  if (!name || !phone || !email || !business || !message) {
    formMsg.textContent = 'Please fill in all fields.';
    formMsg.className = 'form-msg error';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMsg.textContent = 'Please enter a valid email address.';
    formMsg.className = 'form-msg error';
    return;
  }
  if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
    formMsg.textContent = 'Please enter a valid phone number.';
    formMsg.className = 'form-msg error';
    return;
  }
  formMsg.textContent = 'Thank you! Your inquiry has been received. We will contact you shortly.';
  formMsg.className = 'form-msg success';
  contactForm.reset();
});
/* ---------- COUNTER ANIMATION ---------- */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}
/* ---------- REVEAL + COUNTER OBSERVER ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }
      const counter = entry.target.querySelector?.('.counter:not(.done)');
      if (counter) { counter.classList.add('done'); animateCounter(counter); }
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.counter').forEach(el => io.observe(el));
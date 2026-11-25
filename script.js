// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===== PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
})();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Observe sections
document.querySelectorAll('.service-card, .testimonial-card, .pillar, .about-text, .contact-form, .contact-info').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Counters
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// ===== FORM SUBMIT =====
let form = document.querySelector("#contactForm");
  let nameInput = document.querySelector("#name");
  let contactInput = document.querySelector("#contact");
  let subjectInput = document.querySelector("#subject");
  let msgInput = document.querySelector("#msg");
  let messageEl = document.querySelector("#message");
  let charCount = document.querySelector("#charCount");
  let savedList = document.querySelector("#savedList");

  // Load saved messages
  let messages = JSON.parse(localStorage.getItem("contact_messages")) || [];
  showMessages();

  // Live character count
  msgInput.addEventListener("input", () => {
    charCount.textContent = `${msgInput.value.length} / 200 characters`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // STOP refresh

    let name = nameInput.value.trim();
    let contact = contactInput.value.trim();
    let subject = subjectInput.value;
    let msg = msgInput.value.trim();

    // Clear old errors
    [nameInput, contactInput, msgInput].forEach(i => i.classList.remove("error"));

    // 1. VALIDATION
    if (name === "" || contact === "" || msg === "") {
      messageEl.textContent = "❌ Please fill all required fields";
      messageEl.style.color = "red";
      if (name === "") nameInput.classList.add("error");
      if (contact === "") contactInput.classList.add("error");
      if (msg === "") msgInput.classList.add("error");
      return;
    }

    if (msg.length < 10) {
      messageEl.textContent = "❌ Message too short - write at least 10 characters";
      messageEl.style.color = "red";
      msgInput.classList.add("error");
      return;
    }

    // 2. SAVE TO LOCALSTORAGE
    let newMsg = { name, contact, subject, msg, date: new Date().toLocaleString() };
    messages.push(newMsg);
    localStorage.setItem("contact_messages", JSON.stringify(messages));
    showMessages();

    // 3. SHOW SUCCESS
    messageEl.textContent = `✅ Thanks ${name}! Message sent. We will reply to ${contact}`;
    messageEl.style.color = "green";
    form.reset();
    charCount.textContent = "0 / 200 characters";

//send via whatsapp 
 let whatsappText = `Hello, I'm ${name}. Subject: ${subject}. Message: ${msg}. My contact: ${contact}`;
    let whatsappUrl = `https://wa.me/254791171945?text=${encodeURIComponent(whatsappText)}`;
    // auto-open WhatsApp:
     window.open(whatsappUrl, "_blank");
    console.log("WhatsApp Link:", whatsappUrl);
  });

  function showMessages() {
    savedList.innerHTML = "";
    messages.slice(-3).reverse().forEach(m => {
      let li = document.createElement("li");
      li.textContent = `${m.name} - ${m.subject}: ${m.msg.slice(0, 50)}...`;
      savedList.appendChild(li);
    });
  }

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--gold-light)'
      : '';
  });
});

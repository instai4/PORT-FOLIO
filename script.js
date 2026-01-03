document.addEventListener('DOMContentLoaded', () => {
      const themeToggle = document.getElementById('themeToggle');
      const icon = themeToggle.querySelector('i');
      const body = document.body;
      
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        body.classList.remove('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
      
      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
          localStorage.setItem('theme', 'dark');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          localStorage.setItem('theme', 'light');
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      });
    });


    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });

    const typedTextSpan = document.getElementById('typed-text');
    const texts = [
      "Data Science Student.",
      "Data Analyst.",
      "Problem Solver.",
      "Continuous Learner."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; 
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; 
      }
      
      setTimeout(type, typingSpeed);
    }

    window.addEventListener('load', () => {
      if (texts.length) setTimeout(type, 1000);
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
          bar.style.width = bar.getAttribute('data-width');
        }
      });
    }
    
    skillBars.forEach(bar => {
      bar.style.width = '0';
    });
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade();

  document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-trail';
    document.body.appendChild(cursor);
    
    const trailDots = [];
    const dotCount = 12; 
    
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      document.body.appendChild(dot);
      trailDots.push({
        element: dot,
        x: 0,
        y: 0,
        size: 6 - (i * 0.4), 
        opacity: 0.6 - (i * 0.05) 
      });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailUpdateInterval;
    
  
    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      
      cursor.style.left = cursorX - (cursor.offsetWidth / 2) + 'px';
      cursor.style.top = cursorY - (cursor.offsetHeight / 2) + 'px';
      
      trailDots.forEach((dot, index) => {
        const delay = index * 2; 
        setTimeout(() => {
          dot.x = cursorX - (dot.size / 2);
          dot.y = cursorY - (dot.size / 2);
          dot.element.style.width = dot.size + 'px';
          dot.element.style.height = dot.size + 'px';
          dot.element.style.left = dot.x + 'px';
          dot.element.style.top = dot.y + 'px';
          dot.element.style.opacity = dot.opacity;
          dot.element.classList.add('active');
        }, delay);
      });
    };
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      
      if (!trailUpdateInterval) {
        trailUpdateInterval = setInterval(updateCursor, 20); 
      }
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      trailDots.forEach(dot => {
        dot.element.style.opacity = '0';
      });
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0.7';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  
  hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
  
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      document.querySelector('.nav-menu').classList.remove('active');
      body.style.overflow = '';
    });
  });
});
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth > 768 ? 80 : 40; 

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 8 + 3;
    const opacity = Math.random() * 0.4 + 0.2;
    const blur = Math.random() * 2;
    const colorShift = Math.random() * 30 - 15;

    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    const midX = startX + (Math.random() * 20 - 10);
    const midY = startY - (Math.random() * 40 + 20);
    const endX = midX + (Math.random() * 10 - 5);
    const endY = midY - (Math.random() * 40 + 20);

    const duration = Math.random() * 20 + 10; // 10–30s
    const delay = Math.random() * 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.opacity = opacity;
    particle.style.filter = `blur(${blur}px) hue-rotate(${colorShift}deg)`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particle.style.setProperty("--x-start", `${startX}vw`);
    particle.style.setProperty("--y-start", `${startY}vh`);
    particle.style.setProperty("--x-mid", `${midX}vw`);
    particle.style.setProperty("--y-mid", `${midY}vh`);
    particle.style.setProperty("--x-end", `${endX}vw`);
    particle.style.setProperty("--y-end", `${endY}vh`);

    particle.style.setProperty("--scale-start", Math.random() * 0.8 + 0.4);
    particle.style.setProperty("--scale-mid", Math.random() * 1.2 + 0.8);
    particle.style.setProperty("--scale-end", Math.random() * 0.8 + 0.4);

    particle.style.setProperty("--opacity-start", opacity);
    particle.style.setProperty("--opacity-mid", Math.min(1, opacity + 0.2));
    particle.style.setProperty("--opacity-end", opacity * 0.5);

    particlesContainer.appendChild(particle);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  window.addEventListener("resize", () => {
    const container = document.getElementById("particles");
    container.innerHTML = "";
    createParticles();
  });
});

 // Resume Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Animate resume skill progress bars
  const resumeSkillProgress = document.querySelectorAll('.resume-skill-progress');
  
  function animateResumeSkillBars() {
    resumeSkillProgress.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
      }
    });
  }
  
  // Initialize all skill bars to 0
  resumeSkillProgress.forEach(bar => {
    bar.style.width = '0';
  });
  
  // Animate on scroll
  window.addEventListener('scroll', animateResumeSkillBars);
  
  // Initial check on page load
  animateResumeSkillBars();
  
  // Resume download button enhancement
  const resumeDownloadBtn = document.querySelector('.resume-download .btn');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', function(e) {
      // Add download animation
      this.classList.add('downloading');
      setTimeout(() => {
        this.classList.remove('downloading');
      }, 1000);
      
      
    });
  }
  
  // Add animation to timeline items on scroll
  const timelineItems = document.querySelectorAll('.resume-timeline-item');
  
  function animateTimelineItems() {
    timelineItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (itemPosition < screenPosition) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }
    });
  }
  
  // Initialize timeline items
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Animate on scroll
  window.addEventListener('scroll', animateTimelineItems);
  
  // Initial check on page load
  animateTimelineItems();
  
  // Add hover effects to achievement cards
  const achievementCards = document.querySelectorAll('.resume-achievement-card');
  achievementCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click animation to project cards
  const projectCards = document.querySelectorAll('.resume-project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
  
 
});
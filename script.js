document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          
          // Change hamburger to X
          const spans = this.querySelectorAll('span');
          if (navLinks.classList.contains('active')) {
              spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
              spans[1].style.opacity = '0';
              spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
          } else {
              spans[0].style.transform = 'none';
              spans[1].style.opacity = '1';
              spans[2].style.transform = 'none';
          }
      });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              const spans = mobileMenuButton.querySelectorAll('span');
              spans[0].style.transform = 'none';
              spans[1].style.opacity = '1';
              spans[2].style.transform = 'none';
          }
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Account for header height
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Animate elements on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.feature-card, .audience-card, .testimonial-card, .pricing-card, .competition-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Set initial styles for animation
  const elementsToAnimate = document.querySelectorAll('.feature-card, .audience-card, .testimonial-card, .pricing-card, .competition-card');
  elementsToAnimate.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Handle waitlist form submission and waitlist button clicks
  const waitlistForm = document.getElementById('waitlist-form');
  const formSuccess = document.getElementById('form-success');
  
  // Redirect all waitlist button clicks to the waitlist-closed page
  const waitlistButtons = document.querySelectorAll('a[href="#waitlist"], .cta-button');
  waitlistButtons.forEach(button => {
      if (button.textContent.includes('Join Waitlist') || 
          button.textContent.includes('Try Free') ||
          button.href.includes('#waitlist')) {
          button.addEventListener('click', function(e) {
              e.preventDefault();
              window.location.href = 'waitlist-closed.html';
          });
      }
  });
  
  // If the form still exists, redirect its submission too
  if (waitlistForm) {
      waitlistForm.addEventListener('submit', function(e) {
          e.preventDefault();
          window.location.href = 'waitlist-closed.html';
      });
  }
});
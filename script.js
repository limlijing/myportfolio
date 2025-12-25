// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initMenuFunctionality();
    initSkillBars();
    
    // Add current year to footer if needed
    updateFooterYear();
});

// Scroll animations for cards
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on index
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// Menu functionality
function initMenuFunctionality() {
    const hamburger = document.querySelector('.hamburger');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.querySelector('.closebtn');
    const menuLinks = document.querySelectorAll('#side-menu a:not(.closebtn)');
    
    // Open menu
    function openMenu() {
        sideMenu.style.width = "280px";
        document.body.style.overflow = "hidden";
        hamburger.style.opacity = "0";
        hamburger.style.pointerEvents = "none";
    }
    
    // Close menu
    function closeMenu() {
        sideMenu.style.width = "0";
        document.body.style.overflow = "";
        hamburger.style.opacity = "1";
        hamburger.style.pointerEvents = "auto";
    }
    
    // Set up event listeners
    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (sideMenu.style.width === '280px' && 
            !sideMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            closeMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sideMenu.style.width === '280px') {
            closeMenu();
        }
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for page anchors (not external links)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize skill bars (for future enhancement)
function initSkillBars() {
    // This function can be expanded to animate skill bars
    // when the skills section comes into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width + '%';
                    skillsObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillsObserver.observe(bar));
    }
}

// Update footer with current year
function updateFooterYear() {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        const originalText = footer.textContent;
        
        // Check if year is already in footer
        if (!originalText.includes(currentYear)) {
            footer.textContent = originalText.replace(
                '©', 
                `© ${currentYear}`
            );
        }
    }
}

// Add typing effect to title if desired
function initTypingEffect() {
    const title = document.querySelector('.fade-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typingSpeed = 50; // milliseconds per character
    
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Uncomment to enable typing effect
    // typeWriter();
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initMenuFunctionality,
        initSkillBars,
        updateFooterYear,
        initTypingEffect
    };
}
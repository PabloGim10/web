document.addEventListener('DOMContentLoaded', () => {
      // 1. Navigation Drawer Toggle Logic
      const menuTrigger = document.getElementById('menuTrigger');
        const closeDrawer = document.getElementById('closeDrawer');
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        const drawerContent = document.getElementById('drawerContent');

        function openMenu() {
          drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        drawerBackdrop.classList.add('opacity-100', 'pointer-events-auto');
        drawerContent.classList.remove('-translate-x-full');
        drawerContent.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
      }

        function closeMenu() {
          drawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
        drawerBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        drawerContent.classList.add('-translate-x-full');
        drawerContent.classList.remove('translate-x-0');
        document.body.style.overflow = '';
      }

        menuTrigger.addEventListener('click', openMenu);
        closeDrawer.addEventListener('click', closeMenu);
      drawerBackdrop.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) closeMenu();
      });

      // Close on drawer links click
      document.querySelectorAll('#drawerContent a').forEach(link => {
          link.addEventListener('click', closeMenu);
      });

        // 2. Interactive Locality Search Filter (Exact 15 localities preserved)
        const searchInput = document.getElementById('localitySearch');
        const pills = document.querySelectorAll('.locality-pill');
        const noResults = document.getElementById('noResults');

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        pills.forEach(pill => {
          const text = pill.textContent.toLowerCase();
        if (text.includes(query)) {
          pill.style.display = 'inline-block';
        visibleCount++;
          } else {
          pill.style.display = 'none';
          }
        });

        if (visibleCount === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }
      });

      // Click pill to prefill or search
      pills.forEach(pill => {
          pill.addEventListener('click', () => {
            searchInput.value = pill.textContent.replace(' (Base)', '');
            searchInput.dispatchEvent(new Event('input'));
          });
      });

        // 3. FAQ Accordion Functionality
        const faqButtons = document.querySelectorAll('.faq-btn');
      faqButtons.forEach(button => {
          button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('[data-icon="expand_more"]');
            const isExpanded = !content.classList.contains('hidden');

            // Close other open faqs
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-btn [data-icon="expand_more"]').forEach(i => i.style.transform = 'rotate(0deg)');

            if (!isExpanded) {
              content.classList.remove('hidden');
              if (icon) icon.style.transform = 'rotate(180deg)';
            }
          });
      });

        // 4. Motion & IntersectionObserver Scroll Animations
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              obs.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
      } else {
          document.querySelectorAll('.reveal-on-scroll, .reveal-scale').forEach(el => {
            el.classList.add('revealed');
          });
      }

        // 5. Bottom Navigation Bar Logic
        const bottomNav = document.getElementById('bottomNav');
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');

        let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        // Show bottom nav
        if (window.scrollY > 100) {
          bottomNav.classList.remove('translate-y-full');
        } else {
          bottomNav.classList.add('translate-y-full');
        }

        // Highlight active section
        let currentSection = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 250) {
          currentSection = section.getAttribute('id');
          }
        });

        navItems.forEach(item => {
          item.classList.remove('text-secondary');
        item.classList.add('text-on-surface-variant');
        item.querySelector('span.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";

        if (item.getAttribute('data-target') === currentSection) {
          item.classList.remove('text-on-surface-variant');
        item.classList.add('text-secondary');
        item.querySelector('span.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";
          }
        });
      });
    });
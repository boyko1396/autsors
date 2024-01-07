/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import 'files/script.js';
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

// support webp, identify device
import BaseHelpers from './helpers/BaseHelpers.js';

// box cookie
import BoxCookie from './modules/BoxCookie.js';

// range slider
import * as noUiSlider from 'nouislider';


import SmoothScroll from 'smoothscroll-polyfill';

BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', () => {
  SmoothScroll.polyfill();
  // cookie init
  const boxCookieInstance = new BoxCookie();

  // first screen img scroll
  const images = document.querySelectorAll('.js-hero-img');

  function updateImageVisibility() {
    const scrollPosition = window.scrollY;
    const halfViewport = window.innerHeight / 2;

    images.forEach(image => {
      const isVisible = scrollPosition > halfViewport;
      image.classList.toggle('is-visible', isVisible);
    });
  }

  window.addEventListener('scroll', updateImageVisibility);
  updateImageVisibility();

  // sticky header scroll
  const handleStickyHeader = () => {
    const headerTargetPoint1 = document.querySelector('.js-header-sticky-point-1');
    const headerTargetPoint2 = document.querySelector('.js-header-sticky-point-2');
    const headerSticky = document.querySelector('.js-header-sticky');

    const checkSticky = () => {
      const sectionTop1 = headerTargetPoint1.getBoundingClientRect().top + window.scrollY;
      const sectionTop2 = headerTargetPoint2.getBoundingClientRect().top + window.scrollY;
      const isSticky1 = window.scrollY > sectionTop1;
      const isSticky2 = window.scrollY > sectionTop2;

      headerSticky.classList.toggle('is-sticky-scroll', isSticky1);
      headerSticky.classList.toggle('is-sticky-point', isSticky2);
    };

    checkSticky();

    window.addEventListener('scroll', checkSticky);
  };

  handleStickyHeader();

  // nav link scroll
  const sections = document.querySelectorAll('.js-section');
  const navLinks = document.querySelectorAll('.js-link-anchor');
  const navList = document.querySelector('.header__nav-list');

  let currentActiveSection = null;

  const getActiveSection = () => {
    let activeSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSection = section;
      }
    });

    return activeSection;
  };

  const setActiveLink = () => {
    const activeSection = getActiveSection();

    if (activeSection !== currentActiveSection) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });

      if (activeSection) {
        const activeLinkId = activeSection.id;
        const activeLink = document.querySelector(`.js-link-anchor[href="#${activeLinkId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          const navListClass = `is-active-${activeLinkId}`;
          navList.classList.add(navListClass);
        }
      }

      if (currentActiveSection) {
        const currentLinkId = currentActiveSection.id;
        const navListClassToRemove = `is-active-${currentLinkId}`;
        navList.classList.remove(navListClassToRemove);
      }

      currentActiveSection = activeSection;

      updateNavDotPosition();
    }
  };

  const updateNavDotPosition = () => {
    const activeLink = navList.querySelector('.js-link-anchor.active');
    const navDot = document.querySelector('.header__nav-dot');

    if (activeLink) {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const navDotX = Math.round(activeLinkRect.left + activeLinkRect.width / 2 - navList.getBoundingClientRect().left);

      navDot.style.transform = `translateX(${navDotX}px)`;
    }
  };

  window.addEventListener('scroll', setActiveLink);
  window.addEventListener('resize', updateNavDotPosition);

  setActiveLink();

  // range slider init
  var snapSlider = document.getElementById('slider');

  noUiSlider.create(snapSlider, {
    start: 1,
    behaviour: 'snap',
    step: 1,
    connect: [true, false],
    range: {
      'min': 1,
      'max': 16
    }
  });
});

gsap.set('.features-section__title-line > div > span', { width: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '.features-section__title-line',
    scrub: true,
    start: 'top 70%',
    end: 'top 30%'
  }
})
.to('.features-section__title-line > div > span', {
  width: '102%', 
  duration: .2,
  ease: 'none',
  stagger: 1
});

gsap.timeline({
  scrollTrigger: {
    trigger: '.hero-section__col-btn',
    scrub: true,
    start: 'bottom 30%',
    end: 'bottom -90%'
  }
})
.to('.js-parallax-hero-picture', {
  y: 130,
  duration: 1,
  ease: 'none'
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.js-parallax-img').forEach(function(container) {
  let image = container.querySelector('img');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: true,
      pin: false,
      markers: false
    },
  }); 
  tl.to(image, {
    y: 50,
    ease: 'none',
  }); 
});
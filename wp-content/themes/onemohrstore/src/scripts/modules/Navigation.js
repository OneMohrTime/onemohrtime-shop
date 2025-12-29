// =============================================================================
// Modules: Navigation
// =============================================================================
// Controls show/hide of primary navigation menus

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Vars
    this.classes = [];
    this.header = null;
    this.navigation = null;
    this.menu = null;
    this.search = null;
    this.toggleMenu = null;
    this.searchForm = null;
    this.overlay = null;
    this.activeMenu = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.header     = this.el;
    this.navigation = this.header.querySelector('.c-navigation');
    this.menu       = this.header.querySelector('.c-navigation__menu');
    this.search     = this.header.querySelector('.c-navigation__search button');
    this.toggleMenu = this.header.querySelector('.c-navigation__toggle');
    this.searchForm = this.header.querySelector('.o-header__search');
    this.overlay    = document.querySelector('.o-site__overlay');

    // Functions
    this.handleScroll();
    this.handleNavbarTransparency();

    // Attach click event listener to the toggle button
    const toggleButton = this.toggleMenu;
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {

        // Open primary navigation
        this.togglePrimaryNav();
      });
    }

    // Attach click event listener to the search button
    const searchButton = this.search;
    if (searchButton) {
      searchButton.addEventListener('click', () => {

        // Open primary navigation
        this.toggleSearch();
      });
    }

    // Setup menu interactions
    this.setupMenuInteractions();

    // Setup overlay interaction
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeAllMenus());
    }

  }

  // Setup Menu Interactions
  // =========================================================================
  setupMenuInteractions() {
    // Handle mega menu triggers
    const megaMenuTriggers = this.header.querySelectorAll('[data-trigger-megamenu]');
    megaMenuTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMegaMenu(trigger);
      });
    });

    // Handle submenu triggers
    const submenuTriggers = this.header.querySelectorAll('[data-trigger-submenu]');
    submenuTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSubmenu(trigger);
      });
    });

    // Close menus when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllMenus();
      }
    });
  }

  // Toggle Mega Menu
  // =========================================================================
  toggleMegaMenu(trigger) {
    const menuItem = trigger.closest('.c-navigation__menuItem');
    const megaMenu = trigger.parentElement.querySelector('.c-mega-menu');
    if (!megaMenu) return;

    const isOpen = megaMenu.classList.contains('is-visible');

    if (!isOpen) {
      // Close all other menus
      this.closeAllMenus();
      // Open this menu
      megaMenu.classList.remove('is-hidden');
      megaMenu.classList.add('is-visible');
      megaMenu.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      if (menuItem) {
        menuItem.classList.add('is-active');
      }
      this.showOverlay();
      this.activeMenu = megaMenu;
    } else {
      // Close this menu
      megaMenu.classList.add('is-hidden');
      megaMenu.classList.remove('is-visible');
      megaMenu.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      if (menuItem) {
        menuItem.classList.remove('is-active');
      }
      this.hideOverlay();
      this.activeMenu = null;
    }
  }

  // Toggle Submenu
  // =========================================================================
  toggleSubmenu(trigger) {
    const menuItem = trigger.closest('.c-navigation__menuItem');
    const targetId = trigger.getAttribute('data-toggle');
    const submenu = this.header.querySelector(`#${targetId}`);
    if (!submenu) return;

    const isOpen = submenu.classList.contains('is-visible');

    if (!isOpen) {
      // Close all other menus
      this.closeAllMenus();
      // Open this menu
      submenu.classList.remove('is-hidden');
      submenu.classList.add('is-visible');
      submenu.setAttribute('aria-hidden', 'false');
      if (menuItem) {
        menuItem.classList.add('is-active');
      }
      this.showOverlay();
      this.activeMenu = submenu;
    } else {
      // Close this menu
      submenu.classList.add('is-hidden');
      submenu.classList.remove('is-visible');
      submenu.setAttribute('aria-hidden', 'true');
      if (menuItem) {
        menuItem.classList.remove('is-active');
      }
      this.hideOverlay();
      this.activeMenu = null;
    }
  }

  // Close All Menus
  // =========================================================================
  closeAllMenus() {
    // Close all mega menus
    const megaMenus = this.header.querySelectorAll('.c-mega-menu');
    megaMenus.forEach((menu) => {
      menu.classList.remove('is-visible');
      menu.classList.add('is-hidden');
      menu.setAttribute('aria-hidden', 'true');
    });

    // Close all submenus
    const submenus = this.header.querySelectorAll('.c-submenu');
    submenus.forEach((menu) => {
      menu.classList.remove('is-visible');
      menu.classList.add('is-hidden');
      menu.setAttribute('aria-hidden', 'true');
    });

    // Reset aria-expanded on all triggers
    const allTriggers = this.header.querySelectorAll('[data-trigger-megamenu], [data-trigger-submenu]');
    allTriggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });

    // Remove is-active class from all menu items
    const allMenuItems = this.header.querySelectorAll('.c-navigation__menuItem');
    allMenuItems.forEach((item) => {
      item.classList.remove('is-active');
    });

    this.hideOverlay();
    this.activeMenu = null;
  }

  // Show Overlay
  // =========================================================================
  showOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('is-hidden');
      this.overlay.classList.add('is-visible');
      this.overlay.setAttribute('aria-hidden', 'false');
    }
  }

  // Hide Overlay
  // =========================================================================
  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('is-hidden');
      this.overlay.classList.remove('is-visible');
      this.overlay.setAttribute('aria-hidden', 'true');
    }
  }

  // Handle Scroll
  // =========================================================================
  handleScroll() {
    // Store navbar classes
    this.classes = this.header.classList;

    // Initial scroll position
    let scrollState = 0;

    // Returns current scroll position
    const scrollTop = () => window.scrollY;

    // Primary scroll event function
    const scrollDetect = (home, down, up) => {
      // Current scroll position
      const currentScroll = scrollTop();
      if (currentScroll === 0) {
        home();
      } else if (currentScroll > scrollState) {
        down();
      } else {
        up();
      }
      // Set previous scroll position
      scrollState = scrollTop();
    };

    const homeAction = () => {
      this.classes.remove('-slideUp');
      this.classes.remove('-slideDown');
      this.classes.add('-slideTop');
    };

    const downAction = () => {
      this.classes.remove('-slideTop');
      this.classes.remove('-slideDown');
      this.classes.add('-slideUp');
    };

    const upAction = () => {
      this.classes.remove('-slideTop');
      this.classes.remove('-slideUp');
      this.classes.add('-slideDown');
    };

    // Attach the scroll event handler
    window.addEventListener('scroll', () => {
      scrollDetect(homeAction, downAction, upAction);
    });
  }

  // Navbar Transparency
  // =========================================================================
  handleNavbarTransparency() {
    // Add or remove scrolling navbar classes
    window.addEventListener('scroll', () => {
      const nav = this.header.querySelector('nav');

      if (50 < window.scrollY) {
        nav.classList.add('is-transparent');
      } else {
        nav.classList.remove('is-transparent');
      }
    });
  }



  // Toggle Primary Nav
  // =========================================================================
  togglePrimaryNav() {
    // Find sit elements
    const siteContainer = document.querySelector('.o-site');

    // Set classes to "open"
    this.header.classList.toggle('is-active');
    this.navigation.classList.toggle('is-visible');
    this.menu.classList.toggle('is-hidden');
    this.toggleMenu.classList.toggle('open');
    siteContainer.classList.toggle('-activeNavigationAreaUpTopButNotWhenScrolling');

    // Check if menu is now open or closed
    if (this.header.classList.contains('is-active')) {
      // Menu is open - show overlay
      this.showOverlay();
    } else {
      // Menu is closed - hide overlay and close all submenus
      this.hideOverlay();
      const allMegamenus = this.header.querySelectorAll('.c-mega-menu');
      const allTriggers = this.header.querySelectorAll('[data-trigger-megamenu]');

      allMegamenus.forEach(menu => {
        menu.classList.remove('is-visible');
        menu.classList.add('is-hidden');
        menu.setAttribute('aria-hidden', 'true');
      });

      allTriggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
      });
    }
  }



  // Search Form Toggle
  // =========================================================================
  toggleSearch() {
    this.searchForm.classList.toggle('is-hidden');
    this.searchForm.classList.toggle('is-visible');
  }

  // Destroy
  // =========================================================================
  destroy() {}
}

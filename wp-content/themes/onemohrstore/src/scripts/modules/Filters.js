// =============================================================================
// Modules: Example
// =============================================================================
// ...

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import modularLoad from 'modularload';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.select = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.select = this.el.querySelector('[data-filter-category]');

    if (this.select) {
      this.select.addEventListener('change', function(e) {

        const val = e.target.value;
        if (val) {
          window.location.href = '/collection/' + encodeURIComponent(val) + '/';
        } else {
          window.location.href = '/shop/';
        }
      });
    }
  }

  // Destroy
  // =========================================================================
  destroy() {}
}

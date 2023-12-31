// =============================================================================
// Modules: Scroll
// =============================================================================
// Establishes custom scrolling functionality allowing for anything from smooth
// scrolling to parallax elements right out of the box with use of 'Mighty Scroll'

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import { lazyLoadImage } from '../utils/image';
import LocomotiveScroll from 'locomotive-scroll';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  constructor(m) {
    super(m);
  }

  // Init module
  // ===========================================================================
  init() {
    this.scroll = new LocomotiveScroll({
      el: this.el,
      smooth: true
    });

    this.scroll.on('call', (func, way, obj, id) => {
      // Using modularJS
      this.call(func[0], { way, obj }, func[1], func[2]);
    });

    this.scroll.on('scroll', (args) => {
      // console.log(args.scroll);
    })
  }

  /**
   * Lazy load the related image.
   *
   * @see ../utils/image.js
   *
   * It is recommended to wrap your `<img>` into an element with the
   * CSS class name `.c-lazy`. The CSS class name modifier `.-lazy-loaded`
   * will be applied on both the image and the parent wrapper.
   *
   * ```html
   * <div class="c-lazy o-ratio u-4:3">
   *     <img data-scroll data-scroll-call="lazyLoad, Scroll, main" data-src="http://picsum.photos/640/480?v=1" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
   * </div>
   * ```
   *
   * @param {LocomotiveScroll} args - The Locomotive Scroll instance.
   */
  lazyLoad(args) {
    lazyLoadImage(args.obj.el, null, () => {
      //callback
    })
  }

  destroy() {
    this.scroll.destroy();
  }
}

import {
  __commonJS
} from "./chunk-Y2F7D3TJ.js";

// node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = __commonJS({
  "node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/isSameOrAfter.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
    }(exports, function() {
      "use strict";
      return function(e, t) {
        t.prototype.isSameOrAfter = function(e2, t2) {
          return this.isSame(e2, t2) || this.isAfter(e2, t2);
        };
      };
    });
  }
});
export default require_isSameOrAfter();
//# sourceMappingURL=dayjs_plugin_isSameOrAfter.js.map

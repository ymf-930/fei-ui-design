import {
  __commonJS
} from "./chunk-Y2F7D3TJ.js";

// node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/isSameOrBefore.js
var require_isSameOrBefore = __commonJS({
  "node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/isSameOrBefore.js"(exports, module) {
    !function(e, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrBefore = i();
    }(exports, function() {
      "use strict";
      return function(e, i) {
        i.prototype.isSameOrBefore = function(e2, i2) {
          return this.isSame(e2, i2) || this.isBefore(e2, i2);
        };
      };
    });
  }
});
export default require_isSameOrBefore();
//# sourceMappingURL=dayjs_plugin_isSameOrBefore.js.map

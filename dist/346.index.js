"use strict";
exports.id = 346;
exports.ids = [346];
exports.modules = {

/***/ 2346:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HMAC": () => (/* binding */ r),
/* harmony export */   "hmac": () => (/* binding */ H)
/* harmony export */ });
/* harmony import */ var _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3125);

class r extends _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.H {
  constructor(t, i) {
    super(), this.finished = !1, this.destroyed = !1, _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.a.hash(t);
    const h = (0,_utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.t)(i);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const a = this.blockLen, s = new Uint8Array(a);
    s.set(h.length > a ? t.create().update(h).digest() : h);
    for (let e = 0; e < s.length; e++)
      s[e] ^= 54;
    this.iHash.update(s), this.oHash = t.create();
    for (let e = 0; e < s.length; e++)
      s[e] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(t) {
    return _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.a.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.a.exists(this), _utils_26d2af60_mjs__WEBPACK_IMPORTED_MODULE_0__.a.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: i, iHash: h, finished: a, destroyed: s, blockLen: e, outputLen: d } = this;
    return t = t, t.finished = a, t.destroyed = s, t.blockLen = e, t.outputLen = d, t.oHash = i._cloneInto(t.oHash), t.iHash = h._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const H = (n, t, i) => new r(n, t).update(i).digest();
H.create = (n, t) => new r(n, t);

//# sourceMappingURL=hmac-f45eeb4d.mjs.map


/***/ }),

/***/ 3125:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ g),
/* harmony export */   "a": () => (/* binding */ l),
/* harmony export */   "c": () => (/* binding */ h),
/* harmony export */   "r": () => (/* binding */ d),
/* harmony export */   "t": () => (/* binding */ y),
/* harmony export */   "w": () => (/* binding */ E)
/* harmony export */ });
function r(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
function f(t) {
  if (typeof t != "boolean")
    throw new Error(`Expected boolean, not ${t}`);
}
function o(t, ...e) {
  if (!(t instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
function s(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  r(t.outputLen), r(t.blockLen);
}
function c(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function u(t, e) {
  o(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const l = {
  number: r,
  bool: f,
  bytes: o,
  hash: s,
  exists: c,
  output: u
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const a = (t) => t instanceof Uint8Array, h = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), d = (t, e) => t << 32 - e | t >>> e, w = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!w)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function p(t) {
  if (typeof t != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function y(t) {
  if (typeof t == "string" && (t = p(t)), !a(t))
    throw new Error(`expected Uint8Array, got ${typeof t}`);
  return t;
}
class g {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function E(t) {
  const e = (i) => t().update(y(i)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}

//# sourceMappingURL=utils-26d2af60.mjs.map


/***/ })

};
;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.getText = exports.Selectors = void 0;
exports.Selectors = {
    Results: ".result-content",
    Name: "h2[itemprop=name]",
    City: "[itemprop=addressLocality]",
    Street: "[itemprop=streetAddress]",
    PostCode: "[itemprop=postalCode]",
    More: ".pagination + .next[href]",
    ActivePage: ".pagination > .active",
};
const getText = (el) => (el.text() || "").trim();
exports.getText = getText;
exports.Logger = {
    start: (message) => console.log(`\n${message} 🚀\n`),
    waiting: (message) => console.log(`⌛ ${message}`),
    success: (message) => console.log(`✅ ${message}`),
    celebrate: (message) => console.log(`🎉 ${message}`),
    star: (message) => console.log(`🤩 ${message}`),
    cheers: (message) => console.log(`🥂 ${message}`),
    failed: (message, error) => console.error(`❌ ${message}`, error),
    nl: () => console.log(""),
};
//# sourceMappingURL=util.js.map
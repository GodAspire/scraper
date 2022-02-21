export const Selectors = {
    Results: ".result-content",
    Name: "h2[itemprop=name]",
    City: "[itemprop=addressLocality]",
    Street: "[itemprop=streetAddress]",
    PostCode: "[itemprop=postalCode]",
    More: ".pagination + .next[href]",
    ActivePage: ".pagination > .active",
};

export const getText = (el: cheerio.Cheerio) => (el.text() || "").trim();

export interface Company {
    name: string;
    city: string;
    street: string;
    postCode: string;
}

export type CompanyKeys = (keyof Company)[];

export const Logger = {
    start: (message: string) => console.log(`\n${message} 🚀\n`),
    waiting: (message: string) => console.log(`⌛ ${message}`),
    success: (message: string) => console.log(`✅ ${message}`),
    celebrate: (message: string) => console.log(`🎉 ${message}`),
    star: (message: string) => console.log(`🤩 ${message}`),
    cheers: (message: string) => console.log(`🥂 ${message}`),
    failed: (message: string, error?: any) =>
        console.error(`❌ ${message}`, error),
    nl: () => console.log(""),
};

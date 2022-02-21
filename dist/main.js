"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const inquirer_1 = require("inquirer");
const util_1 = require("./util");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const scrapePage = (html) => {
    const $ = cheerio_1.default.load(html);
    const $results = $(util_1.Selectors.Results);
    const companies = $results.toArray().map((co) => {
        const name = (0, util_1.getText)($(util_1.Selectors.Name, co));
        const city = (0, util_1.getText)($(util_1.Selectors.City, co));
        const street = (0, util_1.getText)($(util_1.Selectors.Street, co));
        const postCode = (0, util_1.getText)($(util_1.Selectors.PostCode, co));
        return { name, city, street, postCode };
    });
    const hasMore = !!$(util_1.Selectors.More);
    const page = parseInt((0, util_1.getText)($(util_1.Selectors.ActivePage)));
    return { companies, hasMore, page };
};
const outputAsCSV = (results, sep = ";") => __awaiter(void 0, void 0, void 0, function* () {
    const keys = ["name", "city", "street", "postCode"];
    // table head
    let content = keys.join(sep);
    // table rows
    results.forEach((c) => {
        const line = keys.map((k) => c[k]).join(sep);
        content += "\n" + line;
    });
    const path = "./output.csv";
    yield (0, promises_1.writeFile)("./output.csv", content);
    return path;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const scraped = new Set();
    const baseUrl = "https://www.firmenabc.at/firmen/haiming_ZyC/";
    const { start, waiting, success, failed, celebrate, nl, cheers, star } = util_1.Logger;
    start("Company Scraper");
    let hasMore = true;
    for (let index = 1; hasMore; index++) {
        const url = baseUrl + index;
        waiting("Trying: " + url);
        try {
            const { data } = yield axios_1.default.get(url);
            const { companies, page, hasMore: more } = scrapePage(data);
            if (!scraped.has(page)) {
                results.push(...companies);
                scraped.add(page);
                hasMore = more;
                celebrate(`Found ${companies.length} companies\n`);
            }
            else {
                cheers("Scraped all pages\n");
                break;
            }
        }
        catch (error) {
            hasMore = false;
            failed("Scraping operation failed on page " + index);
        }
    }
    success(`Found ${results.length} companies in total`);
    nl();
    const { output } = yield (0, inquirer_1.prompt)([
        {
            name: "output",
            message: "Output the results as .csv file? 🤔",
            type: "confirm",
        },
    ]);
    if (output) {
        const savePath = yield outputAsCSV(results);
        celebrate("Saved .csv file to " + (0, path_1.join)(__dirname, "..", savePath));
    }
});
main();
//# sourceMappingURL=main.js.map
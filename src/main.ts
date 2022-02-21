import axios from "axios";
import cheerio from "cheerio";

import { prompt } from "inquirer";
import { Selectors, getText, Logger, Company, CompanyKeys } from "./util";

import { writeFile } from "fs/promises";
import { join } from "path";

const scrapePage = (html: string) => {
    const $ = cheerio.load(html);
    const $results = $(Selectors.Results);

    const companies: Company[] = $results.toArray().map((co) => {
        const name = getText($(Selectors.Name, co));
        const city = getText($(Selectors.City, co));
        const street = getText($(Selectors.Street, co));
        const postCode = getText($(Selectors.PostCode, co));

        return { name, city, street, postCode };
    });

    const hasMore = !!$(Selectors.More);
    const page = parseInt(getText($(Selectors.ActivePage)));

    return { companies, hasMore, page };
};

const outputAsCSV = async (results: Company[], sep = ";") => {
    const keys: CompanyKeys = ["name", "city", "street", "postCode"];

    // table head
    let content = keys.join(sep);

    // table rows
    results.forEach((c) => {
        const line = keys.map((k) => c[k]).join(sep);
        content += "\n" + line;
    });

    const path = "./output.csv";
    await writeFile("./output.csv", content);

    return path;
};

const main = async () => {
    const results: Company[] = [];
    const scraped = new Set<number>();

    const baseUrl = "https://www.firmenabc.at/firmen/haiming_ZyC/";
    const { start, waiting, success, failed, celebrate, nl, cheers, star } =
        Logger;

    start("Company Scraper");

    let hasMore = true;
    for (let index = 1; hasMore; index++) {
        const url = baseUrl + index;

        waiting("Trying: " + url);

        try {
            const { data } = await axios.get<string>(url);
            const { companies, page, hasMore: more } = scrapePage(data);

            if (!scraped.has(page)) {
                results.push(...companies);
                scraped.add(page);
                hasMore = more;

                celebrate(`Found ${companies.length} companies\n`);
            } else {
                cheers("Scraped all pages\n");
                break;
            }
        } catch (error) {
            hasMore = false;
            failed("Scraping operation failed on page " + index);
        }
    }

    success(`Found ${results.length} companies in total`);

    nl();

    const { output } = await prompt<{ output: boolean }>([
        {
            name: "output",
            message: "Output the results as .csv file? 🤔",
            type: "confirm",
        },
    ]);

    if (output) {
        const savePath = await outputAsCSV(results);
        celebrate("Saved .csv file to " + join(__dirname, "..", savePath));
    }
};

main();

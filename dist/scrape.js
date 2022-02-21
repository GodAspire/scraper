// import axios from "axios";
// import cheerio from "cheerio";
// import { Selectors, getTextFromElement } from "./util";
// export const scrape = async () => {
//     const results: any[] = [];
//     const baseUrl = "https://www.firmenabc.at/firmen/haiming_ZyC/";
//     let hasMore = true;
//     for (let index = 0; hasMore; index++) {
//         const { data } = await axios.get<string>(baseUrl + index);
//         const $ = cheerio.load(data);
//         const companies = $(Selectors.Results).map((i, co) => {
//             const name = getTextFromElement($(Selectors.Name, co));
//             const city = getTextFromElement($(Selectors.City, co));
//             const street = getTextFromElement($(Selectors.Street, co));
//             const postalCode = getTextFromElement($(Selectors.PostalCode, co));
//             return { name, city, street, postalCode };
//         });
//         // results.push(...companies);
//         hasMore = !!$(Selectors.More);
//     }
//     console.log(results[0]);
// };
// const getPageCompanies = (pageResults: cheerio.Cheerio) => {
//     const companies = [];
//     pageResults.
// }
//# sourceMappingURL=scrape.js.map
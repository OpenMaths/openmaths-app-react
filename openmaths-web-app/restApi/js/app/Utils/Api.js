"use strict";
var axios = require('axios');
function WikipediaParseInstance(pageTitle) {
    return axios.create({
        baseURL: 'https://en.wikipedia.org/w/api.php',
        params: {
            action: 'parse',
            prop: 'text',
            page: pageTitle,
            format: 'json',
            section: 0
        }
    });
}
exports.WikipediaParseInstance = WikipediaParseInstance;
function WikipediaQueryCategoriesInstance(pageId) {
    return axios.create({
        baseURL: 'https://en.wikipedia.org/w/api.php',
        params: {
            action: 'query',
            prop: 'categories',
            pageids: pageId,
            format: 'json'
        }
    });
}
exports.WikipediaQueryCategoriesInstance = WikipediaQueryCategoriesInstance;
exports.ServerInstance = axios.create({
    baseURL: '/api'
});
exports.GoogleApiInstance = axios.create({
    baseURL: 'https://www.googleapis.com'
});
//# sourceMappingURL=Api.js.map
import * as axios from 'axios'

export function WikipediaParseInstance(pageTitle:string) {
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

export interface IWikipediaParseInstanceResponse {
    warnings: {
        main: {
            '*':string
        }
    };
    parse: {
        title:string;
        pageid:number;
        text: {
            '*':string
        }
    };
}

export function WikipediaQueryCategoriesInstance(pageId:number) {
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

interface IWikipediaCategory {
    ns:number;
    title:string;
}

export interface IWikipediaQueryTagsInstanceResponse {
    warnings: {
        main: {
            '*':string
        }
    };
    query: {
        pages: {
            [pageId:number]: {
                pageid:number;
                ns:number;
                title:string;
                categories:IWikipediaCategory[]
            }
        }
    };
}

export const ServerInstance = axios.create({
    baseURL: '/api'
});

export const GoogleApiInstance = axios.create({
    baseURL: 'https://www.googleapis.com'
});
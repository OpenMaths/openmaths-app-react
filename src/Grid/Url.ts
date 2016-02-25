import * as Crypto from 'crypto-js';

import { GridUrlConstruct } from './Components/Grid'

export function encodeGridUrl(input:GridUrlConstruct):string {
    const
        words = Crypto.enc.Utf8.parse(JSON.stringify(input)),
        base64 = Crypto.enc.Base64.stringify(words);

    return base64;
}

export function decodeGridUrl(input:string):GridUrlConstruct {
    const
        words = Crypto.enc.Base64.parse(input),
        textString = Crypto.enc.Utf8.stringify(words);

    let parsedUrl;

    try {
        parsedUrl = JSON.parse(textString);
    } catch (Exception) {
        console.error(Exception);
        parsedUrl = null;
    }

    return parsedUrl;
}
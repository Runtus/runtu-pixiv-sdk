
import { enums } from './enums';
import crypto from 'crypto';
const najax = require('najax');
import axios from 'axios'
import base64url from 'base64url';
import readlineSync from 'readline-sync';
import { getHost, getPort } from '../../request/proxy'

const tokenBase64 : (size: number) => string = (size) => {
    return base64url(crypto.randomBytes(size));
}

export function main(): void {
    let pullUpURL: string;
    let code_verifier = tokenBase64(32);
    let code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64').split('/').join('_').split('+').join('-').split('=').join('');
    let LOGIN_PARAMS = {
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
        "client": "pixiv-android"
    }
    console.log("Please copy the URL below to browser and proceed to login as you would usually do.");
    console.log(`${enums.API_BASE_URL}/web/v1/login?${new URLSearchParams(LOGIN_PARAMS).toString()}`);
    console.log("When you see a blank page page, press F12 or Ctrl + Shift + I (Command + Option + I on mac)");
    console.log(`Switch to "Console" tab and you will see an error shows:`);
    console.log(`"Failed to launch 'pixiv://...' because the scheme does not have a registered handler"`)
    while (true) {
        pullUpURL = readlineSync.question(`Copy the link starts with "pixiv://" and paste it here: `)
        if (pullUpURL.search("pixiv://account/login") == -1) {
            console.log(`The URL (${pullUpURL}) is not correct. Please try again.`);
        } else break;
    }
    let AUTH_CODE = new URLSearchParams(pullUpURL.substring(21)).get('code');
    // console.log(AUTH_CODE);
}

main()
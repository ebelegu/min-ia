import {TokenSet} from "openid-client";
import fetch from "node-fetch";
import {getMockTokenFromIdporten, verifiserAccessToken} from "./idporten";
let tokenxClient;
//const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function getMockTokenXToken() {
    const tokenXToken = await (
        await fetch(
            process.env.FAKEDINGS_URL_TOKENX +
            `?aud=${process.env.TOKENX_AUDIENCE}&acr=Level4&pid=01065500791`
        )
    ).text();
    return new TokenSet({
        access_token: tokenXToken,
    });
}

async function getTokenXToken(token, additionalClaims) {
    let tokenSet;
    try {
        tokenSet = await tokenxClient?.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: process.env.TOKENX_AUDIENCE,
                subject_token: token,
            },
            additionalClaims
        );
    } catch (err) {
        console.error(
            `Noe gikk galt med token exchange mot TokenX.
            Feilmelding fra openid-client: (${err}).
            HTTP Status fra TokenX: (${err.response.statusCode} ${err.response.statusMessage})
            Body fra TokenX:`,
            err.response.body
        );
    }
    if (!tokenSet && process.env.NODE_ENV !== 'not-local') {
        // Dette skjer kun i lokalt miljø - siden tokenxClient kun blir initialisert i GCP env
        tokenSet = await getMockTokenXToken();
    }
    return tokenSet;
}

async function exchangeToken(req) {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        if (process.env.NODE_ENV !== 'not-local') {
            token = await getMockTokenFromIdporten();
        } else {
            // Brukeren er ikke autorisert
            return;
        }
    }
    await verifiserAccessToken(token);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient?.issuer.metadata.token_endpoint],
        },
    };

    return await getTokenXToken(token, additionalClaims);
}

/*module.exports = {
    exchangeToken,
};*/


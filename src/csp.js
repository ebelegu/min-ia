const csp = {
  "default-src": [
    "'self'",
    "arbeidsgiver.nav.no",
    "dekoratoren.ekstern.dev.nav.no",
  ],
  "script-src": [
    "'self'",
    "'report-sample'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "www.google-analytics.com",
    "www.googletagmanager.com",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
    "*.taskanalytics.com/tm.js",
    "play2.qbrick.com",
    "video.qbrick.com",
    "httpcache0-80659-cachedown0.dna.ip-only.net/80659-cachedown0/custom/modules/WCAG/controls.min.js",
    "*.dna.ip-only.net",
    "imasdk.googleapis.com/js/sdkloader/ima3.js",
  ],
  "style-src": [
    "'self'",
    "blob:",
    "*.nav.no",
    "'unsafe-inline'",
    "fonts.googleapis.com",
    "translate.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "oidc-ver2.difi.no/idporten-oidc-provider/authorize",
    "idporten-ver2.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp4",
    "amplitude.nav.no",
    "data.brreg.no",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.vc.hotjar.com",
    "*.hotjar.io",
    "*.vc.hotjar.io",
    "wss://*.hotjar.com",
    "api.puzzel.com",
    "nav.boost.ai",
    "sentry.gc.nav.no",
    "www.google-analytics.com",
    "ta-survey-v2.herokuapp.com",
    "video.qbrick.com",
    "play2.qbrick.com",
    "ws://notification.qbrick.com",
    "analytics.qbrick.com",
    "*.dna.ip-only.net",
    "localhost:12347",
  ],
  "font-src": [
    "data:",
    "*.psplugin.com",
    "*.hotjar.com",
    "fonts.gstatic.com",
    "www.nav.no",
    "cdn.nav.no",
    "play2.qbrick.com",
  ],
  "frame-src": ["vars.hotjar.com", "*.nav.no"],
  "img-src": [
    "'self'",
    "*.hotjar.com",
    "www.google-analytics.com",
    "www.gstatic.com",
    "translate.google.com",
    "*.nav.no",
    "data:",
    "www.googletagmanager.com",
    "*.dna.ip-only.net",
  ],
  "media-src": ["'self'", "*.dna.ip-only.net", "blob:"],
  "object-src": ["'self'", "blob:"],
  "report-uri": [
    "https://sentry.gc.nav.no/api/77/security/?sentry_key=97af8a51172e4f9bb74ac9c05920b1d2",
  ],
  "worker-src": ["'self'", "blob:"],
};

const stringified = Object.entries(csp)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");

module.exports = stringified;

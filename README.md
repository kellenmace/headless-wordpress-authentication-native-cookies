# Headless WordPress Authentication with Native Cookies

Next.js app code for this blog post:
https://developers.wpengine.com/blog/headless-wordpress-authentication-native-cookies/

This is a Next.js application that shows how to authenticate users using WordPress' own native auth cookies.

## About its usage on Safari & iOS ⚠️

Apple doesn't allow cross-site cookies, making the login impossible if you are hosting the app & WordPress on separate domains.

The **short-term** solution is to disable it from: `Safari > Settings > Site tracking > Prevent Cross-Site Tracking`.

The **long-term** solution is to host both the WordPress (back-end) & the webapp (front-end) on the **same domain** (e.g. each one on a different sub-domain).

See this related [issue](https://github.com/kellenmace/headless-wordpress-authentication-native-cookies/issues/4) for more informations.

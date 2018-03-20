const express = require('express')
const app = express()
const Issuer = require('openid-client').Issuer;

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const OKTA_AUTH_SERVER_ISSUER_URL = process.env.OKTA_AUTH_SERVER_ISSUER_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

(async () => {
  Issuer.defaultHttpOptions = { timeout: 3000};
  const issuer = await Issuer.discover(`${OKTA_AUTH_SERVER_ISSUER_URL}/.well-known/openid-configuration`)

  const client = new issuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });

  app.get('/authorize', (req, res, next) => {
    const authorizeUrl = client.authorizationUrl({
      redirect_uri: 'http://localhost:4000/okta/callback',
      scope: 'openid email',
      state: '1234567890',
      response_type: 'code'
    });
    res.redirect(authorizeUrl)
  })

  app.get('/okta/callback', async (req, res, next) => {
    if (req.query.error) {
      res.send(req.query);
    } else {
      const tokenSet = await client.authorizationCallback('http://localhost:4000/okta/callback', req.query, {state: '1234567890'})
      res.send(tokenSet)
    }
  })

  app.listen(4000)
})()


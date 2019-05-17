# Matrix Logger

A very simple bot that accepts HTTP POST requests and redirects them to the matrix chat.

Note that anyone can send a message to the bot (there is no authentication).

## How to run

First, add a `config.json` file in the top folder. Here is an example of how it should look like:

``` json
{
  "token": "MDAxO...kIHVgf2Cg",
  "user": "@username:matrix.org",
  "botId": "@name-of-your-bot:matrix.org",
  "baseUrl": "https://matrix.org",
  "port": 3000
}
```

See https://t2bot.io/docs/access_tokens for generating tokens.

Next, install the dependencies and run the server:

```
yarn
yarn start
```

## Usage

The server listens only to the POST route `/log` which accepts a form-encoded body. The only parameter you have to set is `msg`.  
See `src/example.py` for a basic python implementation.

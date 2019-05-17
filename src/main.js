const assert = require('assert');
const fs = require('fs');
const sdk = require('matrix-js-sdk');
const express = require('express');

const config = JSON.parse(fs.readFileSync('config.json'));

const client = sdk.createClient({
  accessToken: config.token,
  baseUrl: config.baseUrl,
  userId: config.botId,
});

// auto-join all invites which come from whitelisted users
client.on('RoomMember.membership', (event, member) => {
  if (member.membership === 'invite' && member.userId === client.getUserId()) {
    console.log('Got an invite from', event.getSender(), 'for', member.roomId);
    if (config.user === event.getSender()) {
      client.joinRoom(member.roomId);
    } else {
      client.joinRoom(member.roomId).done(() => {
        client.sendTextMessage(member.roomId, 'You are not on the whitelist, sorry')
          .then(() => client.leave(member.roomId));
      });
    }
  }
});

client.startClient();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/log', (req, res) => {
  if (req.body.msg !== undefined) {
    // send message to each joined room
    Object.keys(client.store.rooms).forEach((roomId) => {
      client.sendTextMessage(roomId, req.body.msg);
    });
    res.json({ msg: req.body.msg });
  } else {
    // bad request
    res.status(400).json({ error: 'Bad body', body: req.body });
  }
  // not implemented
  res.status(501).end();
});

client.once('sync', (state) => {
  // state will be 'PREPARED' when the client is ready to use
  assert(state === 'PREPARED');
  console.log('state:', state);

  app.listen(config.port, () => console.log('server started'));
});

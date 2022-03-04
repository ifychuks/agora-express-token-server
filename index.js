const express = require("express");
const Agora = require("agora-access-token");

const app = express();
app.use(express.json());

app.post("/rtctoken", (req, res) => {
  const appID = "bfbb5bac6f974347a289770aa9331848";
  const appCertificate = "3f39ff993b7e4bc49f723b6088536f5b";
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
  res.send({ uid, token });
});

app.post("/rtmtoken", (req, res) => {
  const appID = "bfbb5bac6f974347a289770aa9331848";
  const appCertificate = "3f39ff993b7e4bc49f723b6088536f5b";
  const user = req.body.user;
  const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, user, role, expirationTimestamp);
  res.send({ token });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));

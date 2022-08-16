const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const client = new OAuth2Client(process.env.CLIENT_ID)

const verifyAndDecodeToken = async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { name, email } = ticket.getPayload();
  const user = await User.findOneAndUpdate(
    { email: email },
    { username: name, email: email },
    { upsert: true }
  )
  // const user = await db.user.upsert({
  //   where: { email: email },
  //   update: { name, picture },
  //   create: { name, email, picture }
  // })
  req.session.userId = user.id
  res.status(201)
  res.json(user)
}

module.exports = {
  verifyAndDecodeToken
}
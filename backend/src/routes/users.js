const express = require('express')
const User = require('../models/user')
const Tweet = require('../models/tweet')

const router = express.Router()

router.get('/', async (req, res) => {
  res.send(await User.find())
})

router.get('/initialize', async (req, res) => {
  const muratObj = { name: 'Murat Can Oguzhan', handle: 'muratcanoguzhan', email: 'm.c.ogzhan@gmail.com' }
  const dasherswObj = { name: 'Armagan Amcalar', handle: 'dashersw', email: 'armagan@coyotiv.com' }

  const murat = await User.findOneAndUpdate(muratObj, muratObj, { upsert: true, new: true })
  const dashersw = await User.findOneAndUpdate(dasherswObj, dasherswObj, { upsert: true, new: true })

  const tweet1 = await Tweet.create({ body: 'Hello, World', author: dashersw })

  await dashersw.tweet(tweet1)
  await murat.retweet(tweet1, "Look at who's here! Welcome @dashersw")
  await murat.like(tweet1)

  res.send('Initializes')
})

module.exports = router

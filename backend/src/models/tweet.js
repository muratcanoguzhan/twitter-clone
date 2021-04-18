const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const tweetSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'handle name'},
      required: true,
    },
    body: {
      type: String,
      required() {
        return !this.originalTweet
      },
    },
    originalTweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      autopopulate: { maxDepth: 2 },
    },
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'handle' },
      },
    ],
    attachments: [],
    // replies: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Tweet'
    // }],
  },
  { timestamps: true }
)

tweetSchema.plugin(autopopulate)
// tweetSchema.loadClass()

module.exports = mongoose.model('Tweet', tweetSchema)

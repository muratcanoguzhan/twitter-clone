<script>
import { mapActions } from 'vuex'

import HelloWorld from '@/components/hello-world.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  async created() {
    // this.fetchUsers()
    this.tweets = await this.fetchTweets()
  },
  data(){
    return {
      tweets:[]
    }
  },
  methods: {
    ...mapActions(['fetchTweets']),
  },
}
</script>

<template lang="pug">
.home
  hello-world(msg="Welcome to your stack.")

  ul(v-if='tweets.length')
      li(v-for='t in tweets') {{t.author.name}} > {{t.body}} {{ t.body && t.originalTweet? 'ReTweeted > ' + t.originalTweet.author.name + ' ' + t.originalTweet.body :''}}
</template>

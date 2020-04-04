<template>
  <v-container fluid>
    <v-col
      v_if="profile"
      cols="12"
    >
      <v-row class="justify-center align-center">
        <p class="headline">
          {{ profile.pseudo }}'s wall'
        </p>
      </v-row>
      <v-row class="justify-center align-center">
        <v-form
          ref="form"
          class="add-form"
        >
          <v-textarea
            filled
            auto-grow
            label="Enter a comment"
            required
            rows="5"
            row-height="20"
            :value="comment.content"
            @input="setContent"
          />
          <v-alert
            v-if="feedback"
            dense
            text
            type="error"
          >
            {{ feedback }}
          </v-alert>
          <div class="d-flex justify-center">
            <v-btn
              color="success"
              class="mb-4"
              @click="addComment"
            >
              Validate
            </v-btn>
          </div>
        </v-form>
      </v-row>
      <v-row class="justify-center align-center">
        <p class="headline">
          Last comments
        </p>
      </v-row>
      <v-row class="justify-center align-center">
        <div>
          <v-list-item
            v-for="(item, index) in comments.slice(0, 5)"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.from }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.content }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ViewProfile',
  data() {
    return {
      profile: {},
      user: null,
      comments: [],
    };
  },
  computed: {
    ...mapState('comment', {
      feedback: (state) => state.feedback,
      comment: (state) => state.comment,
    }),
  },
  created() {
    const ref = db.collection('users');

    // get current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      });

    // profile data
    ref.doc(this.$route.params.id).get()
      .then((user) => {
        this.profile = user.data();
      });

    // comments
    db.collection('comments').where('to', '==', this.$route.params.id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content,
            });
          }
        });
      });
  },
  methods: {
    ...mapActions({ setComment: 'comment/setComment' }),
    setContent(value) { this.setComment({ content: value }); },

    addComment() {
      if (this.comment.content) {
        this.setFeedback(null);
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.id,
          content: this.comment.content,
          time: Date.now(),
        }).then(() => {
          this.setContent(null);
        });
      } else this.setFeedback('You must enter a comment to add it');
    },
    setFeedback(message) {
      this.$store.dispatch('comment/setValue', { feedback: message });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-form{
  width: 400px;
}
</style>

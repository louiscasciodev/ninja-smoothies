<template>
  <v-row justify="center">
    <v-dialog
      v-model="signUpForm"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Sign-Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Pseudo*"
                  required
                  :value="pseudo"
                  @input="setPseudo"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  :value="email"
                  @input="setEmail"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  :value="password"
                  @input="setPassword"
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <v-alert
            v-if="feedback"
            dense
            text
            type="error"
          >
            {{ feedback }}
          </v-alert>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            large
            color="success"
            class="mb-4 px-10"
            @click="signUp"
          >
            Sign-up
          </v-btn>
          <v-btn
            large
            class="mb-4 px-10"
            @click="formClose"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import { mapActions, mapState } from 'vuex';
import slugify from 'slugify';

export default {
  name: 'SignUp',
  computed: {
    ...mapState('user', {
      signUpForm: (state) => state.signUpForm,
      pseudo: (state) => state.infos.pseudo,
      email: (state) => state.infos.email,
      password: (state) => state.infos.password,
      slug: (state) => state.slug,
      feedback: (state) => state.feedback,
    }),
  },
  methods: {
    ...mapActions({ setInfos: 'user/setInfos' }),
    setPseudo(value) { this.setInfos({ pseudo: value }); },
    setEmail(value) { this.setInfos({ email: value }); },
    setPassword(value) { this.setInfos({ password: value }); },
    formClose() {
      this.$store.dispatch('user/setValue', { signUpForm: false });
    },
    signUp() {
      if (this.pseudo && this.email && this.password) {
        const sluged = slugify(this.pseudo, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        this.$store.dispatch('user/setInfos', { slug: sluged });
        const ref = db.collection('users').doc(sluged);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setFeedback('This alias already exists');
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => ref.set({
                pseudo: this.pseudo,
                geolocation: null,
                user_id: cred.user.uid,
              }))
              // update firebase user profile after being created
              // .then(() => {
              //   const user = firebase.auth().currentUser;
              //   console.log(user);
              //   user.updateProfile({
              //     displayName: this.pseudo,
              //   });
              // })
              .then(() => this.formClose())
              .then(() => this.$router.push({ name: 'HomeSmoothies' }).catch(() => {}))
              .catch((err) => {
                this.setFeedback(err.message);
              });
          }
        });
      } else {
        this.setFeedback('You must enter all fields');
      }
    },
    setFeedback(message) {
      this.$store.dispatch('user/setValue', { feedback: message });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

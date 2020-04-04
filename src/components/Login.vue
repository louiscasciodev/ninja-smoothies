<template>
  <v-row justify="center">
    <v-dialog
      v-model="loginForm"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
            @click="login"
          >
            Login
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

export default {
  name: 'Login',
  computed: {
    ...mapState('user', {
      loginForm: (state) => state.loginForm,
      email: (state) => state.infos.email,
      password: (state) => state.infos.password,
      feedback: (state) => state.feedback,
    }),
  },
  methods: {
    ...mapActions({ setInfos: 'user/setInfos' }),
    setEmail(value) { this.setInfos({ email: value }); },
    setPassword(value) { this.setInfos({ password: value }); },
    formClose() {
      this.$store.dispatch('user/setValue', { loginForm: false });
      // get current user
      const user = firebase.auth().currentUser;
      this.user = user;
      // {{ this.user.displayName }} ex to access to firebase auth data

      // get pseudo with user.uid from session
      if (user) {
        db.collection('users').where('user_id', '==', user.uid).get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              this.$store.dispatch('user/setInfos', { pseudo: data.pseudo });
            });
          });
      }
    },
    login() {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.formClose())
          .then(() => this.$router.push({ name: 'HomeSmoothies' }))
          .catch((err) => {
            this.setFeedback(err.message);
          });
        this.setFeedback(null);
      } else {
        this.setFeedback('Please fill in the both fields');
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

<template>
  <div class="navbar">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-row
        no-gutter
      >
        <v-col
          cols="6"
          class="d-flex justify-start"
        >
          <router-link :to="{ name: 'HomeSmoothies' }">
            <v-btn
              text
              bottom
            >
              Smoothie collection
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'HomeMap' }">
            <v-btn
              text
              bottom
            >
              Map View
            </v-btn>
          </router-link>
        </v-col>
        <v-col
          cols="6"
          class="d-flex justify-end"
        >
          <v-btn
            v-if="!user"
            text
            @click="signUpFormCall"
          >
            Sign-up
          </v-btn>
          <v-btn
            v-if="!user"
            text
            @click="loginFormCall"
          >
            Login
          </v-btn>
          <v-btn
            v-if="user"
            text
          >
            {{ this.pseudo }}
          </v-btn>
          <v-btn
            v-if="user"
            text
            @click="logOut"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapState('user', {
      pseudo: (state) => state.infos.pseudo,
    }),
  },
  mounted() {
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
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else this.user = null;
    });
  },
  methods: {
    signUpFormCall() {
      this.$store.dispatch('user/setValue', { signUpForm: true });
    },
    loginFormCall() {
      this.$store.dispatch('user/setValue', { loginForm: true });
    },
    logOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'HomeMap' }).catch(() => {});
        // we can also do like this
        // const path = '/map';
        // if (this.$route.path !== path) {
        //   this.$router.push(path);
        // }
      });
    },
  },
};
</script>

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
            text
            @click="formCall"
          >
            Sign-up
          </v-btn>
          <v-btn
            text
          >
            Login
          </v-btn>
        </v-col>
        <router-link :to="{ name: 'AddSmoothie' }">
          <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="pink"
          >
            <v-icon large>
              add
            </v-icon>
          </v-btn>
        </router-link>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>

export default {
  name: 'Navbar',
  methods: {
    formCall() {
      this.$store.dispatch('user/setValue', { loginForm: true });
    },
  },
};
</script>

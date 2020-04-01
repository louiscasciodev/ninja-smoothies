<template>
  <div class="navbar">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }">
          <v-btn
            bottom
            color="blue"
          >
            Smoothie collection
          </v-btn>
        </router-link>
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
      </div>
    </v-app-bar>
  </div>
</template>
<script>

export default {
  name: 'Navbar',
};
</script>

<template>
  <v-app>
    <p-navbar />
    <v-content>
      <router-view />
      <p-sign-up />
      <p-login />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'App',
  components: {
    'p-navbar': Navbar,
    'p-sign-up': SignUp,
    'p-login': Login,
  },
};
</script>
<style>
a {
    text-decoration: none;
}
</style>

<template>
  <v-app>
    <p-navbar />
    <v-content>
      <router-view />
      <p-sign-up />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'App',
  components: {
    'p-navbar': Navbar,
    'p-sign-up': SignUp,
  },
};
</script>
<style>
a {
    text-decoration: none;
}
</style>

<template>
  <v-app>
    <p-navbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { Navbar } from '@/components';

export default {
  name: 'App',
  components: {
    'p-navbar': Navbar,
  },
};
</script>
<style>
a {
    text-decoration: none;
}
</style>

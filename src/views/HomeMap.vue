<template>
  <p-map-view />
</template>

<script>
import MapView from '@/components/geoloc/MapView.vue';

export default {
  name: 'HomeMap',
  components: {
    'p-map-view': MapView,
  },
};
</script>

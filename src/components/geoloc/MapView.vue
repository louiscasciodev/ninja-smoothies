<template>
  <div class="map">
    <v-container fluid>
      <div
        id="map"
        class="google-map"
      />
      <v-container />
    </v-container>
  </div>
</template>
<script>

export default {
  /* eslint-disable no-undef */
  name: 'MapView',
  data() {
    return {
      lat: 48,
      lng: 2,
    };
  },
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap() {
    // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.google-map{
width: 100%;
height: 100%;
margin: 0 auto;
background: #ffffff;
position: absolute;
top: 0;
left: 0;
}
</style>

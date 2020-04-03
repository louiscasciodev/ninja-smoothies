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
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  /* eslint-disable no-undef */
  name: 'MapView',
  data() {
    return {
      lat: 40,
      lng: 20,
    };
  },
  mounted() {
    // get current user
    const user = firebase.auth().currentUser;

    // get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;

        // find the user record and then update geocoords
        if (user) {
          db.collection('users').where('user_id', '==', user.uid).get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                db.collection('users').doc(doc.id).update({
                  geolocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  },
                });
              });
            })
            .then(() => {
              this.renderMap();
            });
        }
        this.renderMap();
      }, (err) => {
        console.log(err);
        this.renderMap();
      }, { maximumAge: 60000, timout: 3000 });
    } else {
      // position center by default values
      this.renderMap();
    }
    this.renderMap();
    console.log(firebase.auth().currentUser);
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

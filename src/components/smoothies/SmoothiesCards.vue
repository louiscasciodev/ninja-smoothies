<template>
  <v-container fluid>
    <router-link
      :to="{ name: 'AddSmoothie' }"
    >
      <v-btn
        v-if="user"
        class="add-button"
        dark
        fab
        color="pink"
      >
        <v-icon large>
          add
        </v-icon>
      </v-btn>
    </router-link>
    <v-col cols="12">
      <v-row
        justify="center"
        no-gutters=""
      >
        <v-card
          v-for="smoothie in smoothies"
          :key="smoothie.id"
          hover
          min-height="200"
          class="home-card ma-3 pa-2"
        >
          <v-card-actions class="ma-0 pa-0">
            <v-spacer />
            <v-icon
              v-if="user"
              large
              @click="deleteSmoothies(smoothie.id)"
            >
              delete_outline
            </v-icon>
          </v-card-actions>
          <v-card-text>
            <p class="headline mb-3">
              {{ smoothie.title }}
            </p>
            <v-chip
              v-for="(ing, index) in smoothie.ingredients"
              :key="index"
              class="mx-2 my-2"
            >
              {{ ing }}
            </v-chip>
          </v-card-text>
          <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
            <v-btn
              v-if="user"
              absolute
              dark
              small
              fab
              bottom
              right
              color="pink"
            >
              <v-icon>
                create
              </v-icon>
            </v-btn>
          </router-link>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'SmoothiesCards',
  data() {
    return {
      user: null,
      smoothies: [],
    };
  },
  created() {
    // let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else this.user = null;
    });
    this.$store.dispatch('smoothie/clear');
    db.collection('smoothies').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
  methods: {
    deleteSmoothies(id) {
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => smoothie.id !== id);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-card{
  width: 300px;
}
.add-button{
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;
}
</style>

<template>
  <v-container fluid>
    <v-col cols="12">
      <v-row class="justify-center align-center">
        <p class="headline">
          Edit {{ title }} !
        </p>
      </v-row>
      <v-row class="justify-center align-center">
        <v-form
          ref="form"
          class="add-form"
        >
          <v-text-field
            label="Smoothie Title"
            required
            :value="title"
            @input="setTitle"
          />
          <v-text-field
            label="Grab an ingredient & press #enter"
            required
            :disabled="hs_maxIngredients()"
            :value="ing"
            @input="setIng"
            @keydown.enter.tab.prevent="hs_addIng(ing)"
          />
          <v-alert
            v-if="feedback"
            dense
            text
            type="error"
          >
            {{ feedback }}
          </v-alert>
          <div class="d-flex justify-center">
            <v-btn
              color="success"
              class="mb-4"
              @click="editSmoothie"
            >
              Update Smoothie
            </v-btn>
          </div>
          <div class="text-center">
            <v-chip
              v-for="(item, index) in ingredients"
              :key="index"
              class="mx-2 my-1"
            >
              {{ item }}
              <v-icon
                right
                @click="hs_deleteIng(index)"
              >
                backspace
              </v-icon>
            </v-chip>
          </div>
        </v-form>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import db from '@/firebase/init';
import { mapActions, mapState } from 'vuex';
import slugify from 'slugify';
import helpersSmoothie from '@/mixins/helpersSmoothie';

export default {
  name: 'EditSmoothie',
  mixins: [helpersSmoothie],
  data() {
    return {
      smoothieId: null,
    };
  },
  computed: {
    ...mapState('smoothie', {
      feedback: (state) => state.feedback,
      title: (state) => state.smoothie.title,
      ing: (state) => state.smoothie.ing,
      ingredients: (state) => state.smoothie.ingredients,
    }),
  },
  created() {
    this.$store.dispatch('smoothie/clear');
    const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const smoothie = doc.data();
        this.smoothieId = doc.id;
        this.$store.dispatch('smoothie/setSmoothie', { ...smoothie });
      });
    });
  },
  methods: {
    ...mapActions({ setSmoothie: 'smoothie/setSmoothie' }),
    setTitle(value) { this.setSmoothie({ title: value }); },
    setIng(value) { this.setSmoothie({ ing: value }); },

    editSmoothie() {
      if (this.title && this.ingredients.length >= 1) {
        const sluged = slugify(this.title, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true,
        });
        this.$store.dispatch('smoothie/setSmoothie', { slug: sluged })
          .then(() => db.collection('smoothies').doc(this.smoothieId).update({
            title: this.title,
            ingredients: this.ingredients,
            slug: sluged,
          }))
          .then(() => this.$router.push({ name: 'HomeSmoothies' }))
          .then(() => this.$store.dispatch('smoothie/clear'))
          .catch((err) => console.log(err));
      } else if (this.ingredients.length < 1) {
        const message = 'You must enter at least one ingredient';
        this.hs_setFeedback(message);
      } else {
        const message = 'You must enter a title';
        this.hs_setFeedback(message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-form{
  width: 400px;
}
</style>

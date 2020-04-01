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
            :disabled="maxIngredients()"
            :value="ing"
            @input="setIng"
            @keydown.enter.tab.prevent="addIng(ing)"
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
              @click="EditSmoothie"
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
                @click="deleteIng(index)"
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
import slugify from 'slugify';
import { mapActions, mapState } from 'vuex';
import db from '@/firebase/init';

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothieId: null,
    };
  },
  computed: {
    ...mapState({
      feedback: (state) => state.feedback,
      title: (state) => state.smoothie.title,
      ing: (state) => state.smoothie.ing,
      ingredients: (state) => state.smoothie.ingredients,
    }),
  },
  created() {
    this.$store.dispatch('clear');
    const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const smoothie = doc.data();
        this.smoothieId = doc.id;
        console.log('data', smoothie);
        console.log('id', this.smoothieId);
        this.$store.dispatch('setSmoothie', { ...smoothie });
      });
    });
  },
  methods: {
    ...mapActions({ setSmoothie: 'setSmoothie' }),
    setTitle(value) { this.setSmoothie({ title: value }); },
    setIng(value) { this.setSmoothie({ ing: value }); },

    EditSmoothie() {
      if (this.title && this.ingredients.length >= 1) {
        const sluged = slugify(this.title, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true,
        });
        this.$store.dispatch('setSmoothie', { slug: sluged })
          .then(() => db.collection('smoothies').doc(this.smoothieId).update({
            title: this.title,
            ingredients: this.ingredients,
            slug: sluged,
          }))
          .then(() => this.$router.push({ name: 'Home' }))
          .then(() => this.$store.dispatch('clear'))
          .catch((err) => console.log(err));
      } else if (this.ingredients.length < 1) {
        const message = 'You must enter at least one ingredient';
        this.setFeedback(message);
      } else {
        const message = 'You must enter a title';
        this.setFeedback(message);
      }
    },
    addIng(value) {
      if (value) {
        this.$store.dispatch('addIngredient', value);
        this.$store.dispatch('setSmoothie', { ing: null });
        if (this.ingredients.length >= 1 && this.ingredients.length < 10) {
          this.setFeedback(null);
        }
      } else {
        const message = 'You must enter a value to add an ingredient';
        this.setFeedback(message);
      }
    },
    deleteIng(index) {
      this.$store.dispatch('deleteIngredient', index);
      if (this.ingredients.length >= 1 && this.ingredients.length < 10) {
        this.setFeedback(null);
      }
    },
    maxIngredients() {
      if (this.ingredients.length >= 10) {
        const message = 'You can\'t add more than 10 ingredients';
        this.setFeedback(message);
        return true;
      }
      return false;
    },
    setFeedback(message) {
      this.$store.dispatch('setValue', { feedback: message });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-form{
  width: 400px;
}
</style>

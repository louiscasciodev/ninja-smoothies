<template>
  <v-container fluid>
    <v-col cols="12">
      <v-row class="justify-center align-center">
        <p class="headline">
          Edit {{ smoothie.title }} !
        </p>
      </v-row>
      <v-row class="justify-center align-center">
        <v-form
          ref="form"
          class="add-form"
        >
          <v-text-field
            v-model="smoothie.title"
            label="Smoothie Title"
            required
          />
          <v-text-field
            v-model="smoothie.ing"
            label="Grab an ingredient & press #enter"
            required
            :disabled="maxIngredients()"
            @keydown.enter.tab.prevent="addIng(smoothie.ing)"
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
              v-for="(item, index) in smoothie.ingredients"
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
import db from '@/firebase/init';

export default {
  name: 'EditSmoothie',
  data() {
    return {
      feedback: null,
      smoothieId: null,
      smoothie: {
        title: null,
        ingredients: [],
        ing: null,
        slug: null,
      },
    };
  },
  created() {
    const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothieId = doc.id;
      });
    });
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title && this.smoothie.ingredients.length >= 1) {
        const sluged = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('smoothies').doc(this.smoothieId).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: sluged,
        })
          .then(() => this.$router.push({ name: 'HomeSmoothies' }))
          .catch((err) => console.log(err));
      } else if (this.smoothie.ingredients.length < 1) {
        const message = 'You must enter at least one ingredient';
        this.setFeedback(message);
      } else {
        const message = 'You must enter a title';
        this.setFeedback(message);
      }
    },
    addIng(value) {
      if (value) {
        this.smoothie.ingredients.push(value);
        this.smoothie.ing = null;
        if (this.smoothie.ingredients.length >= 1 && this.smoothie.ingredients.length < 10) {
          this.setFeedback(null);
        }
      } else {
        const message = 'You must enter a value to add an ingredient';
        this.setFeedback(message);
      }
    },
    deleteIng(index) {
      this.smoothie.ingredients.splice(index, 1);
      if (this.smoothie.ingredients.length >= 1 && this.smoothie.ingredients.length < 10) {
        this.setFeedback(null);
      }
    },
    maxIngredients() {
      if (this.smoothie.ingredients.length >= 10) {
        const message = 'You can\'t add more than 10 ingredients';
        this.setFeedback(message);
        return true;
      }
      return false;
    },
    setFeedback(message) {
      this.feedback = message;
    },
  },
};
</script>
<style lang="scss" scoped>
.add-form{
  width: 400px;
}
</style>

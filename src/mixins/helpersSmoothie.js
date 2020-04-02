
export default {
  methods: {
    hs_addIng(value) {
      if (value) {
        this.$store.dispatch('smoothie/addIngredient', value);
        this.$store.dispatch('smoothie/setSmoothie', { ing: null });
        if (this.ingredients.length >= 1 && this.ingredients.length < 10) {
          this.hs_setFeedback(null);
        }
      } else {
        const message = 'You must enter a value to add an ingredient';
        this.hs_setFeedback(message);
      }
    },
    hs_deleteIng(index) {
      this.$store.dispatch('smoothie/deleteIngredient', index);
      if (this.ingredients.length >= 1 && this.ingredients.length < 10) {
        this.hs_setFeedback(null);
      }
    },
    hs_maxIngredients() {
      if (this.ingredients.length >= 10) {
        const message = 'You can\'t add more than 10 ingredients';
        this.hs_setFeedback(message);
        return true;
      }
      return false;
    },
    hs_setFeedback(message) {
      this.$store.dispatch('smoothie/setValue', { feedback: message });
    },
  },
};

<template>
  <v-row justify="center">
    <v-dialog
      v-model="loginForm"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Sign-Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Pseudo*"
                  required
                  :value="pseudo"
                  @input="setPseudo"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  :value="email"
                  @input="setEmail"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  :value="password"
                  @input="setPassword"
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            large
            color="success"
            class="mb-4 px-10"
            @click="formClose"
          >
            Sign-up
          </v-btn>
          <v-btn
            large
            class="mb-4 px-10"
            @click="formClose"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SignUp',
  computed: {
    ...mapState('user', {
      loginForm: (state) => state.loginForm,
      pseudo: (state) => state.infos.pseudo,
      email: (state) => state.infos.email,
      password: (state) => state.infos.password,
    }),
  },
  methods: {
    ...mapActions({ setInfos: 'user/setInfos' }),
    setPseudo(value) { this.setInfos({ pseudo: value }); },
    setEmail(value) { this.setInfos({ email: value }); },
    setPassword(value) { this.setInfos({ password: value }); },
    formClose() {
      this.$store.dispatch('user/setValue', { loginForm: false });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

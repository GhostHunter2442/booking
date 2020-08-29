<template>
    <div class="w-50 m-auto">
        <!-- <div class="card card-body"> -->
        <form>
            <h2 class="text-uppercase text-secondary font-weigth-bolder mb-4 ">
                Login
            </h2>

            <div class="form-group">
                <label for="email">email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    class="form-control"
                    v-model="email"
                    :class="[{ 'is-invalid': errorFor('email') }]"
                />
                <v-errors :errors="errorFor('emil')"></v-errors>
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    class="form-control"
                    v-model="password"
                    :class="[{ 'is-invalid': errorFor('password') }]"
                />
                <v-errors :errors="errorFor('password')"></v-errors>
            </div>
            <button type="submit"
            class="btn btn-primary btn-md btn-block"
            :disabled="loading"
            @click.prevent="login"
            >
             <span v-if="!loading">login</span>
                <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse"></i> login...</span
                >

            </button>
            <hr />
            <div class="text-nowrap">
                No account yet?
                <router-link :to="{ name: 'name' }" class="font=weight-bold"
                    >Regiter</router-link
                >
            </div>
            <div class="text-nowrap">
                Forgotten password?
                <router-link :to="{ name: 'name' }" class="font=weight-bold"
                    >Resetpassword</router-link
                >
            </div>
        </form>
        <!-- </div> -->
    </div>
</template>
<script>
import validatinoErrors from "./../shared/mixins/validationErrors";
import { logIn } from "./../shared/utils/auth";

export default {
    mixins: [validatinoErrors],
    data() {
        return {
            email: null,
            password: null,
            loading: false
        };
    },
    methods: {
        async login() {
            this.loading = true;
            this.errors=null;

              try {
                    await axios.get('/sanctum/csrf-cookie');
                    await axios.post('/login',{
                        email:this.email,
                        password:this.password
                    });
                    logIn();
                    this.$store.dispatch("loadUser");
                    this.$router.push({ name: "home" });// login success link to page home

              } catch (error) {

                   this.errors = error.response && error.response.data.errors;
              }

            this.loading=false;
        }
    }
};
</script>
<style scoped>
.is-invalid {
    border-color: #b22222;
    background-image: none;
}
.invalid-feedback {
    color: #b22222;
}
</style>

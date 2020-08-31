<template>
    <div class="w-50 m-auto">
        <!-- <div class="card card-body"> -->
        <form>
            <h2 class="text-uppercase text-secondary font-weigth-bolder mb-4 ">
                Register
            </h2>
   <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    class="form-control"
                    v-model="user.name"
                    :class="[{ 'is-invalid': errorFor('name') }]"
                />
                <v-errors :errors="errorFor('name')"></v-errors>
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    class="form-control"
                    v-model="user.email"
                    :class="[{ 'is-invalid': errorFor('email') }]"
                />
                <v-errors :errors="errorFor('email')"></v-errors>
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    class="form-control"
                    v-model="user.password"
                    :class="[{ 'is-invalid': errorFor('password') }]"
                />
                <v-errors :errors="errorFor('password')"></v-errors>
            </div>
                  <div class="form-group">
                <label for="password_confirmation">Comfirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Comfirm your password"
                    class="form-control"
                    v-model="user.password_confirmation"
                    :class="[{ 'is-invalid': errorFor('password_confirmation') }]"
                />
                <v-errors :errors="errorFor('password_confirmation')"></v-errors>
            </div>
            <button type="submit"
            class="btn btn-primary btn-md btn-block"
            :disabled="loading"
            @click.prevent="register"
            >
             <span v-if="!loading">Register</span>
                <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse"></i> Registering...</span
                >

            </button>
            <hr />
            <div class="text-nowrap">
                Already have an account?
                <router-link :to="{ name: 'login' }" class="font=weight-bold"
                    >Log-in</router-link
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
            user:{
                name,
                email: null,
                password: null,
                password_confirmation:null
            },

            loading: false
        };
    },
    methods: {
        async register() {
            this.loading = true;
            this.errors=null;

              try {
                  const response =  await axios.post('/register',this.user);

                     if(201==response.status){
                    logIn();
                    this.$store.dispatch("loadUser");
                    this.$router.push({ name: "home" });// login success link to page home
                     }


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

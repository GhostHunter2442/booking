<template>
    <div>
        <success v-if="success">
            Congratulation on your purchase!!
        </success>
        <div class="row" v-else>
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="first_name"
                            v-model="customer.first_name"
                            :class="[{ 'is-invalid': errorFor('customer.first_name') }]"
                        />
                         <v-errors :errors="errorFor('customer.first_name')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="last_name"
                            v-model="customer.last_name"
                            :class="[{ 'is-invalid': errorFor('customer.last_name') }]"
                        />
                         <v-errors :errors="errorFor('customer.last_name')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            name="email"
                            v-model="customer.email"
                            :class="[{ 'is-invalid': errorFor('customer.email') }]"
                        />
                         <v-errors :errors="errorFor('customer.email')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">address</label>
                        <input
                            type="text"
                            class="form-control"
                            name="street"
                            v-model="customer.street"
                            :class="[{ 'is-invalid': errorFor('customer.street') }]"
                        />
                         <v-errors :errors="errorFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">Sub District</label>
                        <input
                            type="text"
                            class="form-control"
                            name="city"
                            v-model="customer.city"
                            :class="[{ 'is-invalid': errorFor('customer.city') }]"
                        />
                         <v-errors :errors="errorFor('customer.city')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">District</label>
                        <input
                            type="text"
                            class="form-control"
                            name="country"
                            v-model="customer.country"
                            :class="[{ 'is-invalid': errorFor('customer.country') }]"
                        />
                         <v-errors :errors="errorFor('customer.country')"></v-errors>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">Province</label>
                        <input
                            type="text"
                            class="form-control"
                            name="state"
                            v-model="customer.state"
                            :class="[{ 'is-invalid': errorFor('customer.state') }]"
                        />
                         <v-errors :errors="errorFor('customer.state')"></v-errors>
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Postcode</label>
                        <input
                            type="text"
                            class="form-control"
                            name="zip"
                            v-model="customer.zip"
                            :class="[{ 'is-invalid': errorFor('customer.zip') }]"
                        />
                         <v-errors :errors="errorFor('customer.zip')"></v-errors>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button
                            type="submit"
                            class="btn btn-md btn-primary btn-block"
                            @click.prevent="book"
                            :disabled="loading"
                        >
                            Book now!
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-8" v-else>
                <!-- <div class="jumbotron jumbotron-fluid text-center"> -->
                    <!-- <h1>Empty</h1> -->
                     <div class="text-center success">

                        <i class="fas fa-calendar-times"></i>
                        <!-- <h2 class="mt-4">Empty</h2> -->
                        </div>
                <!-- </div> -->
            </div>

            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6
                        class="text-uppercase text-secondary font-weigth-bolder"
                    >
                        your cart
                    </h6>
                    <h6 class="badge badge-primary text-uppercase">
                        <span v-if="itemsInBasket"
                            >items {{ itemsInBasket }}</span
                        >
                        <span v-else>Empty</span>
                    </h6>
                </div>
                <transition-group name="fade">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div
                            class="pt-2 pb-2 border-top d-flex justify-content-between"
                        >
                            <span>
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: { id: item.bookable.id }
                                    }"
                                >
                                    {{ item.bookable.title }}
                                </router-link>
                            </span>
                            <span class="font-weight-bold">
                                ฿{{ item.price.total }}
                            </span>
                        </div>
                        <div class="pt-2 pb-2  d-flex justify-content-between">
                            <span> From {{ item.dates.from }} </span>
                            <span> To {{ item.dates.to }} </span>
                        </div>
                        <div class="pt-2 pb-2 text-right">
                            <button
                                class="btn btn-sm btn-outline-primary"
                                @click="removeFromBasket(item.bookable.id)"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import ValidationErrors from "./../shared/mixins/validationErrors";

export default {
    mixins: [ValidationErrors],
    data() {
        return {
            loading: false,
            bookingAtttempted:false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null
            }
        };
    },

    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items
        }),
        success(){
            return !this.loading && 0 === this.itemsInBasket && this.bookingAtttempted && null === this.errors;
                      //false                     0                      true                   true
        }
    },
    methods: {
        removeFromBasket(id) {
            this.$store.dispatch("removeFromBasket", id);
        },
        async book() {
            this.loading = true;
            this.bookingAtttempted=false;
            this.errors=null; // เพื่อทำการ refresh load error ใหม่
            try {
                await axios.post(`api/checkout`, {
                    customer: this.customer,
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to
                    }))
                });
                this.$store.dispatch("clearBasket");
            } catch (error) {
                this.errors = error.response && error.response.data.errors;

            }
            this.loading = false;
            this.bookingAtttempted=true;
        }
    }
};
</script>
<style scoped>
h6.badge {
    font-size: 100%;
}
a {
    color: black;
}
.is-invalid {
    border-color: #b22222;
    background-image: none;
}
.invalid-feedback {
    color: #b22222;
}
</style>


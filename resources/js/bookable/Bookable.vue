<template>
    <div class="row">
        <div class="col-md-7 pb-4">
            <div class="card ">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr />
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>Loading...</div>
                </div>
            </div>

            <review-list :bookable-id="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-5 pb-4">
            <div class="section-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="booking-form">
                                <!-- <form> -->
                                    <availabality
                                        :bookable-id="this.$route.params.id"
                                        @availability="checkPrice($event)"
                                        class="mb-4"
                                    ></availabality>
                                      <transition name="fade">
                                    <price-breakdown v-if="price"  :price="price" class="mb-4"></price-breakdown>

                                    </transition>
                                    <transition name="fade">

                                        <button
                                            class="btn btn-outline-primary btn-block"
                                            v-if="price"
                                            @click="addToBasket"
                                        >
                                            Book now
                                        </button>
                                    </transition>
                                <!-- </form> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Availabality from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState } from "vuex";
export default {
    components: {
        Availabality,
        ReviewList,
        PriceBreakdown
    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null
        };
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(resp => {
            this.bookable = resp.data.data;
            this.loading = false;
        });
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch"
        })
    },
    methods: {
        async checkPrice(hasAvailability) {
            if (!hasAvailability) {
                // if != true
                this.price = null;
                return;
            }
            try {
                this.price = (
                    await axios.get(`/api/bookables/${this.bookable.id}/price?
                    from=${this.lastSearch.from}&to=${this.lastSearch.to}`)
                ).data.data;
            } catch (err) {
                this.price = null;
            }
        },
         addToBasket(){
            this.$store.commit("addToBasket",{
                bookable :this.bookable,
                price:this.price,
                dates:this.lastSearch
            })
          }
    },

};
</script>

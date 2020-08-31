<template>
    <div class="row">
        <div class="col-md-7 pb-4">

            <!-- <div class="card "> -->
                <!-- <div class="card-body"> -->

                    <div v-if="!loading">
                          <carousel :data="data"></carousel>
                        <h2 class="mt-4">{{ bookable.title }}</h2>
                        <hr />
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>
                    <ListLoader>
                    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                    <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
                    <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
                    <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
                    <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
                    <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
                    </ListLoader>
                    </div>
                <!-- </div> -->
            <!-- </div> -->

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
                                            :disabled="inBasketAlready"
                                        >
                                            Book now
                                        </button>

                                    </transition>
                                        <button
                                            class="btn btn-outline-primary btn-block"
                                            v-if="inBasketAlready"
                                            @click="removeFromBasket"
                                        >
                                            Remove form basket
                                        </button>
                                    <div v-if="inBasketAlready" class="mt-4 text-muted warning">
                                        Seems like you've added this object to basket already.
                                        If you want to chage date, remove from the badket first
                                    </div>
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
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader
} from 'vue-content-loader';
import Availabality from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState , mapGetters } from "vuex";
 import api  from '../config';
export default {
    components: {
        Availabality,
        ReviewList,
        PriceBreakdown,
         ListLoader

    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null,
                data: [
               '<img src="'+api.BASE_IMG+'img_1.jpg">',
                '<img src="'+api.BASE_IMG+'img_2.jpg">',
             ],
        };
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(resp => {
            this.bookable = resp.data.data;
              setInterval(() => {
                                this.loading= false;
                            }, 1500);
        });
    },
  computed: {
    ...mapState({
      lastSearch: "lastSearch"
    }),
    inBasketAlready() {
      if (null === this.bookable) {
        return false;
      }

      return this.$store.getters.inBasketAlready(this.bookable.id);
    }
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
            this.$store.dispatch("addToBasket",{
                bookable :this.bookable,
                price:this.price,
                dates:this.lastSearch
            })
          },
          removeFromBasket(){
                this.$store.dispatch("removeFromBasket",this.bookable.id);
          }
    },

};
</script>

<style scoped>
.warning{
    font-size: 0.7rem;
}

</style>

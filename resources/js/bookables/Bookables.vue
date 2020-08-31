<template>
  <div>


    <!-- <div v-if="loading">Data is loading...</div> -->



      <div v-if="loading">
      <div class="row">
          <div class="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 class="mb-5">Our Rooms</h2>
          </div>
        </div>

<div class="row">
     <div class="d-flex col-12">
           <div class="col-md-4">

     <ContentLoader>
  <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
  <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
  <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
  <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />

</ContentLoader>
           </div>

           <div class="col-md-4">

     <ContentLoader>
  <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
  <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
  <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
  <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
</ContentLoader>
           </div>

           <div class="col-md-4">

     <ContentLoader>
  <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
  <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
  <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
  <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
  <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
</ContentLoader>
           </div>
     </div>
</div>






      </div>
      <div v-else>
          <div class="row">
          <div class="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 class="mb-5">Our Rooms</h2>
          </div>
        </div>
           <div class="row" >
                <div class="col-md-6 col-lg-4 mb-5 d-flex align-items-stretch"  v-for="(bookable, column) in bookables.data" :key="column">
                  <BookableListItem v-bind="bookable" ></BookableListItem>
                </div>
        </div>
<!-- <pagination :data="bookables" :limit="limit"  @pagination-change-page="showalldata"></pagination> -->
     <div class="row mt-5">
          <div class="col-md-12 text-center">

                <pagination :data="bookables" align="center" :limit="limit"  @pagination-change-page="showalldata"> </pagination>


          </div>
        </div>

    </div>
    <HotelFeatures></HotelFeatures>
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
import BookableListItem from "./BookableListItem.vue";
import HotelFeatures from "./Hotelfeatures";
export default {
    components: {
        BookableListItem,
        HotelFeatures,
         ContentLoader
    },
    data() {
        return {
            bookables: {},
            loading: false,
            columns:3,
             limit:3,

        };
    },
     mounted(){

    this.showalldata();

},

computed:{
   rows(){
       return 3;
   },

},
methods:{
    // bookablesInRow(row){
    //    return this.bookables.slice((row-1)*this.columns,row * this.columns);
    // },
    placeholdersInRow(row){
        return 12;
    },
    showalldata(page){
               this.loading = true;
                 const request =  axios.get("/api/bookables?page="+page)
                         .then(resp => {
                             this.bookables = resp.data;
                            //  this.bookables.push({title:"x",description:"X"});

                            setInterval(() => {
                                this.loading= false;
                            }, 1000);

                          });
    }
},
    created() {


    }
};
</script>

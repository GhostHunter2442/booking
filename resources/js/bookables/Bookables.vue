<template>
  <div>




      <div v-if="loading">
      <div class="row">
          <div class="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 class="mb-5">Our Rooms</h2>
          </div>
        </div>


<div class="row " v-for="row in 4" :key="'row' + row">
  <div class="col-6 col-md-4  justify-content-between  mt-5" v-for="col in 3" :key="'col' + col">
        <ContentLoader>
  <rect x="0" y="0" rx="6" ry="6" width="350" height="20" />
   <rect x="30" y="30" rx="6" ry="6" width="220" height="20" />
   <rect x="40" y="60" rx="6" ry="6" width="300" height="20" />
    <rect x="0" y="90" rx="6" ry="6" width="350" height="20" />
      <rect x="0" y="160" rx="6" ry="6" width="350" height="20" />
</ContentLoader>

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
                            }, 1500);

                          });
    }
},
    created() {


    }
};
</script>

<template>
  <div>


    <div v-if="loading">Data is loading...</div>
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

import BookableListItem from "./BookableListItem.vue";
import HotelFeatures from "./Hotelfeatures";
export default {
    components: {
        BookableListItem,
        HotelFeatures
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

// computed:{
//    rows(){
//        return this.bookables === null ? 0
//        : Math.ceil(this.bookables.length / this.columns);
//    }
// },
methods:{
    // bookablesInRow(row){
    //    return this.bookables.slice((row-1)*this.columns,row * this.columns);
    // },
    // placeholdersInRow(row){
    //     return this.columns - this.bookablesInRow(row).length;
    // }
    showalldata(page){
               this.loading = true;
                 const request =  axios.get("/api/bookables?page="+page)
                         .then(resp => {
                             this.bookables = resp.data;
                            //  this.bookables.push({title:"x",description:"X"});
                             this.loading= false;
                          });
    }
},
    created() {


    }
};
</script>

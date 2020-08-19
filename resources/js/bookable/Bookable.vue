<template>
    <div class="row">
      <div class="col-md-8 pb-4">
           <div class="card ">
          <div class="card-body">
              <div v-if="!loading">
                <h2>{{ bookable.title}}</h2>
                <hr/>
                <article>{{ bookable.description}}</article>
              </div>
              <div v-else>Loading...</div>
            </div>
          </div>

      </div>
      <div class="col-md-4 pb-4">
         <availabality></availabality>
      </div>
    </div>
</template>

<script>
import Availabality from './Availability';
 export default {
     components:{
         Availabality
     },
     data() {
         return {
             bookable:null,
             loading:false
         }
     },
     created() {
         this.loading=true;
         axios.get(`/api/bookables/${this.$route.params.id}`)
         .then(resp =>{
             this.bookable=resp.data.data;
             this.loading=false;
             });
     },
 }
</script>

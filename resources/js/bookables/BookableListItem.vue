<template>

        <div class="hotel-room text-center ">

                           <router-link class="d-block mb-0 thumbnail"
                           :to="{  name :'bookable',params:{id}}"><img :src="imgURL+main_picture" alt="Image" class="img-fluid"></router-link>
                    <div class="hotel-room-body">
                        <h3 class="heading mb-0">  <router-link :to="{  name :'bookable',params:{id}}"> {{title}}</router-link></h3>
                        <strong class="price">฿{{price}} / per night</strong>
                    </div>
        </div>



        <!-- <div class="card w-100">
            <div class="card-body">
                <router-link :to="{  name :'bookable',params:{id}}">
                  <h5 class="card-title">{{ title }}</h5>
                </router-link>

                  <P>{{ description}}</P>
            </div>
        </div> -->



</template>
<script>
import api  from '../config';
export default {
 props:{"main_picture":String,"price":Number,"title":String,"description":String,"id":Number},
 data() {
     return {
         imgURL:api.BASE_IMG
     }
 },

};

</script>

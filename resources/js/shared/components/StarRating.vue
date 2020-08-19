<template>

    <div class="d-flex">
         คะเเนนที่ได้ {{ rating}}
       <i class="fas fa-star" v-for="star in fullStars" :key="'full'+star"></i>
       <i class="fas fa-star-half-alt" v-if="halfStar"></i>
        <i class="far fa-star" v-for="star in emptyStars" :key="'empty'+star"></i>
    </div>
</template>

<script>

export default {
    props:{
        rating:Number
    },
      computed: {
        halfStar(){
            const fraction = this.rating - Math.floor(this.rating);
            console.log(fraction);
        },
        fullStars(){
            // > 4.5 = 5  stars
            // 4.3 = 4 and half
            return Math.round(this.rating);
        },
        emptyStars(){
            // if rating would be1.9 ,ceil(1.9)= 2 ,5-2 =3 ,reder 3 empty stars
            return 5 - Math.ceil(this.rating);
        }
    },
    created() {
        const number =[0.9,4.0,4.4,4.5,4.6,4.9];

        // number.forEach(n =>{
        //     console.log(`round for ${n} is ${Math.round(n)}`);
        //     console.log(`floor for ${n} is ${Math.floor(n)}`);
        //     console.log(`ceil for ${n} is ${Math.ceil(n)}`);
        //     console.log('=====================================');
        // });
    },
};
</script>

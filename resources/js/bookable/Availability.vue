<template>
    <div>
        <h4 class="text-uppercase text-secondary font-waight-bolder pb-2">
           ตรวจสอบห้องพัก
        </h4>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">เริ่มต้น</label>
                <input
                    type="text"
                    name="from"
                    class="form-control form-controll-sm"
                    placeholder="วันเริ่ม"
                    v-model="from"
                     @keyup.enter="check"

                />
            </div>

             <div class="form-group col-md-6">
                <label for="to">ถึง</label>
                <input
                    type="text"
                    name="to"
                    class="form-control form-controll-sm"
                    placeholder="ถึง"
                    v-model="to"
                    @keyup.enter="check"
                />
            </div>
        </div>
        <button class="btn btn-info btn-block" @click="check"> ตรวจสอบ</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            from:null,
            to:null
        }
    },
    methods: {
        check(){
            alert(' I will chec somting now')
        }
    },
}
</script>
<style scoped>
 label{
     font-size: 0.9rem;
     text-transform: uppercase;
     color: gray;
     font-weight: bold;
 }
</style>

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
                    :class="[{ 'is-invalid': this.errorFor('from') }]"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('from')"
                    :key="'from' + index"
                >{{error}}</div>
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
                    :class="[{ 'is-invalid': this.errorFor('to') }]"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('to')"
                    :key="'to' + index"
                >{{error}}</div>
            </div>
        </div>
        <button
            class="btn btn-info btn-block"
            @click="check"
            :disabled="loading"
        >
            ตรวจสอบ
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null
        };
    },
    methods: {
        check() {
            this.loading = true;
            this.errors = null;
            axios
                .get(
                    `/api/bookables/${this.$route.params.id}/availability?
                 from=${this.from}&to=${this.to}`
                )
                .then(response => {
                    this.status = response.status;
                })
                .catch(err => {
                    if (422 === err.response.status) {
                        this.errors = err.response.data.errors;
                    }
                    this.status = err.response.status;
                })
                .then(() => (this.loading = false));
        },
        errorFor(field) {
            return this.hasErrors && this.errors[field]
                ? this.errors[field]
                : null;
        }
    },
    computed: {
        hasErrors() {
            return 422 === this.status && this.errors != null;
        },
        hasAvailability() {
            return 200 === this.status;
        },
        noAailability() {
            return 400 === this.status;
        }
    }
};
</script>
<style scoped>
label {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bold;
}
.is-invalid {
    border-color: #b22222;
    background-image: none;
}
.invalid-feedback {
    color: #b22222;
}
</style>

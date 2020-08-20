<template>
    <!-- <div>

          <div class="card">
              <div class="card-body">
                    <h2>ตรวจสอบห้องพัก
             <span v-if="noAvailability" class="text-danger"><br>(ห้องไม่พร้อมใช้งาน)</span>
            <span v-if="hasAvailability" class="text-success"><br>(ห้องพร้อมใช้งาน)</span>
                    </h2>
                <hr/>
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
            class="btn btn-primary  text-white px-4 btn-block"
            @click="check"
            :disabled="loading"
        >
            ตรวจสอบ
        </button>
              </div>
          </div>

    </div> -->
    <div>

		<div class="section-center">
			<div class="container">
				<div class="row">

					<div class="col-md-6">
						<div class="booking-form">
							<form>
								<div class="form-group text-center">
									<span class="form-label-head">Check Availability</span>
                                      <span v-if="noAvailability" class="text-danger"><br>(ห้องไม่พร้อมใช้งาน)</span>
                                      <span v-if="hasAvailability" class="text-success"><br>(ห้องพร้อมใช้งาน)</span>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<span class="form-label">Check In</span>
											<!-- <input class="form-control" type="date" required> -->
                                                <input
                                                type="text"
                                                name="from"
                                                class="form-control "
                                                placeholder="from"
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
									</div>

								</div>
                                	<div class="row">

									<div class="col-sm-12">
										<div class="form-group">
											<span class="form-label">Check out</span>
											<!-- <input class="form-control" type="date" required> -->
                                             <input
                                                type="text"
                                                name="to"
                                                class="form-control "
                                                placeholder="to"
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
								</div>

								<div class="row">
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Rooms</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Adults</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Children</span>
											<select class="form-control">
												<option>0</option>
												<option>1</option>
												<option>2</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
								</div>
								<div class="form-btn">
									<button class="btn btn-primary  text-white px-4 btn-block"   @click="check" :disabled="loading">Check availability</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

    </div>
</template>
<script>
export default {
    props:{
        bookableId: String
    },
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
        noAvailability() {
            return 404 === this.status;
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

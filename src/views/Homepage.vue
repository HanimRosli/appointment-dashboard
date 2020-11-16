<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-10 p-5">
            <div class="row justify-content-between align-items-center">

                <h3 class="mb-0">Booking history</h3><br /><br />

                <b-button variant="success" @click="onClickAdd">Book Appointment</b-button>
            </div>
        </div>
    </div>
    <div>

        <b-container class="bv-example-row">
            <b-row class="col-12 mb-3">
                <b-col>Booking ID</b-col>
                <b-col>Date</b-col>
                <b-col>Time</b-col>
                <b-col>Service</b-col>
                <b-col>Assign To</b-col>
                <b-col>Status</b-col>
                <b-col>Edit</b-col>
                <b-col>Delete</b-col>
            </b-row>
            <b-row v-for="(book) in bookings" :key="book.id" class="col-12 mb-3">
                <b-col>{{book.id}}</b-col>
                <b-col>{{book.date}}</b-col>
                <b-col>{{book.time}}</b-col>
                <b-col>{{book.service}}</b-col>
                <b-col>{{book.assignTo}}</b-col>
                <b-col>{{book.status}}</b-col>
                <b-col>
                    <b-btn variant="danger" @click="onHandleClickDelete(book.id)">Delete</b-btn>
                </b-col>
                <b-col>
                    <b-btn variant="info" @click="onHandleClickUpdate(book)">Update</b-btn>
                </b-col>
            </b-row>
        </b-container>
    </div>

    <b-modal id="modal-add-booking" title="Add Booking" @hidden="onHandleCancel">
        <b-form>
            <div>
                <label for="example-datepicker">Date:</label>
                <b-form-datepicker id="example-datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
            </div>

            <div>
                <label for="timepicker-valid">Time:</label>
                <b-form-timepicker id="datepicker-valid" :state="true" class="mb-2" v-model="form.time" locale="en"></b-form-timepicker>
            </div>

            <b-form-group label="Service:">
                <b-form-select v-model="form.service" :options="services" value-field="serviceName" text-field="serviceName">-- Add service name --</b-form-select>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer>
            <div class="w-100">
                <b-button @click="onHandleCancel">Cancel</b-button>

                <b-button variant="primary" size="sm" class="float-right" @click="onHandleUpdate" v-if="form.id">
                    Update
                </b-button>

                <b-button variant="primary" size="sm" class="float-right" @click="onHandleConfirm" v-else>
                    Confirm
                </b-button>
            </div>
        </template>

    </b-modal>

</div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            bookings: [],
            services: [],
            form: {
                date: '',
                time: '',
                service: '',
                assignTo: 'Unassigned',
                status: 'Pending'
            }
        }
    },
    mounted() {
        this.getBooking(),
            this.getAllServices()
    },
    methods: {
        getBooking() {
            this.$http({
                    methods: 'get',
                    url: '/bookings'
                })
                .then(res => {
                    this.bookings = res.data
                })
        },
        getAllServices() {
            this.$http({
                    methods: 'get',
                    url: '/service'
                })
                .then(res => {
                    this.services = res.data
                })
        },
        onClickAdd() {
            this.$bvModal.show('modal-add-booking')
        },
        onHandleConfirm() {
            this.$http.post(
                    '/bookings',
                    this.form
                )
                .then(() => {
                    this.form = {
                        date: '',
                        time: '',
                        service: '',
                        assignTo: '',
                        status: 'Pending'
                    }
                    this.$bvModal.hide('modal-add-booking')
                    this.getBooking()
                })
        },
        OnHandleCancel() {
            this.form = {
                date: '',
                time: '',
                service: '',
                assignTo: '',
                status: 'Pending'
            }
            this.$bvModal.hide('modal-add-booking')
        },
        onHandleClickDelete(id) {
            this.$http.delete(`/bookings/${id}`)
                .then(() => {
                    this.form = {
                        date: '',
                        time: '',
                        service: '',
                        assignTo: '',
                        status: ''
                    }
                    this.$bvModal.hide('modal-add-booking')
                    this.getBooking()
                })
        },
        onHandleClickUpdate(book) {
            this.form = book
            this.$bvModal.show('modal-add-booking')
        },
        onHandleUpdate() {
            this.$http.patch(`/bookings/${this.form.id}`, this.form)
                .then(() => {
                    this.form = {
                        date: '',
                        time: '',
                        service: '',
                        assignTo: '',
                        status: ''
                    }
                    this.$bvModal.hide('modal-add-booking')
                    this.getBooking()
                })
        }
    },
};
</script>

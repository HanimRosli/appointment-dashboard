<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">Booking history</h3>
                <b-button variant="success" @click="onClickAdd">Book Appointment</b-button>
            </div>
        </div>
    </div>
    <div class="row">
        <b-card v-for="(book) in bookins" :key="book.id" :service="book.service" class="col-12 mb-3">
            {{book.date}}
            {{book.time}}

            <div>
                <b-btn variant="danger" @click="onHandleClickDelete(book.id)">Delete</b-btn>
                <b-btn variant="info" @click="onHandleClickUpdate(book)">Update</b-btn>
            </div>
        </b-card>
    </div>

    <b-modal id="modal-add-booking" title="Add Booking" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Date:">
                <b-form-input v-model="form.date" placeholder="Add date"></b-form-input>
            </b-form-group>

            <b-form-group label="Time:">
                <b-form-textarea id="textarea" v-model="form.time" placeholder="Enter time" rows="3" max-rows="6"></b-form-textarea>
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
            form: {
                date: '',
                time: '',
                service: ''
            }
        }
    },

    mounted() {
        this.getBooking()
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
                        service: ''
                    }
                    this.$bvModal.hide('modal-add-booking')
                    this.getBooking()
                })
        },

        OnHandleCancel() {
            this.form = {
                date: '',
                time: '',
                service: ''
            }
            this.$bvModal.hide('modal-add-booking')
        },

        onHandleClickDelete(id) {
            this.$http.delete(`/bookings/${id}`)
                .then(() => {
                    this.form = {
                        date: '',
                        time: '',
                        service: ''
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
                        username: '',
                        fullname: ''
                    }
                    this.$bvModal.hide('modal-add-booking')
                    this.getBooking()
                })
        }

    },
};
</script>

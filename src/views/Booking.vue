<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-10 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">List of booking</h3><br><br>
            </div>
        </div>
    </div>
    <div class="row">
        <b-card v-for="(book) in bookings" :key="book.id" :service="book.service" class="col-12 mb-3">
            {{book.id}}
            {{book.date}}
            {{book.time}}
            {{book.service}}
            {{book.assignTo}}
            {{book.status}}

            <b-btn variant="danger" @click="onHandleClickDelete(book.id)">Delete</b-btn>
            <b-btn variant="info" @click="onHandleClickUpdate(book)">Update Status</b-btn>

        </b-card>
    </div>

    <b-modal id="modal-add-booking" title="Update Status" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Assign To:">
                <b-form-select v-model="form.assignTo" :options="staffs" value-field="fullname" text-field="fullname"></b-form-select>
            </b-form-group>

            <b-form-group label="Status:">
                <b-form-select v-model="form.status" :options="status"></b-form-select>
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
            staffs: [],
            status: [
                'Pending',
                'Approved',
                'Cancelled'
            ],
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
            this.getAllStaffs()
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
        getAllStaffs() {
            this.$http({
                    methods: 'get',
                    url: '/staff'
                })
                .then(res => {
                    this.staffs = res.data
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

<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">List of Staffs</h3>
                <b-button variant="success" @click="onClickAdd">Add Staff</b-button>
            </div>
        </div>
    </div>
    <div class="row">
        <b-card v-for="(staff) in staffs" :key="staff.id" class="col-12 mb-3">
            {{staff.username}}
            {{staff.fullname}}
            {{staff.email}}
            {{staff.contact}}
            {{staff.address}}
            {{staff.position}}

            <b-btn variant="danger" @click="onHandleClickDelete(staff.id)">Delete</b-btn>
            <b-btn variant="info" @click="onHandleClickUpdate(staff)">Update</b-btn>

        </b-card>
    </div>

    <b-modal id="modal-add-staff" title="Add Staff" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Username:">
                <b-form-input v-model="form.username" placeholder="Add username"></b-form-input>
            </b-form-group>

            <b-form-group label="Fullname:">
                <b-form-input v-model="form.fullname" placeholder="Add fullname"></b-form-input>
            </b-form-group>

            <b-form-group label="Contact:">
                <b-form-input v-model="form.contact" placeholder="Add contact number"></b-form-input>
            </b-form-group>

            <b-form-group label="Email:">
                <b-form-input v-model="form.email" placeholder="Add email"></b-form-input>
            </b-form-group>

            <b-form-group label="Address:">
                <b-form-textarea id="textarea" v-model="form.address" placeholder="Enter address" rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>

            <b-form-group label="Position:">
                <b-form-select v-model="form.position" :options="position" value-field="position" text-field="position">-- Select position --</b-form-select>
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
            staffs: [],
            position: [
                'Doctor',
                'Esthetician'
            ],
            form: {
                username: '',
                fullname: '',
                contact: '',
                email: '',
                address: '',
                position: ''
            },
            options: [{
                    value: 'Doctor'
                },
                {
                    value: 'Esthetician'
                }
            ]
        }
    },

    mounted() {
        this.getStaff()
    },

    methods: {
        getStaff() {
            this.$http({
                    methods: 'get',
                    url: '/staff'
                })
                .then(res => {
                    this.staffs = res.data
                })
        },

        onClickAdd() {
            this.$bvModal.show('modal-add-staff')
        },

        onHandleConfirm() {
            this.$http.post(
                    '/staff',
                    this.form
                )
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        position: ''
                    }
                    this.$bvModal.hide('modal-add-staff')
                    this.getStaff()
                })
        },

        OnHandleCancel() {
            this.form = {
                username: '',
                fullname: '',
                contact: '',
                email: '',
                address: '',
                position: ''
            }
            this.$bvModal.hide('modal-add-staff')
        },

        onHandleClickDelete(id) {
            this.$http.delete(`/staff/${id}`)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        position: ''
                    }
                    this.$bvModal.hide('modal-add-staff')
                    this.getStaff()
                })
        },

        onHandleClickUpdate(staff) {
            this.form = staff
            this.$bvModal.show('modal-add-staff')
        },

        onHandleUpdate() {
            this.$http.patch(`/staff/${this.form.id}`, this.form)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        position: ''
                    }
                    this.$bvModal.hide('modal-add-staff')
                    this.getStaff()
                })
        }

    },
};
</script>

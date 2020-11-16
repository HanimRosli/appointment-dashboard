<template>
<div>

    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">List of Users</h3>
                <b-button variant="success" @click="onClickAdd">Add User</b-button>
            </div>
        </div>
    </div>
    <div class="row">
        <b-card v-for="(user) in users" :key="user.id" :username="user.username" class="col-12 mb-3">
            {{user.fullname}}
            {{user.email}}
            {{user.contact}}
            {{user.address}}
            {{user.skinConcern}}

            <b-btn variant="danger" @click="onHandleClickDelete(user.id)">Delete</b-btn>
            <b-btn variant="info" @click="onHandleClickUpdate(user)">Update</b-btn>

        </b-card>
    </div>

    <b-modal id="modal-add-user" title="Add User" @hidden="onHandleCancel">
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

            <b-form-group label="Skin Concern:">
                <b-form-input v-model="form.skinConcern" placeholder="Add skin concern"></b-form-input>
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
            users: [],
            form: {
                username: '',
                fullname: '',
                contact: '',
                email: '',
                address: '',
                skinConcern: ''
            }
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        getUser() {
            this.$http({
                    methods: 'get',
                    url: '/users'
                })
                .then(res => {
                    this.users = res.data
                })
        },
        onClickAdd() {
            this.$bvModal.show('modal-add-user')
        },
        onHandleConfirm() {
            this.$http.post(
                    '/users',
                    this.form
                )
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        skinConcern: ''
                    }
                    this.$bvModal.hide('modal-add-user')
                    this.getUsers()
                })
        },
        OnHandleCancel() {
            this.form = {
                username: '',
                fullname: '',
                contact: '',
                email: '',
                address: '',
                skinConcern: ''
            }
            this.$bvModal.hide('modal-add-user')
        },
        onHandleClickDelete(id) {
            this.$http.delete(`/users/${id}`)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        skinConcern: ''
                    }
                    this.$bvModal.hide('modal-add-user')
                    this.getUser()
                })
        },
        onHandleClickUpdate(user) {
            this.form = user
            this.$bvModal.show('modal-add-user')
        },
        onHandleUpdate() {
            this.$http.patch(`/users/${this.form.id}`, this.form)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        contact: '',
                        email: '',
                        address: '',
                        skinConcern: ''
                    }
                    this.$bvModal.hide('modal-add-user')
                    this.getUser()
                })
        }
    },
};
</script>

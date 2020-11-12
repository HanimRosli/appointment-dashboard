<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">List of Users</h3>
                <b-button variant="success" @click="onClickAdd">Add</b-button>
            </div>
        </div>
    </div>
    <div class="row">
        <b-card v-for="(user) in users" :key="user.id" :username="user.username" class="col-12 mb-3">
            {{user.fullname}}
            {{user.email}}
            {{user.contact}}

            <div>
                <b-btn variant="danger" @click="onHandleClickDelete(user.id)">Delete</b-btn>
                <b-btn variant="info" @click="onHandleClickUpdate(user)">Update</b-btn>
            </div>
        </b-card>
    </div>

    <b-modal id="modal-add-todo" title="Add Todo" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Username:">
                <b-form-input v-model="form.username" placeholder="Add username"></b-form-input>
            </b-form-group>

            <b-form-group label="Fullname:">
                <b-form-textarea id="textarea" v-model="form.fullname" placeholder="Enter full name" rows="3" max-rows="6"></b-form-textarea>
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
                fullname: ''
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
            this.$bvModal.show('modal-add-todo')
        },

        onHandleConfirm() {
            this.$http.post(
                    '/users',
                    this.form
                )
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: ''
                    }
                    this.$bvModal.hide('modal-add-todo')
                    this.getUsers()
                })
        },

        OnHandleCancel() {
            this.form = {
                username: '',
                fullname: ''
            }
            this.$bvModal.hide('modal-add-todo')
        },

        onHandleClickDelete(id) {
            this.$http.delete(`/users/${id}`)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: ''
                    }
                    this.$bvModal.hide('modal-add-todo')
                    this.getUser()
                })
        },

        onHandleClickUpdate(user) {
            this.form = user
            this.$bvModal.show('modal-add-todo')
        },

        onHandleUpdate() {
            this.$http.patch(`/users/${this.form.id}`, this.form)
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: ''
                    }
                    this.$bvModal.hide('modal-add-todo')
                    this.getUser()
                })
        }

    },
};
</script>

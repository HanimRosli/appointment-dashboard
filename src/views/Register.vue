<template>
<div class="register">
    <h1>Welcome to Dr Ko self-appointment system</h1>
    <h4>Please register here</h4>

    <b-form>
        <b-form-group label="Username:">
            <b-form-input v-model="form.username" placeholder="Enter Username"></b-form-input>
        </b-form-group>

        <b-form-group label="Fullname">
            <b-form-input v-model="form.fullname" placeholder="Enter Fullname"></b-form-input>
        </b-form-group>

        <b-form-group label="Contact">
            <b-form-input v-model="form.contact" placeholder="Enter Contact Number"></b-form-input>
        </b-form-group>

        <b-form-group label="Email">
            <b-form-input v-model="form.email" placeholder="Enter Email Address"></b-form-input>
        </b-form-group>

        <b-form-group label="Address">
            <b-form-textarea id="textarea" v-model="form.address" placeholder="Enter Address" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Skin Concern">
            <b-form-input v-model="form.skin_concern" placeholder="Enter Your Skin Concern"></b-form-input>
        </b-form-group>
    </b-form>

    <template>
        <div class="w-100">

            <b-button variant="primary" size="sm" class="float-left" @click="OnHandleCancel">
                Cancel
            </b-button>

            <b-button variant="success" size="sm" class="float-right" @click="onClickAdd">
                <router-link to="/homepage">Register</router-link>
            </b-button>
        </div>
    </template>

</div>
</template>

<script>
export default {
    name: "Register",

    data() {
        return {
            users: [],
            form: {
                username: '',
                fullname: '',
                email: '',
                contact: '',
                skin_concern: ''
            }
        }
    },

    mounted() {
        this.getUsers()
    },

    methods: {
        getUsers() {
            this.$http({
                    methods: 'get',
                    url: '/users'
                })
                .then(res => {
                    this.users = res.data
                })
        },

        onClickAdd() {
            this.$http.post(
                    '/users',
                    this.form
                )
                .then(() => {
                    this.form = {
                        username: '',
                        fullname: '',
                        email: '',
                        contact: '',
                        skin_concern: ''
                    }
                })
        },

        OnHandleCancel() {
            this.form = {
                username: '',
                fullname: '',
                email: '',
                contact: '',
                skin_concern: ''
            }
        }

    },
};
</script>

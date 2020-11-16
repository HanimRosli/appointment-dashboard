<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-9 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">List of Services</h3>
                <b-button variant="success" @click="onClickAdd">Add Service</b-button>
            </div>
        </div>
    </div>
    <b-container class="bv-example-row">
            <b-row class="col-12 mb-3">
                <b-col><b>Category</b></b-col>
                <b-col><b>Service Name</b></b-col>
                <b-col><b>Edit</b></b-col>
                <b-col><b>Delete</b></b-col>
                
            </b-row>
    
        <b-card v-for="(service) in services" :key="service.id" class="col-14 mb-3">
        <b-container class="bv-example-row">
    <b-row class="col-14 mb-3">
           <b-col> {{service.category}} </b-col>
            <b-col> {{service.serviceName}} </b-col>
             <b-col><b-btn variant="info" @click="onHandleClickUpdate(service)">Update</b-btn></b-col>
           <b-col> <b-btn variant="danger" @click="onHandleClickDelete(service.id)">Delete</b-btn></b-col>
           
    </b-row>
    </b-container>
        </b-card>
    
    
    </b-container>

    <b-modal id="modal-add-service" title="Add Service" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Category:">
                <b-form-input v-model="form.category" placeholder="Add category"></b-form-input>
            </b-form-group>

            <b-form-group label="Service Name:">
                <b-form-input v-model="form.serviceName" placeholder="Add service name"></b-form-input>
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
            services: [],
            form: {
                category: '',
                serviceName: ''
            }
        }
    },
    mounted() {
        this.getService()
    },
    methods: {
        getService() {
            this.$http({
                    methods: 'get',
                    url: '/service'
                })
                .then(res => {
                    this.services = res.data
                })
        },
        onClickAdd() {
            this.$bvModal.show('modal-add-service')
        },
        onHandleConfirm() {
            this.$http.post(
                    '/service',
                    this.form
                )
                .then(() => {
                    this.form = {
                        category: '',
                        serviceName: ''
                    }
                    this.$bvModal.hide('modal-add-service')
                    this.getService()
                })
        },
        OnHandleCancel() {
            this.form = {
                category: '',
                serviceName: ''
            }
            this.$bvModal.hide('modal-add-service')
        },
        onHandleClickDelete(id) {
            this.$http.delete(`/service/${id}`)
                .then(() => {
                    this.form = {
                        category: '',
                        serviceName: ''
                    }
                    this.$bvModal.hide('modal-add-service')
                    this.getService()
                })
        },
        onHandleClickUpdate(service) {
            this.form = service
            this.$bvModal.show('modal-add-service')
        },
        onHandleUpdate() {
            this.$http.patch(`/service/${this.form.id}`, this.form)
                .then(() => {
                    this.form = {
                        category: '',
                        serviceName: ''
                    }
                    this.$bvModal.hide('modal-add-service')
                    this.getService()
                })
        }
    },
};
</script>

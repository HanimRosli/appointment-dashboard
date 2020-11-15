<template>
<div class="content">
    <div>
        <b-card no-body>
            <b-tabs pills card vertical nav-wrapper-class="w-60">
                <b-tab title="Service" active>
                    <b-card-text>
                        <div class="row justify-content-md-center">
                            <div class="col-8 p-5">
                                <div class="row justify-content-between align-items-center">
                                    <h4 class="mb-0">Service for appointment</h4>
                                    <b-button variant="primary" @click="onClickAdd">Create</b-button>
                                </div>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <div class="row">
                    <b-table v-for="(service)" in services striped hover :items="services" :fields="fields"></b-table>
                </div>
                <b-tab title="Staff">
                    <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                <b-tab title="User">
                    <b-card-text>Tab contents 3</b-card-text>
                </b-tab>

            </b-tabs>
        </b-card>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Service",
    data() {
        return {
            services: [],
            fields: [{
                    key: 'servicename',
                    label: 'Service Name'
                },
                {
                    key: 'category',
                    label: 'Category'
                },
                {
                    key: 'description',
                    label: 'Description'
                },
                {
                    key: 'procedure',
                    label: 'Procedure'
                },
                {
                    key: 'comment',
                    label: 'Comment'
                }
            ]
        }

    },
    mounted() {
        this.getAllServices()
    },
    methods: {
        this.$http({
            method: 'get',
            url: '/service'
        })
        .then(res => {
            this.services = res.data
        })
    },

};
</script>

<style scoped></style>

<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">Login As</h3><br />

                <div>
                    <b-button variant="light" size="sm">
                        <router-link to="/register">User</router-link>
                    </b-button>
                </div>

                <div>
                    <b-button variant="light" size="sm">
                        <router-link to="/booking">Staff</router-link>
                    </b-button>
                </div>

                <div>
                    <b-button variant="light" size="sm">
                        <router-link to="/adminHomepage">Admin</router-link>
                    </b-button>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

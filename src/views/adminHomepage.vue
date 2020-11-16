<template>
<div>
    <div>
        <b-button variant="light" size="sm">
            <router-link to="/booking">Manage Booking</router-link>
        </b-button>
    </div>

<<<<<<< Updated upstream
    <div>
        <b-button variant="light" size="sm">
            <router-link to="/">Manage User</router-link>
        </b-button>
    </div>
=======
    <b-card overlay img-src="https://picsum.photos/900/200/?image=3" img-alt="Card Image" text-variant="white" title="Dr Ko Skin Specialist" sub-title="">

    </b-card>
    <br>
    <br>
    <div class="row justify-content-between align-items-center">
        <div class="col-12 p5">
            <b-card-group deck>
                <b-card title="Manage Booking" class="mb-2">
                    <b-card-text>
                        Manage booking appointment
                    </b-card-text>

                    <b-button href="/booking" variant="primary">Manage Booking</b-button>
                </b-card>

                <b-card title="Manage user" class="mb-2">
                    <b-card-text>
                        Manage our clients
                    </b-card-text>

                    <b-button href="http://localhost:8080/" variant="primary">Manage User</b-button>
                </b-card>

                <b-card title="Manage staff" class="mb-2">
                    <b-card-text>
                        Managing dr ko's staff
                    </b-card-text>

                    <b-button href="/staff" variant="primary">Manage Staff</b-button>
                </b-card>
>>>>>>> Stashed changes

    <div>
        <b-button variant="light" size="sm">
            <router-link to="/staff">Manage Staff</router-link>
        </b-button>
    </div>

    <div>
        <b-button variant="light" size="sm">
            <router-link to="/service">Manage Service</router-link>
        </b-button>
    </div>

</div>
</template>

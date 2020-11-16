<template>
<div>
    <b-card overlay img-src="https://picsum.photos/900/200/?image=3" img-alt="Card Image" text-variant="white" title="Explore the world-class treatments & procedures that we offer." sub-title="">
        <b-card-text>
            — Dr. Ko Skin Specialist
        </b-card-text>
        <b-card-text>
            Book now, We’d Love to Hear from You!
        </b-card-text>
    </b-card>
    <br>
    <br>
    <div class="row justify-content-between align-items-center">
        <div class="col-12 p5">
            <b-card-group deck>
                <b-card title="Book now!" class="mb-2">
                    <b-card-text>
                        Request your appointment with our skin specialist
                    </b-card-text>

                    <b-button href="/register" variant="primary">Register as User</b-button>
                </b-card>

                <b-card title="Manage request" class="mb-2">
                    <b-card-text>
                        Approving request appointment from clients
                    </b-card-text>

                    <b-button href="/booking" variant="primary">Login as Staff</b-button>
                </b-card>

                <b-card title="Manage system" class="mb-2">
                    <b-card-text>
                        Managing total management system
                    </b-card-text>

                    <b-button href="/adminHomepage" variant="primary">Login as Admin</b-button>
                </b-card>
            </b-card-group>
        </div>
    </div>

</div>
</template>

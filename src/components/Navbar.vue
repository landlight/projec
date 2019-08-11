<template>
    <nav>
        <v-app-bar class="grey" dark>
            <v-app-bar-nav-icon class="white--text" @click= "drawer=!drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-uppercase white--text">
                <span class="font-weight-light">LandLight</span>
                <span> Projects</span> 
            </v-toolbar-title>
            <!-- <v-btn text color="white">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn> -->
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="grey" dark>
            <v-layout column align-center class="black lighten-2">
                <v-flex class="mt-5">
                    <v-avatar size = "100">
                        <img src="/megumin.jpg" alt="">
                    </v-avatar>
                </v-flex>
                <p class="white--text"> LandLight Projects </p>
            </v-layout>
            <v-divider></v-divider>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-action>
                    <v-icon class="white--text">{{ link.icon }}</v-icon>
                </v-list-item-action>        
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            drawer: true,
            links: [
                {  icon: 'dashboard', text: 'Dashboard', route: '/' },
                {  icon: 'folder', text: 'Projects', route: '/project' },
                {  icon: 'book', text: 'Tasks', route: '/task' },
                {  icon: 'note', text: 'Notes', route: '/note' },
                {  icon: 'favorite', text: 'Predictions', route: '/prediction' }
            ]
        }
    }
}
</script>



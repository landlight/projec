<template>
    <nav>
        <v-toolbar app class="red lighten-1">
            <v-toolbar-side-icon class="white--text" @click = "drawer=!drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase white--text">
                <span class="font-weight-light">Kira</span>
                <span>Kira</span> 
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="white">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
        
        <v-navigation-drawer app v-model="drawer" class="blue lighten-2">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class= "white--text">{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            drawer: false,
            links: [
                {  icon: 'dashboard', text: 'Dashboard', route: '/' },
                {  icon: 'folder', text: 'Items', route: '/items' },
                {  icon: 'person', text: 'Categories', route: '/categories' },
                {  icon: 'tags', text: 'Tags', route: '/tags' },
            ]
        }
    }
}
</script>

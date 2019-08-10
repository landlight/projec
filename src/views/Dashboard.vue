<template>
    <div class="dashboard">    
        <v-container class="my-5">
          <h1 class="subheading black--text">Dashboard</h1>
          <v-layout row class="mb-3">
            <v-btn small text color="blue" @click="sortBy('title')">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">by project name</span>
            </v-btn>
            <v-btn small text color="black" @click="sortBy('status')">
              <v-icon left small>person</v-icon>
              <span class="caption text-lowercase">by status</span>
            </v-btn>
          </v-layout>

          <v-card flat class="pa-3" v-for="project in projects" :key="project.title">
            <v-layout row wrap :class="`pa-3 project ${project.status}`">
              <v-flex xs6 md4>
                <div class="caption grey--text">Project Title</div>
                <div>{{ project.title }}</div>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <div class="caption grey--tex">Role</div>
                <div>{{ project.role }}</div>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <div>
                  <v-chip :color="getColor(project.status)" class="white--text caption my-2">{{ project.status }}</v-chip>    
                </div> 
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {title: 'Zon Admin', role: 'Backend Developer (Node.js)', status: 'ongoing'},
        {title: 'Projec', role: 'Full Stack Developer', status: 'ongoing'},
        {title: 'Zon Maintenence', role: 'Backend Developer (Node.js)', status: 'complete'},    
        {title: 'Shop Admin', role: 'Full Stack Developer', status: 'todo'}
      ]
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => a[prop] < b[prop] ? -1: 1)
    },
    getColor (status) {
      if (status == 'ongoing') return 'green'
      else if (status == 'complete') return 'blue'
      else if (status == 'overdue') return 'red'
      else return 'black'
    },
  }
};
</script>

<style>
.project.complete {
  border-left: 4px solid blue;
}

.project.ongoing {
  border-left: 4px solid green;
}

.project.overdue {
  border-left: 4px solid red;
}

.project.todo {
  border-left: 4px solid black;
}

</style>
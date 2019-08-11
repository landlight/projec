<template>
    <div class="project">    
        <v-container class="my-5">
          
          <v-data-table
    :headers="headers"
    :items="projects"
    sort-by="title"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Projects</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="black" dark class="mb-2" v-on="on">New Project</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.title" label="Project Title"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap> 
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.role" label="Role"></v-text-field>
                  </v-flex>
                </v-layout>   
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="grey darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip small :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
        </v-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      projects: [],
      headers: [
        {
          text: 'Projects',
          align: 'left',
          value: 'title',
        },
        { text: 'Role', value: 'role' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        role: '',
        status: ''
      },
      defaultItem: {
        title: '',
        role: '',
        status: ''
      },
    }
  },
  computed: {
    formTitle () {
    return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  created () {
    this.initialize()
  },
  methods: {
    getColor (status) {
      if (status == 'ongoing') return 'green'
      else if (status == 'complete') return 'blue'
      else if (status == 'overdue') return 'red'
      else return 'pink'
    },
    initialize () {
      this.projects = [
        {title: 'Zon Admin', role: 'Backend Developer (Node.js)', status: 'ongoing'},
        {title: 'Projec', role: 'Full Stack Developer', status: 'ongoing'},
        {title: 'Zon Maintenence', role: 'Backend Developer (Node.js)', status: 'complete'},    
        {title: 'Shop Admin', role: 'Full Stack Developer', status: 'todo'}
      ]
    },
    editItem (item) {
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.projects.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.projects.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem)
      } else {
        this.projects.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
</style>
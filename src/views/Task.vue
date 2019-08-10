<template>
<div class="task">    
    <v-container class="my-5">
          
    <v-data-table
    :headers="headers"
    :items="tasks"
    sort-by="priority"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="black" dark class="mb-2" v-on="on">New Task</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Tasks"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.note" label="Note"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="editedItem.due"
                            label="Due Date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.due" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.priority="{ item }">
      <v-chip :color="getColor(getPriority(item.priority))" dark>{{ getPriority(item.priority) }}</v-chip>
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
      tasks: [],
      headers: [
        {
          text: 'Priority',
          align: 'left',
          value: 'priority',
        },
        { text: 'Tasks', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Note', value: 'note' },
        { text: 'Due', value: 'due' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      menu: false,
      modal: false,
      menu2: false,
      editedIndex: -1,
      editedItem: {
        priority: 3,
        name: '',
        status: '',
        note: '',
        due: new Date().toISOString().substr(0, 10),
      },
      defaultItem: {
        priority: 3,
        name: '',
        status: '',
        note: '',
        due: new Date().toISOString().substr(0, 10),
      },
    }
  },
  computed: {
    formTitle () {
    return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
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
    getColor (priority) {
      if (priority == 'High') return 'red'
      else if (priority == 'Medium') return 'green'
      else if (priority == 'Low') return 'light blue'
      else return 'black'
    },
    getPriority(priority) {
      if (priority == '1') return 'High'
      else if (priority == '2') return 'Medium'
      else if (priority == '3') return 'Low'
    }
    ,initialize () {
      this.tasks = [
        {name: 'Sprint 43', priority: '1', status: 'ongoing', note: 'must finish create reply api', due: 'never'},
        {name: 'Learn Japanese', priority: '1', status: 'ongoing', note: 'n5 exam on December 1st', due: 'December 01, 2019'},
        {name: `Finish "Projec" Project`, priority: '2', status: 'ongoing', note: 'Fun project but must be finish within a month', due: 'Obtober 31, 2019'},    
        {name: 'Learn Korean', priority: '3', status: 'ongoing', note: 'for fun', due: 'never'},
        {name: 'Learn Chinese', priority: '3', status: 'ongoing', note: 'for fun', due: 'never'},
        {name: `Learn Thai`, priority: '2', status: 'ongoing', note: 'for fun', due: 'Obtober 31, 2019'},  
      ]
    },
    editItem (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.tasks.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.tasks.splice(index, 1)
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
        Object.assign(this.tasks[this.editedIndex], this.editedItem)
      } else {
        this.tasks.push(this.editedItem)
      }
      this.close()
    },
  }
};
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
</style>

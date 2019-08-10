<template>
    <div class="note">    
        <v-container class="my-5">
          
          <v-data-table
    :headers="headers"
    :items="notes"
    sort-by="title"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Notes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="black" dark class="mb-2" v-on="on">New Note</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.title" label="Note"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.message" label="Message"></v-text-field>
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
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
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
      notes: [],
      headers: [
        {
          text: 'Notes',
          align: 'left',
          value: 'title',
        },
        { text: 'Message', value: 'message' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        message: '',
      },
      defaultItem: {
        title: '',
        message: '',
      },
    }
  },
  computed: {
    formTitle () {
    return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
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
      this.notes = [
        {title: 'Weightloss', message: 'must lose weight'},
        {title: 'Badminton', message: 'play badminton regularly'},
        {title: 'Buy badminton racket', message: 'buy racket'},
        {title: 'Buy monitor', message: 'have to buy monitor by next month'},
      ]
    },
    editItem (item) {
      this.editedIndex = this.notes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.notes.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.notes.splice(index, 1)
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
        Object.assign(this.notes[this.editedIndex], this.editedItem)
      } else {
        this.notes.push(this.editedItem)
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
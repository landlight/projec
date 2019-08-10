<template>
    <div class="note">    
      <v-container class="my-5">
        <v-data-table
        :headers="headers"
        :items="predictions"
        sort-by="title"
        class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Predictions</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="black" dark class="mb-2" v-on="on">New Prediction</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.name" label="Prediction"></v-text-field>
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
                                v-model="editedItem.date"
                                label="Due Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.date" @input="menu2 = false"></v-date-picker>
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
      predictions: [],
      headers: [
        {
          text: 'Prediction',
          align: 'left',
          value: 'name',
          sortable: false
        },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        date:  new Date().toISOString().substr(0, 10)
      },
      defaultItem: {
        title: '',
        date:  new Date().toISOString().substr(0, 10)
      },
    }
  },
  computed: {
    formTitle () {
    return this.editedIndex === -1 ? 'New Prediction' : 'Edit Prediction'
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
      this.predictions = [
        {name: 'Myanmar BTS Card', date: '10/08/2019'},
        {name: 'Liverpool Primier League Champion', date: '11/08/2019'},
        {name: 'Teleportation Device', date: '10/08/2019'},
        {name: 'Invisibility', date: '11/08/2019'},
      ]
    },
    editItem (item) {
      this.editedIndex = this.predictions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.predictions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.predictions.splice(index, 1)
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
        Object.assign(this.predictions[this.editedIndex], this.editedItem)
      } else {
        this.predictions.push(this.editedItem)
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

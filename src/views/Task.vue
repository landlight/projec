<template>
  <div class="task">
     <v-container class="my-5">
        <h1 class="subheading black--text">Tasks</h1>
        <v-data-table
          :headers="headers"
          :items="tasks"
          class="elevation-1"
        >
          <template v-slot:item.priority="{ item }">
            <v-chip :color="getColor(getPriority(item.priority))" dark>{{ getPriority(item.priority) }}</v-chip>
          </template>
        </v-data-table>
      </v-container>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {name: 'Sprint 43', priority: '1', status: 'ongoing', note: 'must finish create reply api', due: 'never'},
        {name: 'Learn Japanese', priority: '1', status: 'ongoing', note: 'n5 exam on December 1st', due: 'December 01, 2019'},
        {name: `Finish "Projec" Project`, priority: '2', status: 'ongoing', note: 'Fun project but must be finish within a month', due: 'Obtober 31, 2019'},    
        {name: 'Learn Korean', priority: '3', status: 'ongoing', note: 'for fun', due: 'never'},
        {name: 'Learn Chinese', priority: '3', status: 'ongoing', note: 'for fun', due: 'never'},
        {name: `Learn Thai`, priority: '2', status: 'ongoing', note: 'for fun', due: 'Obtober 31, 2019'},    
      ],
      headers: [
        {
          text: 'Priority',
          align: 'left',
          value: 'priority',
        },
        { text: 'Tasks', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Note', value: 'note' },
        { text: 'Due', value: 'due' }
      ]
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => a[prop] < b[prop] ? -1: 1)
    },
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
  }
};
</script>
<template>
  <div class="note">
     <v-container class="my-5">
        <h1 class="subheading black--text">Notes</h1>
        <v-data-table
          :headers="headers"
          :items="notes"
          class="elevation-2"
        >
        </v-data-table>
      </v-container>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [
        {title: 'Weightloss', message: 'must lose weight'},
        {title: 'Badminton', message: 'play badminton regularly'},
        {title: 'Buy badminton racket', message: 'buy racket'},
        {title: 'Buy monitor', message: 'have to buy monitor by next month'},
      ],
      headers: [
        {
          text: 'Note',
          align: 'left',
          value: 'title',
        },
        { text: 'Message', value: 'message' }
      ]
    }
  }
};
</script>
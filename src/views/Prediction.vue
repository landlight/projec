<template>
  <div class="prediction">
     <v-container class="my-5">
        <h1 class="subheading black--text">Predictions</h1>
        <v-data-table
          :headers="headers"
          :items="predictions"
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
      predictions: [
        {name: 'Myanmar BTS Card', date: '10/08/2019'},
        {name: 'Liverpool Primier League Champion', date: '11/08/2019'},
        {name: 'Teleportation Device', date: '10/08/2019'},
        {name: 'Invisibility', date: '11/08/2019'},
      ],
      headers: [
        {
          text: 'Prediction',
          align: 'left',
          value: 'name',
        },
        { text: 'Date', value: 'date' }
      ]
    }
  }
};
</script>
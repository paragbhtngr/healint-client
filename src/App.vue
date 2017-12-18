<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// getRecentTabData = () => {
//   // GET /someUrl
//   this.$http.get('localhost:4000/recent-tab-response').then(response => {
//     // get body data
//     this.someData = response.body;

//   }, response => {
//     // error callback
//   });
// }

// getSettingsTabData = () => {
//   // GET /someUrl
//   this.$http.get('localhost:4000/settings-tab-response').then(response => {
//     // get body data
//     this.someData = response.body;

//   }, response => {
//     // error callback
//   });
// }

export default {
  name: 'app'
  // Get data from server here and pass it to router-view
}
</script>

<style>
body {
  background-color: #5d7297;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>

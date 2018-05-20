<template>
  <div id="app">
    <div class="wrapper container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div>
          <div id="description">
          <h2><a href="/" title="to Home"></a>Losgrade questionnaire</h2>
          </div>
          <router-view></router-view>
         </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

#app .logo {
  width: 100px;
  height: 100px;
}

.list-group-item {
  cursor: pointer;
}

.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

#description {
  position: absolute;
  right: 8px;
  top: -53px;
}

#description h2 {
  margin-bottom: 0px;
}

</style>

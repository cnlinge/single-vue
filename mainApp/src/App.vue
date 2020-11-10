<template>
  <div>
    <div>
      <div @click="skip(1)">子应用1</div>
      <div @click="skip(2)">子应用2</div>
    </div>
    <div>--------------------------</div>
    <div id="child1"></div>
    <div id="child2"></div>
  </div>
</template>
<script>
import { navigateToUrl } from 'single-spa';
export default {
  name: 'App',
  methods: {
    skip(type) {
      if (type === 1) {
        navigateToUrl("/child1-app");
      }
        if (type === 2) {
        navigateToUrl("/child2-app");
      }

      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

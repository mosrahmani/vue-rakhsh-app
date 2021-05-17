<template>
  <div id="app">
    <div class="container px-3 d-flex justify-content-center">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <brutalHeader />
    <div class="app-main-page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import brutalHeader from '@/components/header'

export default {
  name: 'app',
  components: {brutalHeader}
}

</script>

<style lang="scss">
#app {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
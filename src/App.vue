<template>
  <div id="app" class="background">
    <brutalHeader />
    <div class="app-main-page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import brutalHeader from '@/components/header'
import { defineComponent } from 'vue';

export default defineComponent(
  {
  name: 'app',
  components: {brutalHeader},
  setup() {
    document.title = 'BrutalITSM'
  }
}
) 

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
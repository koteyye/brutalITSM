<template>
      <div id="app" class="background">
        <div v-if="isNotAuth">
        <brutalHeader />
        </div>
        <div class="app-main-page">
          <router-view/>
        </div>
        <div class="background"/>
      </div>
</template>

<script>
import brutalHeader from '@/components/header'
import {computed, defineComponent} from 'vue';
import {useRoute} from "vue-router";
import {RoutesNames} from "@/shared";

export default defineComponent(
  {
  name: 'app',
  components: {brutalHeader},
  setup() {
    document.title = 'BrutalITSM'
    const route = useRoute()
    const isNotAuth = computed(() => route.name !== RoutesNames.Auth)
    return {isNotAuth}
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

.background {
  position: fixed;
  top: 0;
  left: 0;
}

</style>
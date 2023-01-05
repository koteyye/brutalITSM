<template>
  <div class="text">{{newscontent}}</div>
</template>

<script>
import {defineComponent, render, ref} from "vue";

export default defineComponent( {
  name: "brutalNewsContent",
  props: {
    newscontent: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  setup(props){
    const content = ref(null)
    function renderContent(props) {
      content.value = props.content
      console.log(content.value)
    }
  return {
      renderContent
  }
  }
})
</script>

<style scoped>

</style>
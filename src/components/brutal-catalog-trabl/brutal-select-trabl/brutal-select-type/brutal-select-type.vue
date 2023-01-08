<template>
  <div class="itemrow select-type borderSelect" @click="ClickOnType">{{trablType.trablTypeName}}</div>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "brutalSelectType",
  props: {
    trablType: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['typeClick'],
  setup(props, { emit }) {
     function ClickOnType() {
      emit('typeClick', props.trablType)
    }
    return {
      ClickOnType
    }
  }
})
</script>

<style lang="scss" scoped>

.select-type {
  display: grid;
}

</style>
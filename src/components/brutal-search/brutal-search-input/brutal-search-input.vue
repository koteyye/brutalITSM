<template>
  <div class="brutal-search-input">
    <input
        type="text"
        placeholder="Вводи пользака"
        class="search-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >

  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "brutalSearchInput",
  props: {
    modelValue: String,
    default(){
      return ''
    }
  },
  emits: ['update:modelValue'],
  setup(props) {

  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main';

  .search-input {
    border-radius: $radius*3;
    padding-left: 20px;
    flex-basis: 50%;
    font-family: KistyCC;
    font-size: 24px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 447px;
    background-color: $--color-apsidgray;
    border-bottom: none;
    z-index: 1;
    &::placeholder {
      color: #bcc0bc;
    }
  }
</style>
<template>
  <div class="brutal-search-result"
       v-show="result.length !== 0"
  >
    <ul>
      <li
          class="cursor-pointer"
          v-for="(values, index) in result"
          :key="index"
          @click="handleClickResult(values)"
      >{{values.name}}</li>
    </ul>
  </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  name: "brutalSearchResult",
  props: {
    result: {
      type: Array,
      default() {
        return []
      }
    },
  },
  emits: ['values'],
  setup(props, {emit}) {
    function handleClickResult(value) {
      emit('values', value)
    }
    return {
      handleClickResult
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main';
.brutal-search-result {
  position: absolute;
  top: 38px;
  left: 0;
  width: 100%;
  border-radius: $radius*3;
  background-color: $--color-apsidgray;
  border:  solid 1px $--color-white;
  border-top: none;
}

li {
  user-select: none;

  &:hover {
    background-color: $--color-verygray;
  }
}

ul {
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  line-height: 50px;
  font-family: MorningBreeze-Light;
  font-size: 20px;
  letter-spacing: 3px;
  text-align: left;
}




</style>
<template>
  <div class="brutal-search-result"
       v-if="result.length!==0"
  >
    <ul>
      <li
          v-for="(user, index) in result"
          :key="index"
      >{{user.name}}</li>
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
    }
  },
  setup(props) {
    console.log(props.result)
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
  padding-left: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 50px;
}




</style>
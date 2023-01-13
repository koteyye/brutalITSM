<template>
  <div class="brutal-search-input">
    <input
        v-if="emptySelected"
        type="text"
        placeholder="Вводи пользака"
        class="search-input"
        :value="query"
        @input="$emit('update:query', $event.target.value)"
    >
    <div v-else class="search-input__selected">
      {{selectedValue}}
      <div class="krestik search-input__selected-icon">
        <fa  icon="fa-solid fa-xmark" @click="clearSelected"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "brutalSearchInput",
  props: {
    query: String,
    default(){
      return ''
    },
    selectedValue: {
      type: Object,
      default: null
    }
  },
  emits: ['update:query', 'update:selectedValue'],
  setup(props, {emit}) {
    const emptySelected = computed(() => props.selectedValue === null)
    function clearSelected() {
      emit('update:selectedValue', null)
    }

    return {
      emptySelected,
      clearSelected
    }
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
  height: 32px;
  z-index: 1;
  &::placeholder {
    color: #bcc0bc;
  }
}

.search-input__selected {
  display: flex;
  justify-content: space-between;
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
}

.search-input__selected-icon {
  margin-right: 20px;
  cursor: pointer;
}
</style>

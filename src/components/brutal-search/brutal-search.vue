<template>
  <div class="brutal-search">
    <div class="input1">
      <brutal-search-input
          v-model:query="query"
          v-model:selected-value="selectedValue"
      />
    </div>
    <div class="result1">
      <brutal-search-result
          :result="searchResult"
          @values="onSelectedValue"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from "vue";
import brutalSearchResult from "@/components/brutal-search/brutal-search-result/brutal-search-result.vue";
import BrutalSearchInput from "@/components/brutal-search/brutal-search-input/brutal-search-input.vue";

export default defineComponent({
  name: "BrutalSearch",
  components: {BrutalSearchInput, brutalSearchResult},
  props: {
    searchResult: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:search-result','SearchRequest', 'selected'],
  setup(props, {emit}) {
    const query = ref('')
    const isSearchInputFocused = false
    const selectedValue = ref(null)
    const Selected = ref(false)
    const searchResultTrue = ref([])
    watch( ()=> query.value,
        () => search()
    )
    function search() {
      emit('SearchRequest', query.value)
    }
    watch(() => props.searchResult,
        () => writeResult())
    function writeResult() {
      searchResultTrue.value = props.searchResult
    }
    function clearQuery() {
      query.value = ''
    }
    function onSelectedValue(values) {
      selectedValue.value = values.name
      emit('update:search-result', [])
      clearQuery()
    }
    function clearSelected() {
      selectedValue.value = null
      Selected.value = false
      emit('update:search-result', [])
    }
    return {
      query, isSearchInputFocused, onSelectedValue, selectedValue, Selected, clearSelected
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';
.brutal-search {
  position: relative;
  display: flex;
  width: 100%;

}
.input1 {
  z-index: 2;
}
.result1 {
  z-index: 1;
}
</style>
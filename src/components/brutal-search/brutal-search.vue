<template>
  <div class="brutal-search">
    <div class="input1">
     <brutal-search-input
         v-show="Selected !== true"
         v-model.trim="query"
     />
    </div>
    <div class="brutal-search__selectedResult"
         v-show="Selected">
      {{Value}}
      <div class="krestik">
        <fa  icon="fa-solid fa-xmark" @click="clearSelected"/>
      </div>
    </div>
    <div class="result1">
      <brutal-search-result
          :result="searchResult"
          @values="selectedValue"/>
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
  emits: ['SearchRequest', 'selected'],
  setup(props, {emit}) {
    const query = ref('')

    const isSearchInputFocused = false

    const Value = ref(null)
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

    function selectedValue(values) {
      Value.value = values.name
      Selected.value = true
      console.log(Selected.value)
      emit('selected', Selected.value)
      clearQuery()
    }

    function clearSelected() {
      Value.value = null
      Selected.value = false
      emit('selected', Selected.value)
    }

    return {
      query, isSearchInputFocused, selectedValue, Value, Selected, clearSelected
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

    &__selectedResult {
      display: flex;
      border-radius: $radius*3;
      padding-left: 20px;
      font-family: KistyCC;
      font-size: 24px;
      padding-top: 5px;
      padding-bottom: 5px;
      width: 433px;
      background-color: $--color-apsidgray;
      z-index: 1;
      text-align: left;
      justify-content: space-between;
      padding-right: 20px;
      height: 30px;
    }
  }



.input1 {
  z-index: 2;
}
.result1 {
  z-index: 1;
}
</style>
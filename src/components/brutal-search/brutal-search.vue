<template>
  <div class="brutal-search">
    <div class="input1">
      <brutal-search-input
          v-model:query="searchParam.query"
          v-model:selected-value="selectedValue"
          :place-holder-text="placeholderText"
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
import {defineComponent, reactive, ref, watch} from "vue";
import brutalSearchResult from "@/components/brutal-search/brutal-search-result/brutal-search-result.vue";
import BrutalSearchInput from "@/components/brutal-search/brutal-search-input/brutal-search-input.vue";
import {useSearch} from "@/use/search";

export default defineComponent({
  name: "BrutalSearch",
  components: {BrutalSearchInput, brutalSearchResult},
  props: {
    searchOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    searchResult: {
      type: Array,
      default() {
        return []
      }
    },
    placeholderText: {
      type: String,
      default() {
        return ''
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
    const searchResult = []
    const errMessage = ''


    const searchParam = ref({
      service: props.searchOptions.service,
      searchObject: props.searchOptions.searchObject,
      query: query.value
    })

    watch( ()=> searchParam.value.query,
        async () => {
          const {result, err} = await useSearch(searchParam)
          writeResult(result, err)
        }
    )

    async function getResult(result, err) {
      searchResult.value = result.value
      errMessage.value = err.value
    }
    console.log(searchResult.value)
    console.log(errMessage.value)


    function showResult(result) {
      result.value = result
      console.log(result)
    }



    watch(() => props.searchResult,
        () => writeResult())
    function writeResult(searchResult) {
      searchResultTrue.value = searchResult
      console.log(searchResultTrue.value)
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
      searchParam,
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
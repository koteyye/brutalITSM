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
    placeholderText: {
      type: String,
      default() {
        return ''
      }
    },
    selectedVal: {
      type: String,
      default() {
        return ''
      }
    }
  },
  emits: ['update:selectedVal'],
  setup(props, {emit}) {
    const isSearchInputFocused = false
    const selectedValue = ref('')
    const selected = ref(false)
    const searchResult = ref([])
    const errMessage = ref('')


    const searchParam = ref({
      service: props.searchOptions.service,
      searchObject: props.searchOptions.searchObject,
      query: ''
    })

    watch( ()=> searchParam.value.query,
        async () => {
          if (searchParam.value.query !== '') {
            const {result, err} = await useSearch(searchParam)
            console.log(searchParam)
            getResult(result, err)
          }
        }
    )

    function getResult(result, err) {
      searchResult.value = result.value
      console.log(searchResult.value)
      if (err === '') {errMessage.value = err}
    }

    function clearQuery() {
      searchParam.value.query = ''
    }
    function onSelectedValue(values) {
      selectedValue.value = values.name
      searchResult.value = []
      emit('update:selectedVal', values[`${props.searchOptions.resultField}`]) //Как тут указать, что мне нужно название поля из props.searchOptions.resultField ?
      clearQuery()
    }
    function clearSelected() {
      selectedValue.value = ''
      selected.value = false
    }
    return {
      searchParam,
      searchResult,
      isSearchInputFocused, onSelectedValue, selectedValue, selected, clearSelected
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
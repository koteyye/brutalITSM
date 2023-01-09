<template>
  <div class="brutal-search">
    <div class="input1">
     <brutal-search-input
         v-model.trim="query"
     />
    </div>
    <div class="selectedResult">

    </div>
    <div class="result1">
      <brutal-search-result
          :result="searchResult"
      />
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from "vue";
import brutalSearchInput from "@/components/brutal-search/brutal-search-input";
import brutalSearchResult from "@/components/brutal-search/brutal-serach-result/brutal-search-result.vue";
import BrutalSearchInput from "@/components/brutal-search/brutal-search-input/brutal-search-input.vue";
import {baseUrl} from "@/shared/path-names";

export default defineComponent({
  name: "BrutalSearch",
  components: {BrutalSearchInput, brutalSearchResult},
  setup() {
    const query = ref('')
    const searchResult = ref([])

    const isSearchInputFocused = false

    watch( ()=> query.value,
        async () => await search()
    )

    async function search() {
      const response = await fetch (`${baseUrl}/users?name_like=${query.value}`)
      searchResult.value = await response.json()
      if(query.value === '') {
        clearSearchResult()
      }
    }

    function clearSearchResult() {
      searchResult.value = ''
    }

    return {
      searchResult, query, isSearchInputFocused
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
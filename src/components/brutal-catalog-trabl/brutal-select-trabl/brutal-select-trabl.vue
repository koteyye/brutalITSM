<template>
  <div class="head">
    <div class="logoandtext">
      <div class="service-logo">
        <img :src="logo" alt="serviceLogo" width="100" height="112">
      </div>
      <div class="text serivce-text">Выберите категорию и тип трабла</div>
    </div>
  </div>
  <div class="brutal-select-trabl">
    <div class="colomns-service text">
      <div class="select-items service"
           v-for="(service, serviceId) in catalog"
           :key="serviceId">
        <div class="itemrow select-items category"
             v-for="(category, categoryId) in service.categories"
             :key="categoryId">
          <div class="select-items__selectCategory borderSelect cursor-pointer" @click="showTypeCategory(categoryId, index)">{{category.categoryName}}</div>
        </div>
      </div>
      <div class="select-items__selectType type cursor-pointer"
           v-if="categorySelected">
        <brutal-select-type
            v-for="(trablType, index) in types"
            :key="index"
            :trablType="trablType" @typeClick="showType"/>
      </div>
      <div v-else class="type"> </div>
      <div class="select-items typeItem"
           v-if="typeSelected">
        <brutal-type-item
          v-bind:typeItem="typeItem"
        />
      </div>
      <div v-else class="typeItem"> </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {baseUrl} from "@/shared/path-names";
import brutalSelectType from "@/components/brutal-catalog-trabl/brutal-select-trabl/brutal-select-type/brutal-select-type.vue";
import brutalTypeItem from "@/components/brutal-catalog-trabl/brutal-select-trabl/brutal-type-item";

export default defineComponent({
  name: "brutalSelectTrabl",
  components: {brutalSelectType, brutalTypeItem},
  setup(){
    const catalog = ref(null)
    const image = ref([])
    const route = useRoute()
    const logo = ref('')
    const categorySelected = ref(false)
    const typeSelected = ref(false)
    const types = ref(null)
    const typeItem = ref(null)


    onMounted(async()=>await getCatalogTrabl())

    async function getCatalogTrabl() {
      const response = await fetch(`${baseUrl}/catalogTrabl?serviceId=${route.params.id}`)
      catalog.value = await response.json()
      image.value = catalog.value[0].image
      serviceLogo(image)
    }

    function serviceLogo(image) {
      logo.value = `/image/${image.value}`
      return logo
    }


    function showTypeCategory(index) {
      categorySelected.value = true
      let categories = catalog.value[0].categories[index]
      types.value = categories.trablType
    }

    function showType(typeObject) {
      typeSelected.value = true
      typeItem.value = typeObject
    }

    return {
      catalog, logo, showTypeCategory, categorySelected, types, showType, typeSelected, typeItem
    }

  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.head {
  display: flex;
}

.service-logo {
  margin-left: 20px;
}

.logoandtext {
  display: flex;
  top: 130px;
  left: 0;
  width: 100%;
}

.colomns-service {
  display: flex;
  justify-content: center;
  text-align: center;
}


.text {
  font-size: 36px;
  margin-top: 30px
}

.serivce-text {
  position: fixed;
  width: 100%;
  text-align: center;
}

.category {
  flex-basis: 30%;
  max-width: 320px;
}
.type {
  flex-basis: 30%;
  max-width: 320px;
  margin-left: 100px;
  margin-right: 100px;
}

.typeItem {
  flex-basis: 40%;
  max-width: 460px;
}

.itemrow {
  font-size: 24px;
  margin-top: 30px;
}

.select-items {
  font-size: 24px;
  margin-top: 53px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.borderSelect {
  padding: 10px;
  &:hover {
    text-decoration: none;
    border: solid 1px $--color-apsidgray;
    border-radius: $radius*2;
    border-style: groove;
    padding-right: 5px;
  }
}

</style>
<template>
  <div class="head">
    <div class="service-logo">
      <img :src="logo" alt="serviceLogo" width="100" height="112">
    </div>
    <div class="text serivce-text">Выберите категорию</div>
  </div>
  <div class="brutal-select-trabl">
    <div class="colomns-service text">
      <div class="select-items__service"
           v-for="(service, serviceId) in catalog"
           :key="serviceId">
        <div class="select-items__category"
             v-for="(category, categoryId) in service.categories"
             :key="categoryId">
          <div class="select-items__selectCategory cursor-pointer">{{category.categoryName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {baseUrl} from "@/shared/path-names";

export default defineComponent({
  name: "brutalSelectTrabl",
  setup(){
    const catalog = ref(null)
    const image = ref([])
    const route = useRoute()
    const logo = ref('')


    onMounted(async()=>await getCatalogTrabl())

    async function getCatalogTrabl() {
      const response = await fetch(`${baseUrl}/catalogTrabl?serviceId=${route.params.id}`)
      catalog.value = await response.json()
      console.log(catalog.value)
      image.value = catalog.value[0].image
      serviceLogo(image)
    }

    function serviceLogo(image) {
      logo.value = `/image/${image.value}`
      return logo
    }

    return {
      catalog, logo
    }

  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.head {
  display: flex;
  margin-left: 30px;
}

.colomns-service {
  display: flex;
  flex-basis: 100/3;
}

.text {
  font-size: 36px;
  margin-top: 30px
}

.serivce-text {
  margin-left: 35%;
}

.select-items__selectCategory {
  font-size: 24px;
  margin-top: 53px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    text-decoration: none;
    border: solid 1px $--color-apsidgray;
    border-radius: $radius*2;
    border-style: groove;
    padding-right: 10px;

  }
}


</style>
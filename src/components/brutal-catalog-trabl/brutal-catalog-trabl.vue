<template>
  <div class="text brutal-catalog">Выберите сервис</div>
  <div class="services">
    <brutal-select-service
    v-for="(service, serviceId) in catalog"
    :key="serviceId"
    :service="service"/>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {baseUrl} from "@/shared/path-names";
import brutalSelectService from "@/components/brutal-catalog-trabl/brutal-select-service";

export default defineComponent( {
  name: "brutalCatalogTrabl",
  components: {brutalSelectService},
  setup(){
    const catalog = ref(null)



    onMounted(async()=>await getCatalogTrabl())

    async function getCatalogTrabl() {
      const response = await fetch(`${baseUrl}/catalogTrabl`)
      catalog.value = await response.json()
      console.log(catalog)
    }

    const serviceLogo = computed(() => `/image/${catalog.value.image}`)

    return {
      catalog, serviceLogo
    }

  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.brutal-catalog {
  margin-top: 30px;
  text-align: center;
  font-size: 36px;
}

.services {
  display: flex;
  padding: 30px 80px;
  justify-content: center;

}


</style>
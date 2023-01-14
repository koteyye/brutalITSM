<template>
      <div class="select-service"
           :class="{'cursor-pointer' : service.categories.length!==0}"
           @click="serviceClick"

      >
        <div class="servicelogo">
          <img :src="serviceLogo" alt="serviceLogo" width="300" height="337">
        </div>
        <div class="select-service__text"
             :class="{'select-service__nonService': service.categories.length===0}"
        >
          {{service.categories.length!==0 ? service.serviceDescription : `${service.serviceDescription} В настоящий момент недоступен`
          }}
        </div>
      </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useRouter} from "vue-router";
import {RoutesNames} from "@/shared";

export default defineComponent({
  name: "brutalSelectService",
  props: {
    service: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const serviceLogo = computed(()=> `/image/${props.service.image}`)
    const router = useRouter()

    function serviceClick() {
      if(props.service.categories.length !== 0) {
        router.push({name: RoutesNames.ServiceItem, params: {id: props.service.serviceId}})
      }
    }

    return {
      serviceLogo, serviceClick
    }
  }
})
</script>

<style lang="scss" scoped>

@import '../../../assets/styles/main.scss';

.select-service {
  max-width: 300px;
  transition: color 1s;
  margin-right: 100px;
  margin-left: 100px;
  &:hover {
    color: $--color-text;
    font-family: KistyCC;
    opacity: 100;
  }
  &__text {
    font-family: KistyCC;
    font-size: 30px;
    text-align: center;
    color: $--color-apsidgray;
  }
  &__nonService {
    margin-top: 30px;
    text-align: center;
    font-family: KistyCC;
    color: $--color-apsidgray;
    &:hover {
      color: $--color-huy
    }
  }
}


</style>
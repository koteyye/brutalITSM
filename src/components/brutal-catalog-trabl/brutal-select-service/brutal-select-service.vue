<template>
    <div v-if="service.categories.length!==0">
      <div class="select-service cursor-pointer">
        <div class="servicelogo">
          <img :src="serviceLogo" alt="serviceLogo" width="300" height="337">
        </div>
        <div class="select-service__text">
          {{service.serviceDescription}}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="select-service">
        <div class="servicelogo">
          <img :src="serviceLogo" alt="serviceLogo" width="300" height="337">
        </div>
        <div class="select-service__text">
          {{service.serviceDescription}}
        </div>
        <div class="select-service__nonService">В настоящий момент недоступен!</div>
      </div>
    </div>
</template>

<script>
import {computed, defineComponent} from "vue";

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

    return {
      serviceLogo
    }
  }
})
</script>

<style lang="scss" scoped>

@import '../../../assets/styles/main.scss';

.select-service {
  max-width: 300px;
  transition: color 1s;
  &:hover {
    color: $--color-apsidgray;
    font-family: KistyCC;
  }
  &__text {
    font-family: KistyCC;
    font-size: 30px;
    text-align: center;
  }
  &__nonService {
    margin-top: 30px;
    font-size: 50px;
    text-align: center;
    font-family: KistyCC;
  }
}


</style>
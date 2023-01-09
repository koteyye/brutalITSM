<template>
  <div class="itemrow typeItem">
    <div class="typeItem__name">{{typeItem.trablTypeName}}</div>
    <div class="typeItem__desc">{{typeItem.trablTypeDiscription }}</div>
    <brutal-button class="typeItem__btn" size="large" label="Я тупой имбецил, неспособный решить проблему. Оформить трабл" @click="createTrabl"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {RoutesNames} from "@/shared";
import brutalButton from "@/components/button/brutal-button.vue";
import {v4 as uuid4} from 'uuid';
import {useStore} from "vuex";
import {useLocalStorage} from "@vueuse/core";

export default defineComponent({
  name: "brutalTypeItem",
  components: {brutalButton},
  props: {
    typeItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const typeId = useLocalStorage('TrablTypeId', '')
    const typeName = useLocalStorage('TrablTypeName', '')
    const needPCNumber = useLocalStorage('needPC', '')

    function createTrabl() {
      store.dispatch('setSelectTypeTrabl', props.typeItem)
      typeId.value = props.typeItem.trablTypeId
      typeName.value = props.typeItem.trablTypeName
      needPCNumber.value = props.typeItem.needPCNumber
      const id = uuid4(0x10)
      router.push({name: RoutesNames.CreateTrabl, params: {id: id}})
    }

    return {
      createTrabl
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/main.scss';
.typeItem__btn {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  position: absolute;
  bottom: 0;
}

.typeItem {
  border: solid 1px $--color-apsidgray;
  border-radius: $radius*2;
  padding: 20px;
  padding-bottom: 400px;
  position: absolute;
  margin-right: 20px;
  position: relative;
  top: -50px;
  height: min(500px);
}
</style>
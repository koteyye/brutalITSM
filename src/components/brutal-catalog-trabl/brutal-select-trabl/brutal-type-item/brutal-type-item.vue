<template>
  <div class="itemrow typeItem">
    <div class="typeItem__name">{{typeItem.trablTypeName}}</div>
    <div class="typeItem__desc">{{typeItem.trablTypeDiscription }}</div>
    <brutal-button class="typeItem__btn" size="large" label="Я тупой имбецил, неспособный решить проблему. Оформить трабл"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {RoutesNames} from "@/shared";
import brutalButton from "@/components/button/brutal-button.vue";

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
    console.log(props.typeItem)
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
<template>
  <div class="brutal-admin">
    <div class="brutal-admin__left-menu">
      <div class="left-menu__title">
        <span>Меню</span>
      </div>
      <div class="left-menu__items">
        <span class="left-menu__item cursor-pointer">Пользователи</span>
        <span class="left-menu__item cursor-pointer">Создать пользователя</span>
      </div>
    </div>
    <div class="brutal-admin__work-area">123</div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "brutal-admin-panel",
  setup() {
    document.title = 'brutalITSM-admin-panel'
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.brutal-admin {
  margin-top: 40px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  height: 100%;
  &__left-menu {
    flex-basis: 20%;
    background-color: rgba(#d1faff, 0.5);
    border-radius: $radius*3;
  }
  &__work-area {
    position: relative;
    flex-basis: 80%;
    background-color: rgba(#d1faff, 0.5);
    border-radius: $radius*3;
    left: 5px;
  }
}

.left-menu {
  &__title {
    text-align: center;
    color: $--color-text;
    font-family: MorningBreeze-Bold;
    font-size: 30px;
    letter-spacing: 3px;
  }
  &__items {
    display: grid;
  }
  &__item {
    padding: 10px;
    font-family: "MornningBreeze";
    font-size: 25px;
    &:hover {
      text-decoration: none;
      background-color: rgba(#21a4e5, 0.5);
      border-radius: $radius*3;
    }
  }
}


</style>
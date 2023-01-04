<template>
  <div class="brutalITSM justify-space-between align-center">
    <div clas="brutalITSM__header">
      <div class="brutalITSM__logo cursor-pointer" @click="handleLogoClick">
        <img src="../../assets/image/logo.png" alt="Говнолого" height="50" width="310">
        <span class="brutalITSM__title">Brutal ITSM</span>
      </div>
    </div>
    <div class="brutalITSM__menu">
      <div class="title cursor-pointer myrequest">Мои траблы</div>
      <div class="title cursor-pointer stukach">Каталог траблов</div>
      <div class="title cursor-pointer otziv">Анонимные отзывы обо мне от исполнителей</div>
      <div class="title cursor-pointer reiting">АнтиРейтинг</div>
      <div class="cursor-pointer nahui">
        <div class="nahui">
          <brutal-button icon="fa-solid fa-person-walking-dashed-line-arrow-right"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import brutalButton from "@/components/button/brutal-button.vue";

export default {
  name: "brutalHeader",
  components: {brutalButton}
}
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

.brutalITSM {
  margin-top: 5px;
  padding: 10px 25px;
  height: 100px;
  position: sticky;
  top: 0;
  display: flex;
  background: $--color-headerbg;

  &__logo {
    display: grid;
  }

  &__title {
    color: $--color-text;
    font-family: Faceless;
    font-size: 30px;
    letter-spacing: 10px;
    text-align: center;
  }

  &__menu {
    display: flex;
    margin-left: 1px;

  }
}

.nahui {
  margin-left: 10px;
  position: sticky;
  padding: 5px 2px;
}

.title {
  color: $--color-text;
  font-family: KistyCC;
  font-size: 23px;
  letter-spacing: 3px;
  padding: 10px;
  text-align: center;
  margin: auto 20px;
  &:hover {
    text-decoration: none;
    color: $--color-apsidgray;
    border: solid 1px $--color-apsidgray;
    border-radius: $radius*2;
    border-style: groove;

  }
}

.button-btn {
  margin: auto;
}



</style>
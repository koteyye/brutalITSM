<template>
  <div class="brutalITSM justify-space-between align-center">
    <div clas="brutalITSM__header">
      <div class="brutalITSM__logo cursor-pointer" @click="handleLogoClick">
        <img src="../../assets/image/logo.png" alt="Говнолого" height="50" width="310">
        <span class="brutalITSM__title">Brutal ITSM</span>
      </div>
    </div>
    <div class="brutalITSM__menu">
      <div class="title cursor-pointer myrequest" @click="handleTrabls">Мои траблы</div>
      <div class="title cursor-pointer stukach" @click="handleTrablCatalog">Каталог траблов</div>
      <div class="title cursor-pointer otziv" @click="handleFeedback">Анонимные отзывы обо мне от исполнителей</div>
      <div class="title cursor-pointer reiting" @click="handleRating">АнтиРейтинг</div>
      <div class="cursor-pointer nahui">
        <div class="nahui">
          <brutal-button icon="fa-solid fa-person-walking-dashed-line-arrow-right" @onClick="testF(value=1)"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import brutalButton from "@/components/button/brutal-button.vue";
import {defineComponent} from "vue";
import {useRoute, useRouter} from "vue-router";
import {RoutesNames} from "@/shared";

export default defineComponent( {
  name: "brutalHeader",
  components: {brutalButton},
  setup() {
    const router = useRouter()

    function handleTrablCatalog() {
      router.push({name: RoutesNames.CatalogTrabl})
    }
    function handleTrabls() {
      router.push({name: RoutesNames.Trabls})
    }
    function handleFeedback() {
      router.push({name: RoutesNames.Feedback})
    }
    function handleRating() {
      router.push({name: RoutesNames.AntiRating})
    }
    function handleLogoClick() {
      router.push({name: RoutesNames.Main})
    }
    function testF(value) {
      console.log(value)
    }

    return {
      handleFeedback, handleRating, handleTrabls, handleTrablCatalog, handleLogoClick, testF
    }
  }
})
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
  box-shadow: 10px 10px 40px 40px $--color-headerbg;

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
  font-family: MorningBreeze-Light;
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
<template>
  <div class="brutalITSM justify-space-between align-center">
    <div class="brutalITSM__header">
      <div class="brutalITSM__logo cursor-pointer" @click="handleLogoClick">
        <span class="brutalITSM__title">Brutal ITSM</span>
      </div>
    </div>
    <div v-if="isNotAdmin" class="brutalITSM__menu">
      <div class="title cursor-pointer myrequest" @click="handleTrabls">Мои траблы</div>
      <div class="title cursor-pointer stukach" @click="handleTrablCatalog">Каталог траблов</div>
      <div class="title cursor-pointer otziv" @click="handleFeedback">Анонимные отзывы обо мне от исполнителей</div>
      <div class="title cursor-pointer reiting" @click="handleRating">АнтиРейтинг</div>
      <div class="avatar">
        <img class="avatar__img cursor-pointer" :src="userImg" alt="avatar" height="70" width="70" @click="handleImgClick" @error="handleImgError">
        <span class="avatar__title">{{userName}}</span>
      </div>
      <div class="cursor-pointer nahui">
        <div class="nahui">
          <brutal-button icon="fa-solid fa-person-walking-dashed-line-arrow-right" @click="logout"/>
        </div>
      </div>
    </div>
    <div v-if="isAdmin" class="brutalITSM__menu">
      <div class="avatar">
        <img class="avatar__img cursor-pointer" :src="userImg" alt="avatar" height="70" width="70" @click="handleImgClick" @error="handleImgError">
        <span class="avatar__title">{{userName}}</span>
      </div>
      <div class="cursor-pointer nahui">
        <div class="nahui">
          <brutal-button icon="fa-solid fa-person-walking-dashed-line-arrow-right" @click="logout"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import brutalButton from "@/components/button/brutal-button.vue";
import {computed, defineComponent} from "vue";
import {useRoute, useRouter} from "vue-router";
import {RoutesNames} from "@/shared";
import {useInfoToast} from "@/plugins/toasts/toasts";
import {userInfo} from "@/plugins/router/auth-guard";
import {s3url} from "@/shared/path-names";

export default defineComponent( {
  name: "brutalHeader",
  components: {brutalButton},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isNotAdmin = computed(() => route.name !== RoutesNames.AdminPanel)
    const isAdmin = computed(() => route.name === RoutesNames.AdminPanel)


    const userName = userInfo.value.lastname + ' ' + userInfo.value.firstname
    const avaPath = userInfo.value.avatar.backetName + '/' + userInfo.value.avatar.fileName

    const userImg = computed(() => avaPath != null ? `${s3url}/${avaPath}` : '')

    function handleImgError(e) {
      const target = e.target
      target.onerror = null
      target.src = '/images/nophoto.jpg'
    }

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
    function logout() {
      localStorage.clear()
      useInfoToast('Ты вышел из меня, ущерб!')
      router.push({name: RoutesNames.Auth})
    }

    return {
      handleFeedback,
      handleRating,
      handleTrabls,
      handleTrablCatalog,
      handleLogoClick,
      logout,
      handleImgError,
      isNotAdmin,
      isAdmin,
      userImg,
      userName
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

.avatar {
  margin: auto 20px;
  padding: 10px 25px;
  display: grid;
  place-items: center;
  &__img {
    border-radius: 100%;
    border: solid 2px rgba(67, 117, 131, 0.99);
  }
  &__title {
    color: $--color-text;
    font-family: MorningBreeze-Light;
    font-size: 15px;
    text-align: center;
  }
}

.nahui {
  margin-left: 10px;
  margin-top: 10px;
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
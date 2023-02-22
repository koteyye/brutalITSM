<template>
<div class="brutal-auth">
  <div class="brutal-auth__login">
    <p style="margin-right: 69px">Логин</p>
    <input v-model="login" type="login" class="brutal-auth__input" :class="{'brutal-auth__inputerror': isError}"/>
    <p style="margin-right: 69px">Пароль</p>
    <input v-model="password" type="password" class="brutal-auth__input" :class="{'brutal-auth__inputerror': isError}"/>
  </div>
  <div class="brutal-auth__btn">
    <brutal-button class="brutal-auth__button" label="Войти" @click="clickEnter"></brutal-button>
    <div class="brutal-auth__text-error" v-if="isError">{{errorMessage}}</div>
    <div class="brutal-auth__text-error" v-if="isResponseError">Введен неверный логин или пароль</div>
  </div>
</div>
</template>

<script>
import BrutalButton from "@/components/button/brutal-button.vue";
import {computed, defineComponent, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useAuth} from "../../composables/./useAuth"

export default defineComponent({
  name: "brutal-auth.vue",
  components: {BrutalButton},
  setup() {
    const router = useRouter()

    const login = ref('')
    const password = ref('')
    const errorMessage = ref(null)
    const isResponseError = ref(false)

    const isError = computed(() => errorMessage.value !== '')

    watch(
        [login, password],
        ([loginValue, passwordValue]) => {
          if (loginValue !== '' || passwordValue !== '') {
            errorMessage.value = ''
          }
        }
    )

    function validateFields() {
      return login.value.trim() != '' || password.value.trim() != ''
    }

    async function clickEnter() {
      const{postAuth} = useAuth(login, password)
      watch(
          () => postAuth.value,
          (value) => console.log(value)
      )
    }


    return {
      login, password, //v-models
      isError, isResponseError, //messages
      clickEnter //clicks

    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';
.brutal-auth {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__login {
    display: grid;
    grid-template-columns: 100px 450px;
    grid-row-gap: 24px;
  }
  &__input {
    border-radius: $radius*3;
    padding-left: 20px;
  }
  &__btn {
    margin-top: 15px;
  }
  &__button {
    margin: 20px auto;
    border-radius: 24px;
    padding-right: 18px;
    width: 200px;
  }
  &__inputerror {
    border: 1px solid #FF0000;
  }
}

</style>
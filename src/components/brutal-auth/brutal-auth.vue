<template>
<div class="brutal-auth">
  <div class="brutal-auth__login">
    <p class="text" style="margin-right: 69px">Логин</p>
    <input v-model="login" type="login" class="brutal-auth__input" :class="{'brutal-auth__inputerror': isError}"/>
    <p class="text"  style="margin-right: 69px">Пароль</p>
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
import {computed, defineComponent, ref, watch, reactive} from "vue";
import {useRouter} from "vue-router";
import {userServiceUrl} from "@/shared/path-names";

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
      const isValid = validateFields()
      if (!isValid) {
        errorMessage.value = 'Необходимо ввести логин и пароль'
      }
      const data = {login: login.value, password: password.value}
      const response = await fetch(`${userServiceUrl}/auth/sign-in`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        isResponseError.value = true
        return
      }
      console.log(response)
    }


    return {
      login, password, //v-models
      isError, isResponseError, errorMessage, //messages
      clickEnter //clicks

    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';
.brutal-auth {
  position: absolute;
  left: 40%;
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
    background-color: #778899;
    font-family: MornningBreeze;
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

.field-name {
  font-family: MornningBreeze;
  font-size: 20px;
}

</style>
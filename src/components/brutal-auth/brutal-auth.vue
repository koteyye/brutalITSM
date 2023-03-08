<template>
<div class="brutal-auth">
  <span class="brutalITSM__title">Brutal ITSM</span>
  <form class="card" @submit.prevent="submit">

    <div class="brutal-auth__login">
      <p class="text" style="margin-right: 69px">Логин</p>
      <input v-model="form.login.value" type="login" @blur="form.login.blur" class="brutal-auth__input" :class="{'brutal-auth__inputerror': !form.login.valid && form.login.touched}"/>
      <p class="text"  style="margin-right: 69px">Пароль</p>
      <input v-model="form.password.value" type="password" @blur="form.password.blur"  class="brutal-auth__input" :class="{'brutal-auth__inputerror': !form.password.valid && form.password.touched}"/>
    </div>
    <small class="login_error" v-if="form.login.errors.required && form.login.touched">Введи логин, идиот!</small>

    <small class="password_error" v-if="form.password.errors.required && form.password.touched">Введи пароль, идиот!</small>
    <small class="password_error" v-else-if="form.password.errors.minLength && form.password.touched">Минимальная длинна пароля 8 символов, а ты ввел только {{form.password.value.length}}, идиот!</small>
    <div class="brutal-auth__btn">
      <brutal-button class="brutal-auth__button" label="Войти" type="submit" :disabled="!form.valid"></brutal-button>
      <div class="brutal-auth__text-error" v-if="error">{{error}}</div>
    </div>
  </form>
</div>
</template>

<script>
import BrutalButton from "@/components/button/brutal-button.vue";
import {computed, defineComponent, ref, watch, reactive, onErrorCaptured} from "vue";
import {useRouter} from "vue-router";
import {userServiceUrl} from "@/shared/path-names";
import {useForm} from "@/use/form"
import {useAuth} from "@/use/auth";
import {RoutesNames} from "@/shared";

const required = val => !!val
const minLength = num => val => val.length >= num

export default defineComponent({
  name: "brutal-auth.vue",
  components: {BrutalButton},
  setup() {

    const router = useRouter()
    const error = ref()
    const form = useForm({
      login: {
        value: '',
        validators: {required}
      },
      password: {
        value: '',
        validators: {required, minLength: minLength(8)}
      }
    })

    async function submit() {
      const {token, errorMessage, completeAuth} = await useAuth({
        login: form.login.value,
        password: form.password.value
      })
      error.value = errorMessage.value
      if (completeAuth) {
        router.push({name: RoutesNames.Main})
      }
    }


    return {
      form,
      submit,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';

.brutalITSM__title {
  position: absolute;
  top: 20%;
  font-size: 60px;
}

.brutal-auth {
  position: absolute;
  left: 35%;
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
  &__text-error {
    position: absolute;
    left: 20%;
    color: #FF0000;
    text-align: center;
    font-family: MornningBreeze;
    font-size: 20px;
  }
}

.field-name {
  font-family: MornningBreeze;
  font-size: 20px;
}

pre {
  color: red;
}

small {
  color: #FF0000;
  text-align: center;
  font-family: MornningBreeze;
  font-size: 15px;
  margin: 5px;
  display: grid;
  position: absolute;
}

.login_error {
  top: 45%;
  left: 20%;
}
.password_error {
  top: 50.8%;
  left: 20%;
}

</style>
<template>
  <div class="brutal-create-user">
    <span class="brutal-create-user__title">Создание пользователя</span>
    <form class="create-form" @submit.prevent="submit">

      <div class="brutal-create-user__fields">
        <div class="field">
          <label class="field_name">Логин</label>
          <input v-model="form.login.value" type="login" @blur="form.login.blur" class="field_input">
        </div>
        <div class="field">
          <label class="field_name field">Электронная почта</label>
          <input v-model="form.email.value" type="email" @blur="form.login.blur" class="field_input">
        </div>
        <div class="field">
          <label class="field_name field">Фамилия</label>
          <input v-model="form.lastName.value" type="text" @blur="form.lastName.blur" class="field_input">
        </div>
        <div class="field">
          <label class="field_name field">Имя</label>
          <input v-model="form.firstName.value" type="text" @blur="form.firstName.blur" class="field_input">
        </div>
        <div class="field">
          <label class="field_name field">Отчество</label>
          <input v-model="form.middleName.value" type="text" class="field_input">
        </div>
        <div class="field">
          <label class="field_name field">Должность</label>
          <div class="search_field search-job">
            <brutal-search
              :search-options="searchJobOptions"
              :placeholder-text="placeholders.job"
              v-model:selected-val="form.job.value"
            />
          </div>
        </div>
        <div class="field">
          <label class="field_name field">Подразделение</label>
          <div class="search_field search-org">
            <brutal-search
                :search-options="searchOrgOptions"
                :placeholder-text="placeholders.org"
                v-model:selected-val="form.org.value"
            />
          </div>
        </div>
        <div class="field">
          <label class="field_name field">Роль</label>
          <select
              v-model="form.role.value"
              class="field_select">
            <option disabled value="">Выбери роль этого идиота</option>
            <option
                v-for="(role, id) in roles"
                :key="id"
                :value="role.id"
            >{{role.name}}</option>
          </select>
        </div>
      </div>

      <div class="brutal-create-user__btn">
        <brutal-button class="brutal-create-user__button" label="Создать" type="submit" :disabled="!form.valid"></brutal-button>
      </div>

    </form>
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useForm} from "@/use/form";
import brutalSearch from "@/components/brutal-search";
import {searchObj, useSearch} from "@/use/search";
import {service} from "@/shared/path-names";
import BrutalButton from "@/components/button/brutal-button.vue";
import {createUser, useRole} from "@/use/user";
import {useErrorToast, useInfoToast} from "@/plugins/toasts/toasts";

const required = val => !!val

export default defineComponent({
  name: "brutal-admin-create-user.vue",
  components: {BrutalButton, brutalSearch},
  setup() {
    const error = ref('')
    const roles = ref(null)

    const placeholders = {
      job: 'Вводи должность этого идиота',
      org: 'Вводи должность этого идиота',
    }

    const form = useForm({
      login: {
        value: '',
        validators: {required}
      },
      password: {
        value: '12345678' //Пароль по умолчанию
      },
      email: {
        value: '',
        validators: {required}
      },
      lastName: {
        value: '',
        validators: {required}
      },
      firstName: {
        value: '',
        validators: {required}
      },
      middleName: {
        value: ''
      },
      job: {
        value: ''
      },
      org: {
        value: ''
      },
      role: {
        value: ''
      }
    })

    //Поиск должности
    const searchJobOptions = {
      service: service.userService,
      searchObject: searchObj.job,
      resultField: 'id'
    }

    //Поиск организации
    const searchOrgOptions = {
      service: service.userService,
      searchObject: searchObj.org,
      resultField: 'id'
    }



    onMounted(async()=> getRole())

    async function getRole() {
      const {roleList} = await useRole()
      roles.value = roleList.value
    }



    async function submit() {
      const {userId, err} = await createUser({
        login: form.login.value,
        password: form.password.value,
        email: form.email.value,
        lastname: form.lastName.value,
        firstname: form.firstName.value,
        middlename: form.middleName.value,
        job: form.job.value,
        org: form.org.value,
        role: form.role.value
      })
      if (err.value !== '') {
        useErrorToast(err.value)
      }
      else {
        useInfoToast(`Пользователь создан. ID: ${userId.value}`)
      }
    }



    // function onQuery(request) {
    //   searchJobOptions.query = request
    // }
    //
    // watch(() => searchJobOptions.query,
    // async () => useSearch(searchJobOptions))


    return {
      form,
      placeholders,
      searchJobOptions,
      searchOrgOptions,
      submit,
      roles
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';
.brutal-create-user {
  text-align: center;
  &__title {
    text-align: center;
    color: $--color-text;
    font-family: MorningBreeze-Bold;
    font-size: 30px;
    letter-spacing: 3px;
  }
  &__fields {
    display: grid;
    grid-row-gap: 24px;
    max-width: 920px;
    max-height: 870px;
    margin-top: 20px
  }
}

.field_name {
  font-family: MorningBreeze;
  text-align: left;
  margin-left: 10px;
}

.field {
  text-align: left;
  display: flex;
}

.field_input {
  border-radius: $radius*3;
  padding-left: 20px;
  flex-basis: 51%;
  font-family: MorningBreeze-Light;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: $--color-apsidgray;
}

.field_name {
  flex-basis: 50%;
  font-size: 24px;
}

.field_select {
  border-radius: $radius*3;
  padding-left: 20px;
  flex-basis: 54%;
  font-family: MorningBreeze-Light;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: $--color-apsidgray;
  text-align: left;
  &:optional {
    color: #bcc0bc;
  }
}


label {
  color: $--color-apsidgray
}

.brutal-create-user__button {
  margin-top: 20px
}

.search-job {
  z-index: 10;
}
.search-org {
  z-index: 9;
}

</style>
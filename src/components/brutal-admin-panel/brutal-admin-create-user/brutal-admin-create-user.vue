<template>
  <div class="brutal-create-user">
    <span class="brutal-create-user__title">Создание пользователя</span>
    <form class="create-form" @submit.prevent="submit">

      <div class="brutal-create-user__fields">
        <label class="field_name">Логин</label>
        <input v-model="form.login" type="login" @blur="form.login.blur" class="field_input">
        <label class="field_name">Электронная почта</label>
        <input v-model="form.email" type="email" @blur="form.login.blur" class="field_input">
        <label class="field_name">Фамилия</label>
        <input v-model="form.lastName" type="email" @blur="form.lastName.blur" class="field_input">
        <label class="field_name">Имя</label>
        <input v-model="form.firstName" type="email" @blur="form.firstName.blur" class="field_input">
        <label class="field_name">Отчество</label>
        <input v-model="form.middleName" type="email" class="field_input">
        <div class="search_job">
          <label class="field_name">Должность</label>
          <brutal-search
              v-model:search-result="searchResult"
            :search-options="searchJobOptions"
              @SearchRequest="onQuery"
            :placeholder-text="placeholders.job"
          />
        </div>
        <label class="field_name">Подразделение</label>
        <select v-model="form.orgName" class="field_select">
          <option disabled value="">Выбери подразделение этого идиота</option>
          <option>Гошная</option>
          <option>Анал-литикая</option>
          <option>Техподдержническая</option>
        </select>
        <label class="field_name">Роль</label>
        <select v-model="form.role" class="field_select">
          <option disabled value="">Выбери должность этого идиота</option>
          <option>Жалкий пользователь</option>
          <option>ИТишник</option>
          <option>Великолепный АДМИН</option>
        </select>

      </div>

    </form>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, watch} from "vue";
import {useForm} from "@/use/form";
import brutalSearch from "@/components/brutal-search";
import {searchObj, useSearch} from "@/use/search";
import {service} from "@/shared/path-names";

const required = val => !!val

export default defineComponent({
  name: "brutal-admin-create-user.vue",
  components: {brutalSearch},
  setup() {
    const placeholders = {
      job: 'Вводи должность',
      org: 'Вводи подразделение',
      role: 'Вводи роль'
    }


    const error = ref()

    const form = useForm({
      login: {
        value: '',
        validators: {required}
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
      jobName: {
        value: ''
      },
      orgName: {
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
      searchJobOptions
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
}

.field_name {
  font-family: MorningBreeze;
  text-align: left;
}

</style>
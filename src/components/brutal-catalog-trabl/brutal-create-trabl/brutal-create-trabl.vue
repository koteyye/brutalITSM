<template>
  <div class="brutal-create__btnback">
    <brutal-button icon="fa-solid fa-arrow-left" @click="clickBack"/>
  </div>
  <div class="brutal-create__page">
    <div class="brutal-create__trabl-form">
        <div class="brutal-create__title">
          <div class="brural-create__head text">Оформление трабла</div>
        </div>
      <div class="brutal-create__fields">
        <div class="brutal-create__iniciator fields">
          <label class="brutal-create__iniciator-field-name text fieldname">Инициатор</label>
          <span class="brutal-create__iniciator-field fieldinput fileddefault">{{userName}}</span>
        </div>
        <div class="brutal-create__interes fields">
          <label class="brutal-create__interes-field-name text fieldname" >Заинтересованное лицо</label>
<!--          <input-->
<!--              type="text"-->
<!--              v-model="interes"-->
<!--              class="brutal-create__interes-field fieldinput"/>-->
          <div class="brutal-create__interes-field">
            <brutal-search
                :search-result="searchResult"
                @searchRequest="EnterQuery"
                @selected="EnterSelected"
            />
          </div>
        </div>
        <div class="brutal-create__typeTrabl fields">
          <label class="brutal-create__typeTrabl-field-name text fieldname">Тип трабла</label>
          <span class="brutal-create__typeTrabl-field fieldinput fileddefault">{{typeItemName}}</span>
        </div>
        <div class="brutal-create__compucter fields"
             v-if="needPCNumber === 'true'">
          <label class="brutal-create__compucter-field-name text fieldname">Номер компуктера</label>
          <input v-model="compucter" class="brutal-create__compucter-field fieldinput"/>
        </div>
        <div class="brutal-create__location fields">
          <label class="brutal-create__location-field-name text fieldname">Локация</label>
          <input v-model="locationn" class="brutal-create__location-field fieldinput"/>
        </div>
        <div class="brutal-create__pisanina fields">
          <label class="brutal-create__pisanina-field-name text fieldname">Подробное описание трабла</label>
          <textarea v-model="pisanina" placeholder="Максимально подробно пиши о своем трабле" class="brutal-create__pisanina-field fieldinput"/>
        </div>
        <div class="brutal-create__prufs">
    <!--        Сюда лоэдер-->
        </div>
        <div class="brutal-create__btn">
          <brutal-button label="Отправить эту хуйню"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import brutalButton from "@/components/button/brutal-button.vue";
import {defineComponent, onMounted, ref, watch} from "vue";
import {useLocalStorage} from "@vueuse/core";
import {baseUrl} from "@/shared/path-names";
import {useRouter} from "vue-router";
import {RoutesNames} from "@/shared";
import brutalSearch from "@/components/brutal-search";

export default defineComponent({
  name: "brutalCreateTrabl",
  components: {
    brutalButton, brutalSearch
  },
  setup() {
    const router = useRouter()
    const typeItemName = useLocalStorage('TrablTypeName', '')
    const typeItemId = useLocalStorage('TrablTypeId', '')
    const needPCNumber = useLocalStorage('needPC', '')

    const userName = ref('')
    const userId = ref('')

    const users = ref([])

    //Переменные для поиска
    const query = ref('')
    const searchResult = ref([])
    const clearSearchResult = ref(false)
    //__________________________

    console.log(query.value)

    onMounted(async()=>await getUser())

    async function getUser() {
      const id = '54563a95-591b-4937-a9c0-0a16c48da30b'
      const response = await fetch(`${baseUrl}/users?id=${id}`)
      const userInfo = await response.json()
      userName.value = userInfo[0].name
      userId.value = userInfo[0].id
    }


    //Функции и вотчеры для поиска!
    function EnterQuery(request) {
      query.value = request
    }

    watch(() => query.value,
        async () => searchUser())

    async function searchUser() {
      if (query.value !== '') {
        const response = await fetch(`${baseUrl}/users?name_like=${query.value}`)
        searchResult.value = await response.json()
      }
    }

    function EnterSelected(selected) {
      clearSearchResult.value = selected
    }

    watch(()=>clearSearchResult.value,
        ()=>clearResult())

    function clearResult() {
      searchResult.value = []
    }
    //.............................



    // async function getUsers() {
    //   const response = await fetch(`${baseUrl}/users`)
    //   const userInfo = await response.json()
    //   console.log(userInfo.value)
    // }

    function clickBack() {
      router.push({name: RoutesNames.CatalogTrabl})
    }

    return {
      //iniciator, interes, typeTrabl, compucter, locationn, pisanina
      typeItemName, typeItemId, needPCNumber, userName, clickBack, users, query, searchResult, EnterQuery, EnterSelected
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.brutal-create__page {
  width: 100%;
  text-align: -webkit-center;
}

.brutal-create__trabl-form {
  margin-top: 30px;
  padding: 0px 20px;
  border: solid 1px $--color-apsidgray;
  max-width: 1000px;
  margin-left: 20px;
}

.brural-create__head {
  text-align: center;
}

.brutal-create__fields {
  display: grid;
  grid-row-gap: 24px;
  max-width: 920px;
  max-height: 870px;
  margin-top: 20px
}

.fields {
  text-align: center;
  display: flex;
}

.fieldinput {
  border-radius: $radius*3;
  padding-left: 20px;
  flex-basis: 50%;
  font-family: KistyCC;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: $--color-apsidgray;
}


.fileddefault {
  background-color: $--color-verygray;
  text-align: left;
  padding-left: 0px 20px;
}

.fieldname {
  flex-basis: 50%;
}

.brutal-create__pisanina-field {
  height: 220px;
}

textarea::placeholder {
  color: #bcc0bc;
}

.brutal-create__btn {
  text-align: center;
}

.brutal-create__btnback {
  margin-left: 20px;
  margin-top: 20px
}

</style>
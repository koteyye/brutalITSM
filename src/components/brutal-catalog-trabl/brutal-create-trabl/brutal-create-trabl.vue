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
                v-model:search-result="searchResult"
                @searchRequest="onQuery"
                :placeholder-text="placeholders"
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
        <div class="brutal-create__prufs fields">
          <label class="brutal-create__prufs-field-name text fieldname">Пруфы</label>
          <div class="loadfield">
            <brutal-uploader
                v-model:model-value="loadFiles"
                :acceptFile = "acceptFiles"
                :is-disabled = "filesLimit"
                :limit-count = "5"
            />
          </div>
        </div>
        <div
            class="brutal-create-btn"
            :class="{'brutal-create-btn__non-file': loadFiles.length !== 0}"
        >
          <brutal-button label="Отправить эту хуйню" @click="createTrabl"/>
        </div>
      </div>
      <div class="brutal-create-trabl-modal">
        <brutal-create-trabl-modal v-if="showModal" @close="handleClose" @modalResponse="modalResponse"/>
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
import brutalUploader from "@/components/brutal-uploader";
import brutalCreateTrablModal
  from "@/components/brutal-catalog-trabl/brutal-create-trabl/brutal-create-trabl-modal/brutal-create-trabl-modal.vue";
import {POSITION, useToast} from "vue-toastification";

export default defineComponent({
  name: "brutalCreateTrabl",
  components: {
    brutalButton, brutalSearch, brutalUploader, brutalCreateTrablModal
  },
  setup() {
    const placeholders = {
      InterestFace: 'Введи лицо'
    }
    const router = useRouter()
    const typeItemName = useLocalStorage('TrablTypeName', '')
    const typeItemId = useLocalStorage('TrablTypeId', '')
    const needPCNumber = useLocalStorage('needPC', '')
    const toast = useToast()
    const userName = ref('')
    const userId = ref('')

    const users = ref([])

    const loadFiles = ref([])

    const acceptFiles = ref('.jpeg, .jpg, .png')

    const filesLimit = ref(false)

    const showModal = ref(false)

    const confirmModal = ref(false)

    watch(() => loadFiles.value,
        (value) => {
      if(value.length > 4) setFilesLimit()
          else filesLimit.value = false
    })

    function setFilesLimit() {
      filesLimit.value = true
      toast.error("5 пруфов более, чем достаточно", {
        position: POSITION.BOTTOM_CENTER,
        timeout: 4000,
      })
    }

    //Переменные для поиска
    const query = ref('')
    const searchResult = ref([])
    const clearSearchResult = ref(false)
    //__________________________


    onMounted(async()=>await getUser())

    async function getUser() {
      const id = '54563a95-591b-4937-a9c0-0a16c48da30b'
      const response = await fetch(`${baseUrl}/users?id=${id}`)
      const userInfo = await response.json()
      userName.value = userInfo[0].name
      userId.value = userInfo[0].id
    }


    //Функции и вотчеры для поиска!
    function onQuery(request) {
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


    watch(()=>clearSearchResult.value,
        ()=>clearResult())

    function clearResult() {
      searchResult.value = []
    }


    function createTrabl() {
      showModal.value = true
    }

    function handleClose() {
      showModal.value = false
    }

    function onConfirm() {

    }

    function modalResponse(modalResponse) {
      console.log()
      if(modalResponse.confirmTrabl === false) {
        toast.info(`${modalResponse.toastMessage}`, {
          timeout: 2000,
          closeButton: false,
          position: POSITION.BOTTOM_CENTER
        })
        showModal.value = false
        router.push({name: RoutesNames.Main})
      }
      else {
        onCreateTrabl(modalResponse)
      }
    }

    async function onCreateTrabl(modalResponse) {
      toast.error(`${modalResponse.toastMessage}`, {
        timeout: 2000,
        closeButton: false,
        position: POSITION.BOTTOM_CENTER
      })
      showModal.value = false
    }
    function clickBack() {
      router.push({name: RoutesNames.CatalogTrabl})
    }



    return {
      //iniciator, interes, typeTrabl, compucter, locationn, pisanina
      typeItemName,
      typeItemId,
      needPCNumber,
      userName,
      clickBack,
      users,

      //search:
      query,
      searchResult,
      onQuery,
      placeholders,

      //uploader:
      loadFiles,
      acceptFiles,
      filesLimit,

      //modal:
      showModal,
      createTrabl,
      handleClose,
      modalResponse,

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

.brural-create__head {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 30px;
}

.brutal-create__trabl-form {
  margin-top: 30px;
  padding: 0px 20px;
  border: solid 1px $--color-apsidgray;
  max-width: 1000px;
  margin-left: 20px;
  height: min(1060px);
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

.loadfield {
  text-align: left;
  display: flex;
}

.fieldinput {
  border-radius: $radius*3;
  padding-left: 20px;
  flex-basis: 50%;
  font-family: MorningBreeze-Light;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: $--color-apsidgray;
}


.fileddefault {
  background-color: $--color-verygray;
  text-align: left;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 2px;
}

.fieldname {
  flex-basis: 50%;
  font-size: 24px;
}

.brutal-create__pisanina-field {
  height: 220px;
}

textarea::placeholder {
  color: #bcc0bc;
}

.brutal-create-btn {
  text-align: center;
  margin: 110px;
  &__non-file {
    margin-top: 0;
  }
}

.brutal-create-trabl-modal {
  position: relative;
  top: -50%;
}





.brutal-create__btnback {
  margin-left: 20px;
  margin-top: 20px
}

</style>
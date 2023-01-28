<template>
    <div class="brutal-trabls-item">
      <div class="brutal-trabls-item__content-view">
          <brutal-full-image-modal
              v-if="showContentView"
              @close="handleCloseFullImage"
              :files="content"
              :source-index = sourceIndex
          />
      </div>
        <div
            v-if="showContentView !== true"
            class="brutal-trabls-item__area-trabl">
            <div class="brutal-trabls-item__area-name header_text">
                Трабл
            </div>
            <div class="brutal-trabls-item__btns">
                <brutalButton label="Основная инфа" :disabled="btnMainInfo" @click="handleSwitchSection(switcher=1)"/>
                <brutalButton label="Пруфы" :disabled="btnPrufs" @click="handleSwitchSection(switcher=2)"/>
                <brutalButton label="История" :disabled="btnHistory" @click="handleSwitchSection(switcher=3)"/>
            </div>
            <div class="brutal-trabls-item__maininfo"
                v-show="btnMainInfo"
                v-for="trabl in getTrablsById"
                :key="trabl.id">
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Номер трабла</label>
                    <span class="field-value">{{trabl.number}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Статус</label>
                    <span class="field-value">{{trabl.status}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Инициатор</label>
                    <span class="field-value">{{trabl.initiatr}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Заинтересованное лицо</label>
                    <span class="field-value">{{trabl.interest}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Тип трабла</label>
                    <span class="field-value">{{trabl.type}}</span>
                </div>
                <div class="brutal-trabls-item__fields"
                v-show="trabl.pcNumber !== ''">
                    <label class="field-name text">Номер компуктера</label>
                    <span class="field-value">{{trabl.pcNumber}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Локация</label>
                    <span class="field-value">{{trabl.location}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Рабочая группа</label>
                    <span class="field-value">{{trabl.workgroup}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Тема</label>
                    <span class="field-value">{{trabl.title}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Подробное описание</label>
                    <span class="field-value">{{trabl.description}}</span>
                </div>
            </div>
            <div class="brutal-trabls-item__prufs"
                v-for="trabl in getTrablsById"
                :key="trabl.index">
              <brutal-trabls-item-prufs
                v-show="btnPrufs"
                :trabl-info="trabl.prufs"
                @prufsClick="showFull"
              />
            </div>
        </div>
    </div>
</template>




<script>
import {computed, defineComponent, onMounted, ref} from 'vue';
import brutalButton from '@/components/button';
import useModels from '@/composables/useModels';
import { useRoute } from 'vue-router';
import brutalTrablsItemPrufs from "@/components/brutal-trabls/brutal-trabls-item/brutal-trabls-item-prufs";
import brutalFullImageModal from "@/components/brutal-full-image-modal";

export default defineComponent(
    {
    name: "brutalTrablsItem",
    components: {brutalButton, brutalTrablsItemPrufs, brutalFullImageModal},
    setup() {
        const route = useRoute()
        const id = ref('')
        const btnMainInfo = ref(true)
        const btnPrufs = ref(false)
        const btnHistory = ref(false)
        const content = ref([])
        const sourceIndex = ref('')
        const showContentView = ref(false)
        
        function handleSwitchSection(switcher) {
            if(switcher === 1) {
                btnMainInfo.value = true
                btnPrufs.value = false
                btnHistory.value = false
            }
            else if(switcher === 2) {
                btnMainInfo.value = false
                btnPrufs.value = true
                btnHistory.value = false
            }
            else {
                btnMainInfo.value = false
                btnPrufs.value = false
                btnHistory.value = true
            }
        }


        onMounted(() => id.value = route.params.id)
        
        const {getTrablsById} = useModels(id)


        function showFull(contentData) {
          //Добавить первоначальный индекс файла
          let dataAndTrueIndex = computed (()=> contentData.dataItem.map((item, index) => ({mimeType: item.mimeType, src: item.src, trueIndex: index})))
          content.value = dataAndTrueIndex.value
          sourceIndex.value = contentData.sourceIndex
          showContentView.value = true
        }

        function handleCloseFullImage() {
          showContentView.value = false
        }


        return {
          getTrablsById,
          handleSwitchSection,
          btnMainInfo,
          btnPrufs,
          btnHistory,
          showFull,
          sourceIndex,
          handleCloseFullImage,
          showContentView,
          content
        }
    }
    }
) 
</script>
<style lang="scss">
@import '../../../assets/styles/main';

.brutal-trabls-item {
    margin: auto;
    &__area-trabl {
        min-width: 800px;
        max-width: 1400px;
        margin-top: 100px;
        border: solid 1px $--color-apsidgray;
        margin-left: auto;
        margin-right: auto;
    };
    &__area-name {
        font-size: 36px;
    };
    &__btns {
        display: flex;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &__maininfo {
        display: grid;
    }
    &__fields {
        display: flex;
        margin-bottom: 10px;
        padding: 10px;
    }
  &__full-prufs {
    position: absolute;
    z-index: 10;
    text-align: center;
    left: 25%
  }
}

.full-image {
  width: 90%;
  height: 90%;
  margin: 10px;
  border: solid 2px $--color-main;
}

.full-image__close {
  position: absolute;
  left: 93.9%;
  top: 0;
  border-radius: 100%;
  background-color: $--color-main;
  height: 30px;
  width: 30px;
  cursor: pointer;
  &:enabled:hover {
    background-color: $--color-maindef;
  }
}

.field-name {
    flex-basis: 50%;
    text-align: center;
}
.field-value {
    flex-basis: 50%;
    text-align: left;
    background-color: $--color-maindef;
    border-radius: $radius*3;
    padding: 10px;
    font-family: MorningBreeze-Light;
}




</style>
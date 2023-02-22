<template>
  <div class="brutal-trabls-item-prufs"
 >
    <div class="brutal-trabls-item-prufs__files-category">
    <span class="brutal-trabls-item-prufs__files-types-name">Скринчики</span>
    <div class="brutal-trabls-item-prufs__images-files"
         v-for="(prufsObj, index) in prufs"
         :key="index"
         v-show="checkMimeType(prufsObj.mimeType, 'image')">


      <div class="brutal-trabls-item-prufs__images">
          <img

            :src="prufsObj.src"
            alt="img"
            class="cursor-pointer img"
            height="80"
            width="80"
            @click="handlePrufsClick(index)"/>
        </div>
      </div>
    </div>
    <div class="brutal-trabls-item-prufs__files-category">
      <span class="brutal-trabls-item-prufs__files-types-name">Видосики</span>
      <div class="brutal-trabls-item-prufs__video-files"
         v-for="(prufsObj, index) in prufs"
         :key="index"
         v-show="checkMimeType(prufsObj.mimeType, 'video')">
      <div class="brutal-trabls-item-prufs__videos">
        <div class="brutal-trabls-item-prufs__video-item">
          <img src="../../../../assets/image/video-file-svgrepo-com.svg"
               height="80"
               width="80"
               @click="handlePrufsClick(index)"
               class="cursor-pointer img"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {filepath} from "@/shared/path-names";

export default defineComponent(
    {
      name: "brutalTrablsItemPrufs",
      props: {
        trablInfo: {
          type: Array,
          default() {
            []
          }
        }
      },
      emits: ['prufsClick'],
      setup(props, {emit}) {
        const objectPrufs = ref(props.trablInfo.prufs)
        const prufs = computed(() => props.trablInfo.map((item) => ({mimeType: item.mimeType, src: `${filepath}${item.s3}`})))

        
        function checkMimeType(type, currentType) {
          const resultMimeType = type.includes(currentType)
          return resultMimeType
        }

        function handlePrufsClick(imagesIndex) {
          const contentData = {
            dataItem: prufs.value,
            sourceIndex: imagesIndex
          }
          emit('prufsClick', contentData)
        }


        return {
          checkMimeType,
          prufs,
          handlePrufsClick
        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/main';

.brutal-trabls-item-prufs {

  &__files-category {
    display: flex;
  }
  &__files-types-name {
    font-family: MornningBreeze;
    font-size: 24px;
    color: $--color-apsidgray;
    align-self: center;
    margin: 10px 10px;
    width: 100px;
  }
  &__images-files {
    display: flex;
  }
  &__images {
    margin: 10px;
  }
  &__video-item {
    margin: 10px;
  }
  &__video-files {
    display: flex;
  }
}

.full-images {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.img {
  border-radius: $radius*3;
}

</style>
<template>
  <brutal-modal width="1080px" height="800px">
    <template #content>
      <div class="brutal-content-modal">
        <div class="brutal-content-modal__wrapper">
          <div class="brutal-content-modal__content"
          >
            <div
                v-if="showImage"
                class="brutal-content-modal__images">
            <img :src="contentItem" alt="image" class="brutal-content-modal__image-item"/>
              <div>{{contentItem}}</div>
            </div>
            <div
                v-if="showVideo"
                class="brutal-content-modal__videos">
              <video-player
                  :src=contentItem
                  poster=""
                  controls
                  :loop="true"
                  :volume="0.6"
                  class="brutal-content-modal__video-item"
              />
            </div>

          </div>
        </div>
        <div class="brutal-content-modal__button">
          <div
              v-if="dataIndex !== 0"
              class="brutal-content-modal__left" @click="handleBack">
            <img src="../../assets/image/chevron-compact-left.svg" class="brutal-content-modal__icon"/>
          </div>
          <div
              v-if="dataIndex !== (files.length - 1)"
              class="brutal-content-modal__right" @click="handleNext">
            <img src="../../assets/image/chevron-compact-right.svg" class="brutal-content-modal__icon"/>
          </div>
        </div>
      </div>
    </template>
  </brutal-modal>
</template>

<script>
import {defineComponent, onMounted, ref, watch, computed} from "vue";
import brutalModal from "@/components/brutal-modal";
import { VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'

export default defineComponent(
    {
      name: "brutalContentView",
      components: {brutalModal, VideoPlayer},
      props: {
        files: {
          type: Array,
          default() {
            []
          }
        },
        sourceIndex: {
          type: Number,
          default: 0
        }
      },
      setup(props) {
        const dataIndex = ref(props.sourceIndex)
        const contentItem = ref('')
        const showImage = ref(false)
        const showVideo = ref(false)

        onMounted(()=> findContentItem())

        watch(()=> dataIndex.value,
            ()=> findContentItem())

        function findContentItem() {
          const findFile = props.files.filter((item) => dataIndex.value === item.trueIndex)
          contentItem.value = findFile.value[0].src
          const contentType = findFile.value[0].mimeType
          showImage.value = contentType.includes('image')
          showVideo.value = contentType.includes('video')
        }

        function handleNext() {
          dataIndex.value += 1
        }

        function handleBack() {
          dataIndex.value -= 1
        }


        return {
          dataIndex,
          handleNext,
          handleBack,
          contentItem,
          showImage,
          showVideo
        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';
.brutal-content-modal {
  &__wrapper {
    max-width: 1080px;
    margin: 0 auto;
  }
  &__content {
    max-width: 1080px;
    max-height: 720px;
    text-align: center;
    margin: 10px;
  }
  &__image-item {
    max-width: 1060px;
    max-height: 700px;
    box-shadow: 0 0 20px 20px rgb(56 53 53 / 50%);
    border-radius: $radius*3;
  }
  &__video-item {
    max-width: 1060px;
    max-height: 700px;
    box-shadow: 0 0 20px 20px rgb(56 53 53 / 50%);
    border-radius: $radius*3;
  }
  &__left {
    position: absolute;
    top: 30%;
    left: -76px;
    opacity: 0.05;
    transition: .5s;
    &:hover {
      opacity: 0.5;
    }
  }
  &__right {
    position: absolute;
    top: 30%;
    left: 907px;
    opacity: 0.05;
    transition: .5s;
    &:hover {
      opacity: 0.5;
    }
  }

  &__icon {
    width: 250px;
  }
}

</style>
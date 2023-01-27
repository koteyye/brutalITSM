<template>
  <brutal-modal width="1080px" height="1080px" close="handleClose" :persistent="true">
    <template #content>
      <div class="brutal-full-image-modal">
        <div class="brutal-full-image-modal__wrapper">
          <div class="brutal-full-image-modal__full-image">
            <img :src="imageFiles[imageIndex].src" alt="image" class="brutal-full-image-modal__image"/>
          </div>
        </div>
        <div class="brutal-full-image-modal__button">
          <button @click="handleBack">Back</button>
          <button @click="handleNext">Next</button>
        </div>
      </div>
    </template>
  </brutal-modal>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import brutalModal from "@/components/brutal-modal";

export default defineComponent(
    {
      name: "brutalFullImageModal",
      components: {brutalModal},
      props: {
        imageFiles: {
          type: Array,
          default() {
            []
          }
        },
        sourceIndex: {
          type: String,
          default: ''
        },
        carousel: {
          type: Boolean,
          default: false
        }
      },
      setup(props) {
        const imageIndex = ref(props.sourceIndex)

        function handleNext() {
          let x=1
          imageIndex.value += 1
        }

        function handleBack() {
          imageIndex.value -= 1
        }

        return {
          imageIndex,
          handleNext,
          handleBack
        }
      }
    }
)
</script>

<style lang="scss" scoped>

.brutal-full-image-modal {
  &__wrapper {
    max-width: 1080px;
    margin: 0 auto;
  }
  &__full-image {
    max-width: 1080px;
    max-height: 720px;
    text-align: center;
    margin: 10px;
  }
  &__image {
    max-width: 1060px;
    max-height: 700px;
  }
  &__button {
    position: absolute;
    bottom: 10px;
    left: 45%
  }
}

  //.brutal-full-image-modal {
  //  max-width: 1080px;
  //  overflow: hidden;
  //  margin: 0 auto;
  //  &__full-image {
  //    display: flex;
  //   }
  //}

</style>
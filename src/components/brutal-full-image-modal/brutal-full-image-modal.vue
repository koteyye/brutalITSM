<template>
  <brutal-modal width="1080px" height="800px" close="handleClose" :persistent="true">
    <template #content>
      <div class="brutal-full-image-modal">
        <div class="brutal-full-image-modal__wrapper">
          <div class="brutal-full-image-modal__full-image">
            <img :src="imageFiles[imageIndex].src" alt="image" class="brutal-full-image-modal__image"/>
          </div>
        </div>
        <div class="brutal-full-image-modal__button">
          <div class="brutal-full-image-modal__left" @click="handleBack">
            <img src="../../assets/image/chevron-compact-left.svg" class="brutal-full-image-modal__icon"/>
          </div>
          <div class="brutal-full-image-modal__right" @click="handleNext">
            <img src="../../assets/image/chevron-compact-right.svg" class="brutal-full-image-modal__icon"/>
          </div>
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
  &__left {
    position: fixed;
    top: 350px;
    left: -15px;
    opacity: 0.05;
    transition: .5s;
    &:hover {
      opacity: 0.5;
    }
  }
  &__right {
    position: fixed;
    top: 350px;
    left: 979px;
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

  //.brutal-full-image-modal {
  //  max-width: 1080px;
  //  overflow: hidden;
  //  margin: 0 auto;
  //  &__full-image {
  //    display: flex;
  //   }
  //}

</style>
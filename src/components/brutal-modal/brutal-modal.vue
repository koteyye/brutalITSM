<template>
  <div class="brutal-dialog-wrapper">
    <div
      v-if="persistent"
      class="brutal-dialog-wrapper__inner"
      @clock="handleClose"/>
  </div>
  <div class="brutal-dialog-content" :style="{ width }">
    <div class="brutal-dialog-content__body">
      <div class="brutal-dialog-close">
        <fa  icon="fa-regular fa-circle-xmark" @click="handleClose" class="brutal-dialog-close__btn"/>
      </div>
      <div class="brutal-dialog-content__inner-content">
        <slot name="content"/>
      </div>
      <div class="brutal-dialog-content__action flex">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";


export default defineComponent(
    {
      name: "brutalModal",
      props: {
        title: {
          type: String,
          default: ''
        },
        width: {
          type: String,
          default: '480px'
        },
        titleAlign: {
          type: String,
          default: ''
        },
        persistent: {
          type: Boolean,
          default: false
        }
      },
      emits: ['close', 'update:modelValue'],
      setup(props, {emit}) {
        function handleClose() {
          emit('close')
        }
        return {
          handleClose
        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';

.brutal-dialog-wrapper {
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 45, 61, 0.8);
  overflow: auto;
  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.brutal-dialog-content {
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  position: relative;
  z-index: 4;
  animation: modal-content-fade-in 0.3s ease;
  &__body {
    background-color: $--color-black;
    border: solid 1px $--color-apsidgray;
    border-radius: $radius*3;
  }
  &__action {
    justify-content: flex-end;
    margin-bottom: 37px;
  }
}

.brutal-dialog-close {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 5px;
  &__btn {
    background-color: $--color-main;
    border-radius: 100%;
    cursor: pointer;
    height: 30px;
    width: 30px;
  }
}

</style>
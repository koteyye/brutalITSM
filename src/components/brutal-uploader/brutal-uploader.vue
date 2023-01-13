<template>
  <div class="brutal-uploader">
    <div class="brutal-uploader__dragload"
         :class="{ 'brutal-uploader__dragload--drag': isDragStart}"
    >
      <input
          class="brutal-uploader__input"
          ref="input"
          id="dragger"
          type="file"
          multiple
          @change="uploadFile"
          @dragenter="isDragStart = true"
          @dragleave="isDragStart = false"
      >
      {{ isDragStart ? '' : 'Нажать для загрузки или перенести файл'}}
      <img
        v-show="isDragStart"
        src="/image/1801287.svg"
        alt="Грузи"
        height="150"
        width="334"

      >
    </div>
    <div class="brutal-uploader__preview">
      <div
           v-for="(image, index) in modelValue"
           :key="index"
           class="brutal-uploader__previewItem"
           >
        <span>
          <button class="brutal-uploader__remove" @click="removeFile(index)">
            <fa  icon="fa-solid fa-xmark"/>
          </button>
         </span>
        <img
            :src="getSrc(image)"
            :alt="`image ${index + 1}`"
            height="70"
            width="70"
        >

         </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs} from "vue";
import {useToast} from "vue-toastification";

export default defineComponent({
  name: "brutalUploader",
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const {modelValue} = toRefs(props)
    const toast = useToast()

    const input = ref('')

    const errorMessage = ref(null)
    const isError = ref(false)

    const isDragStart = ref(false)

    function uploadFile(event) {
      if(event.target.files) {

        if(modelValue.value.length < 5) {
          emit('update:modelValue', [...modelValue.value, ...Array.from(event.target.files)])
        }
        else {
          errorMessage.value = 'Ты бы претормозил'
          isError.value = true
          getToast(errorMessage)
        }
      }
      if(input.value) {
        input.value.value = ''
      }
      isDragStart.value = false
    }
    const getSrc = (image) => URL.createObjectURL(image)

    function removeFile(index) {
      emit('update:modelValue', modelValue.value.filter((p, i) => i !== index))
    }

    function getToast(errorMessage) {
      toast.error(errorMessage.value, {
        timeout: 2000
      })

    }

    return {
      uploadFile, getSrc, input, removeFile, isDragStart
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';

  .brutal-uploader__dragload {
    position: relative;
    text-align: center;
    height: 150px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px dotted $--color-apsidgray;
    border-radius: $radius*3;
    margin-top: 10px;
    color: $--color-main;
    font-family: "Mrs Onion Monsters";
    font-size: 14px;
    letter-spacing: 3px;
    padding: 20px;
    background-color: rgba(#006A72, 0.5);
  }

  .brutal-uploader__input {
    position: absolute;
    height: 150px;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  .brutal-uploader__dragload--drag {
    color: rgba(#fff, 0);
    border-color: $--color-main;
  }

  .brutal-uploader__icon {
    opacity: 0.3;
    width: 50px;
  }


  .btn__load {
    background-color: $--color-main;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 20px;
    height: 40px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    transition: .2s;
    font-weight: 500;
    font-family: "Mrs Onion Monsters";
    font-size: 16px;
    line-height: 21px;
    position: relative;
    left: 0;
    &:hover {
      background-color: $--color-maindef;
    }
  }

  .brutal-uploader__dragload {
    color: $--color-maindef
  }

.brutal-uploader__preview {
  display: flex;
}
img {
  display: flex;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: $radius*3;
}

.brutal-uploader__remove {
  position: relative;
  left: 50px;
  top: 27px;
  border-radius: 100%;
  background-color: $--color-main;
  height: 30px;
  width: 30px;
  cursor: pointer;
  &:enabled:hover {
    background-color: $--color-maindef;
  }
}

</style>
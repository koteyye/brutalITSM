<template>
  <div class="brutal-uploader">
    <div class="brutal-uploader__dragload"
         :class="[{ 'brutal-uploader__dragload--drag': isDragStart}, {'brutal-uploader__isDisabled': isDisabled}]"
    >
      <input
          :class="[{ 'brutal-uploader__input cursor-pointer' : isDisabled === false}, { 'brutal-uploader__input': isDisabled }]"
          ref="input"
          id="dragger"
          :accept=acceptFile
          :disabled="isDisabled"
          type="file"
          multiple
          @change="handleInput"
          @dragenter="isDragStart = true"
          @dragleave="isDragStart = false"
      >
      {{ isDragStart ? '' : isDisabled ? '' :'Нажать для загрузки или перенести файл'}}
      <img
        v-show="isDragStart"
        src="../../assets/image/1801287.svg"
        alt="Грузи"
        height="150"
        width="334"
      >
      <img
        v-show="isDisabled"
        src="../../assets/image/penis-svgrepo-com.svg"
        alt="Все"
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
import {computed, defineComponent, ref, toRefs, watch} from "vue";
import {POSITION, useToast} from "vue-toastification";

export default defineComponent({
  name: "brutalUploader",
  props: {
    modelValue: {
      type: [File],
      required: true
    },
    acceptFile: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    sizeLimit: {
      type: [Number, String],
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    limitCount: {
      type: Number,
      default: 10
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const {modelValue} = toRefs(props)
    const input = ref('')

    const toast = useToast()
    const errorMessage = ref(null)
    const isError = ref(false)

    const isDragStart = ref(false)


    const filedByType = ref(Array<File>([]))
    const filedBySize = ref(Array<File>([]))
    const exceededError = ref(false)

    const types = computed(() => props.acceptFile?.split(',').map((el) => el.replace('.', ''). trim()))


    watch(() => props.modelValue,
        (newVal, oldVal) => {
      if (newVal !== oldVal && newVal === '') clearErrors
        }
    )

    function clearErrors() {
      filedByType.value = []
      filedBySize.value = []
      exceededError.value = false
    }

    function handleInput(event) {
      if(event.target.files && event.target.files.length <= props.limitCount) {
        emit('update:modelValue', [...modelValue.value, ...Array.from(event.target.files)])
      }
      else (
          errorMessage.value = `Дохуя файлов, можно не более ${props.limitCount}`,
          toast.error(`${errorMessage.value}`,{
            position: POSITION.BOTTOM_CENTER,
            timeout: 2000,
          })
      )
      if(input.value) {
        input.value.value = ''
      }
      isDragStart.value = false
    }
    const getSrc = (image) => URL.createObjectURL(image)



    function removeFile(index) {
      emit('update:modelValue', modelValue.value.filter((p, i) => i !== index))
    }

    return {
      handleInput, getSrc, input, removeFile, isDragStart
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

  .brutal-uploader__isDisabled {
    color: rgba(#fff, 0);
    border-color: $--color-main;
    background-color: $--color-huy;
    box-shadow: 2px 2px 5px 10px $--color-huy;
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
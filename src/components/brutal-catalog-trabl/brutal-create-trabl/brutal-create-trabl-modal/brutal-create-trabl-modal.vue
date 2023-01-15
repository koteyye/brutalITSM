<template>
  <brutal-modal width="900px" @close="handleClose">
    <template #content>
      <div class="brutal-trabl-modal__body">
        <div class="brutal-trabl-modal__content">
          <span class="brutal-trabl-modal__message text">Подтвердите, что вы долбаеб</span>
        </div>
      </div>
    </template>
    <template #buttons>
      <brutal-button label="Нет, я нормальный" @click="handleRoutMainPage" class="brutal-trabl-modal__button"/>
      <brutal-button label="Да, я такой" color="warning" @click="handleCreateTrabl" class="brutal-trabl-modal__button"/>
    </template>
  </brutal-modal>
</template>

<script>
import {defineComponent, ref} from "vue";
import BrutalModal from "@/components/brutal-modal/brutal-modal.vue";
import brutalButton from "@/components/button/brutal-button.vue";
import {RoutesNames} from "@/shared";
import {useRouter} from "vue-router";

export default defineComponent(
    {
      name: "brutalCreateTrablModal",
      components: {BrutalModal, brutalButton},
      emits: ['toastMessage'],
      setup(props, {emit} ) {
        const router = useRouter()
        const toastMessage = ref('')

        function handleRoutMainPage() {
          toastMessage.value = 'Ты великолепен! Мы очень рады, что ты воспользовался нашим сервисом!'
          emit('toastMessage', toastMessage.value)
          router.push({name: RoutesNames.Main})
        }

        async function handleCreateTrabl() {

        }

        return {
          handleRoutMainPage,
          handleCreateTrabl
        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/main.scss';
.brutal-trabl-modal {
  &__body {
    margin: 6px 50px;
  }
  &__content {
    display: flex;
  }
  &__message {
    font-size: 30px;
    text-align: center;
  }
  &__button {
    margin-top: 30px;
    margin-right: 30px;
    border-radius: 24px;
  }
}

</style>
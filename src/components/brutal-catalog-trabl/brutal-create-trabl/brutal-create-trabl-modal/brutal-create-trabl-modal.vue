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
      emits: ['modalResponse'],
      setup(props, {emit} ) {
        const router = useRouter()

        function handleRoutMainPage() {
          var modalResponse = new Object()
          modalResponse.toastMessage = 'Ты великолепен! Мы очень рады, что ты воспользовался нашим сервисом!'
          modalResponse.confirmTrabl = false
          emit('modalResponse', modalResponse)
        }

        async function handleCreateTrabl() {
          var modalResponse = new Object()
          modalResponse.toastMessage = 'Мы и не сомневались, что ты такой! Трабл зарегистрирован'
          modalResponse.confirmTrabl = true
          emit('modalResponse', modalResponse)
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
<template>
  <brutal-modal width="900px" @close="handleNo">
    <template #content>
      <div class="brutal-admin-modal__body">
        <div class="brutal-admin-modal__content">
          <span class="brutal-admin-modal__message text">Удалить этого идиота ?</span>
        </div>
      </div>
    </template>
    <template #buttons>
      <brutal-button label="Нет" @click="handleNo" class="brutal-admin-modal__button"/>
      <brutal-button label="Да" color="warning" @click="handleYes" class="brutal-admin-modal__button"/>
    </template>
  </brutal-modal>
</template>

<script>
import {defineComponent} from "vue";
import brutalModal from "@/components/brutal-modal";
import brutalButton from "@/components/button/brutal-button.vue";

export default defineComponent(
    {
      name: "brutal-admin-panel-delete-user-modal",
      components: {brutalModal, brutalButton},
      emits: ['modalResponse'],
      setup(props, {emit}) {

        function handleNo() {
          emit('modalResponse', false)
        }

        function handleYes() {
          emit('modalResponse', true)
        }


        return {handleNo, handleYes}

      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';
.brutal-admin-modal {
  &__body {
    margin: 6px 50px;
  }
  &__content {
    display: flex;
    place-content: center;
  }
  &__message {
    font-size: 30px;
    text-align: center;
  }
  &__button {
    margin-top: 30px;
    margin-right: 160px;
    border-radius: 24px;
  }
}
</style>
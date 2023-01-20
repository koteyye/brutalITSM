<template>
  <div class="content-page">
    <div class="brutal-trabls">
      <div class="brutal-trabls__name header_text">Мои траблы</div>
      <div class="brutal-trabls__switchers">
        <brutalButton label="В работе" :disabled="btnWorkIsDisable" class="btn1" @click="btnSwitchWork(value='work')"/>
        <brutalButton label="Архив" :disabled="btnArchIsDisable" class="btn2" @click="btnSwitchWork(value='arch')"/>
        <select v-model="selectStatus">
          <option disabled value="">Выбрать статус</option>
          <option
          v-for="(trabls, status) in getTrabls"
          :key="status"
          >{{ trabls.status }}</option>
        </select>
      </div>
      <div
      class="brutal-trabls__trabl-table">
        <brutal-trabls-table-header/>
        <brutal-trabls-table-row
        v-for="trabls in getTrabls"
        :key="trabls.id"
        :trabls="trabls"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import brutalButton from '../button/brutal-button.vue';
import BrutalTrablsTableHeader from './brutal-trabls-table-header';
import BrutalTrablsTableRow from './brutal-trabls-table-row/brutal-trabls-table-row.vue';
import useModel from '../../composables/useModels'
import useFilters from '../../composables/useFilters'

export default defineComponent(
  {
    name: "brutalTrabls",
    components: {brutalButton, BrutalTrablsTableHeader, BrutalTrablsTableRow},
    setup() {
      const btnWorkIsDisable = ref(false)
      const btnArchIsDisable = ref(true)
      const id = ref('')
      const statuses = ref([])

      function btnSwitchWork(value) {
        if(value === 'work') {
          btnWorkIsDisable.value = true
          btnArchIsDisable.value = false
        }
        else {
          btnWorkIsDisable.value = false
          btnArchIsDisable.value = true
        }
      }

      const { getTrabls } = useModel()
      console.log()
      const { getStatuses } = useFilters(getTrabls)

      return {
        btnWorkIsDisable,
        btnArchIsDisable,
        btnSwitchWork,
        getTrabls
      }
    }
  }
) 
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';

.brutal-trabls {
  min-width: 1000px;
  width: 100%;
  position: absolute;
  margin-left: 20px;
  display: grid;
  justify-content: unset;
  &__switchers {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-right: 60%;
  }
}

.header_text {
  font-size: 36px
}


</style>
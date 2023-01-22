<template>
  <div class="content-page">
    <div class="brutal-trabls">
      <div class="brutal-trabls__name header_text">Мои траблы</div>
      <div class="brutal-trabls__switchers">
        <brutalButton label="В работе" :disabled="btnWorkIsDisable" class="btn1" @click="handleSwitchWork(value='work')"/>
        <brutalButton label="Архив" :disabled="btnArchIsDisable" class="btn2" @click="handleSwitchWork(value='arch')"/>
        <div class="brutal-trabls__filter">
          <brutalFilter
          v-for="getStatus in getStatus" 
          :key="getStatus.index"
          :options="getStatus"
          :multiSelect="true"
          :name="`Выбери статус`"
          @filterValues="runFilter"/>
        </div>
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import brutalButton from '../button/brutal-button.vue';
import BrutalTrablsTableHeader from './brutal-trabls-table-header';
import BrutalTrablsTableRow from './brutal-trabls-table-row/brutal-trabls-table-row.vue';
import brutalFilter from '../brtual-filter';
import useModel from '../../composables/useModels'
import useFilters from '../../composables/useFilters'

export default defineComponent(
  {
    name: "brutalTrabls",
    components: {brutalButton, BrutalTrablsTableHeader, BrutalTrablsTableRow, brutalFilter},
    setup() {
      const btnWorkIsDisable = ref(false)
      const btnArchIsDisable = ref(true)
      const id = ref('')

      const filterStatus = ref('')
      //onst getTrablsByStatus = ref([])

      function handleSwitchWork(value) {
        if(value === 'work') {
          btnWorkIsDisable.value = true
          btnArchIsDisable.value = false
        }
        else {
          btnWorkIsDisable.value = false
          btnArchIsDisable.value = true
        }
      }

      function runFilter(status) {
        console.log(status)
        const { getTrablsByStatus } = useModel(status)
        console.log(getTrablsByStatus)
      }

      const { getTrabls, getStatus } = useModel()
      


      return {
        btnWorkIsDisable,
        btnArchIsDisable,
        handleSwitchWork,
        getTrabls,
        getStatus,
        runFilter
      }
    }
  }
) 
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main';

.brutal-trabls {
  min-width: 1000px;
  width: 90%;
  position: absolute;
  margin-left: 20px;
  display: grid;
  justify-content: unset;
  &__switchers {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-right: 80%;
    
  }
  &__filter {
    margin-left: 20px;
    position: fixed;
    left: 20%
  }
  &__filterStatus {
    padding-bottom: 35px;
    margin-left: 25px
  }
  &__filterSelector {
    font-family: MorningBreeze-Light;
    font-size: 24px;
    text-align: center;
    background-color: $--color-main;
    margin-left: 5%;
    border-radius: $radius*3;
    user-select: none;
    overflow-x:auto;
    width: min(150px);
    height: 40px;
    padding: 0 20;
    margin-top: 25px;
    border-color: $--color-main;
  }
  &__selectorTitle {
    color: rgba($--color-black, 1);
    position: relative;
    top: 50%;
    left: 20%;
    font-family: MorningBreeze-Light;
    font-size: 24px
  }
}

.header_text {
  font-size: 36px
}


</style>
<template>
  <div class="content-page">
    <div class="brutal-trabls">
      <div class="brutal-trabls__name header_text">Мои траблы</div>
      <div class="brutal-trabls__switchers">
        <brutalButton label="В работе" :disabled="btnWorkIsDisable" class="btn1" @click="handleSwitchWork(value='work')"/>
        <brutalButton label="Архив" :disabled="btnArchIsDisable" class="btn2" @click="handleSwitchWork(value='arch')"/>
        <div class="brutal-trabls__filterStatus">
          <span class="brutal-trabls__selectorTitle" v-show="selectStatus = ''">Статус</span>
          <select v-model="selectStatus"
          class="brutal-trabls__filterSelector">

            <option
            v-for="(status, index) in getStatus"
            :key="index"
            default-value=""
            >{{ status }}</option>
          </select>
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
import { defineComponent, ref, watch } from 'vue';
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

      const selectStatus = ref(null)


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

      const { getTrabls, getStatus } = useModel()
      console.log(getStatus)

      return {
        btnWorkIsDisable,
        btnArchIsDisable,
        handleSwitchWork,
        getTrabls,
        getStatus,
        selectStatus
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
    padding-right: 40%;
    
  }
  &__filterStatus {
    padding-bottom: 35px;
    margin-left: 25px
  }
  &__filterSelector {
    font-family: KistyCC;
    font-size: 24px;
    text-align: center;
    background-color: $--color-main;
    margin-left: 5%;
    border-radius: $radius*3;
    user-select: none;
    overflow-x:auto;
    width: min(150px);
    height: 40px;
  }
  &__selectorTitle {
    color: rgba($--color-black, 1);
    position: relative;
    top: 50%;
    left: 20%;
    font-family: KistyCC;
    font-size: 24px
  }
}

.header_text {
  font-size: 36px
}


</style>
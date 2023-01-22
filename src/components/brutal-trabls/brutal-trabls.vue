<template>
  <div class="content-page">
    <div class="brutal-trabls">
      <div class="brutal-trabls__name header_text">Мои траблы</div>
      <div class="brutal-trabls__switchers">
        <brutalButton label="В работе" :disabled="btnWorkIsDisable" class="btn1" @click="handleSwitchWork(value='work')"/>
        <brutalButton label="Архив" :disabled="btnArchIsDisable" class="btn2" @click="handleSwitchWork(value='arch')"/>
      </div>
      <div
      class="brutal-trabls__trabl-table">
        <brutal-trabls-table-header/>
        <brutal-trabls-table-row
        v-show="btnWorkIsDisable"
        v-for="trabls in getTrabls"
        :key="trabls.id"
        :trabls="trabls"
        @clickItem="handleTrablItem"
        />
        <brutal-trabls-table-row
        v-show="btnArchIsDisable"
        v-for="trabls in getTrablsArch"
        :key="trabls.id"
        :trabls="trabls"
        @clickItem="handleTrablItem"
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
import useModel from '../../composables/useModels'
import { RoutesNames } from '@/shared';
import { useRouter } from 'vue-router';

export default defineComponent(
  {
    name: "brutalTrabls",
    components: {brutalButton, BrutalTrablsTableHeader, BrutalTrablsTableRow},
    setup() {
      
      const btnWorkIsDisable = ref(true)
      const btnArchIsDisable = ref(false)
      const id = ref('')
      const router = useRouter()

      const { getTrabls, getTrablsArch } = useModel()

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

      function handleTrablItem(id) {
        router.push({name: RoutesNames.TrablsItem, params: {id: id}})
      }



      return {
        btnWorkIsDisable,
        btnArchIsDisable,
        handleSwitchWork,
        getTrabls,
        getTrablsArch,
        handleTrablItem
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
}

.header_text {
  font-size: 36px
}


</style>
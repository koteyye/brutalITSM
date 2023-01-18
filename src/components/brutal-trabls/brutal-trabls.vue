<template>
  <div class="content-page">
    <div class="brutal-trabls">
      <div class="brutal-trabls__name header_text">Мои траблы</div>
      <div class="brutal-trabls__switchers">
        <brutalButton label="В работе" :disabled="true" class="btn1"/>
        <brutalButton label="Архив" class="btn2"/>
      </div>
      <div class="brutal-trabls__trabl-table">
        <brutal-trabls-table-header/>
        <brutal-trabls-table-row/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import brutalButton from '../button';
import BrutalTrablsTableHeader from './brutal-trabls-table-header';
import BrutalTrablsTableRow from './brutal-trabls-table-row/brutal-trabls-table-row.vue';

export default defineComponent(
  {
    name: "brutalTrabls",
    components: {brutalButton, BrutalTrablsTableHeader, BrutalTrablsTableRow}
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
<template >
    <div class="brutal-trabls-table-header">
        <div class="header_text brutal-trabls-table-header__number">№</div>
        <div class="header_text brutal-trabls-table-header__iniciator">Инициатор</div>
        <div class="header_text brutal-trabls-table-header__type">Тип</div>
        <div class="header_text brutal-trabls-table-header__workgroup">Рабочая группа</div>
        <div class="header_text brutal-trabls-table-header__status">Статус</div>
        <div class="header_text brutal-trabls-table-header__deadline">Срок</div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent(
    {
        name: "brutalTrablsTableHeader"
    }
)
</script>
<style lang="scss">
@import '../../../assets/styles/main';


.brutal-trabls-table-header {
    width: 100%;
    min-width: 1000px;
    text-align: center;
    display: flex;
    border-bottom: solid 1px rgba($--color-verygray, 0.2);
    &__number {
        flex-basis: 15%;
    }
    &__iniciator {
        flex-basis: 15%;
    }
    &__type {
        flex-basis: 20%;
    }
    &__workgroup {
        flex-basis: 20%;
    }
    &__status {
        flex-basis: 10%;
    }
    &__deadline {
        flex-basis: 20%;
    }
}

.header_text {
    margin: 5px 5px;
    padding: 15px;
}

    
</style>
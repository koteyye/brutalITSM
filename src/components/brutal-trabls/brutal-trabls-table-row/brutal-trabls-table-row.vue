<template>
    <div class="brutal-trabls-table">
        <div class="brutal-trabls-table-rows">
            <div class="text brutal-trabls-table-rows__number">{{ trabls.number }}</div>
            <div class="text brutal-trabls-table-rows__iniciator">{{ trabls.initiatr }}</div>
            <div class="text brutal-trabls-table-rows__type">{{ trabls.type }}</div>
            <div class="text brutal-trabls-table-rows__workgroup">{{ trabls.title }}</div>
            <div class="text brutal-trabls-table-rows__status">{{ trabls.status }}</div>
            <div class="text brutal-trabls-table-rows__deadline">{{ trabls.deadline }}</div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent(
    {
        name: "brutalTrablsTableRow",
        props: {
            trabls: {
                type: Object,
                default() {
                    return{}
                }
            }
        },
        setup(props) {
        return {}
        }
    }
)
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/main';

.brutal-trabls-table-rows {
    width: 100%;
    min-width: 1000px;
    display: flex;
    flex-basis: 16%;
    text-align: center;
    cursor: pointer;
    &:hover {
        background: rgba($--color-verygray, 0.2)
    }
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

.text {
    margin: 5px 5px;
    padding: 15px;
}
    




</style>
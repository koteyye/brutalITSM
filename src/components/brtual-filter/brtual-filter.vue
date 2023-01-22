<template>
    <div class="brutal-filter">
        <div class="brutal-filter__field">
            <span class="brutal-filter__name">{{ name }}</span>
            <fa 
            v-if="chevronDownShow"
            icon="fa-solid fa-chevron-up" 
            @click="handleShowChevron" 
            class="brutal-filter__chevron-down"/>
            <fa 
            v-else
            icon="fa-solid fa-chevron-down" 
            @click="handleShowChevron" 
            class="brutal-filter__chevron-down"/>
        </div>
    </div>
    <div v-show="chevronDownShow"
        class="brutal-filter__chevron-down-values">
        <div v-for="values in options" 
            :key="values"
            class="brutal-filter__values"
            >
            <!-- <input type="checkbox" value="value" v-model:value=""/>
            <label for="values">{{ values }}</label> -->
            <ul class="brutal-filter__chevron-down-items" @click="handleRunFilter(values)">{{ values }}</ul>
        </div>
        <!-- <div class="brutal-filter__runarea">
        <span class="brutal-filter__run" @click="handleRunFilter">Применить {{ selectedValues }}</span> -->
    <!-- </div> -->
    </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
    name: "brutalFilter",
    props: {
        name: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default() {
                return []
            }
        },
        multiSelect: {
            type: Boolean,
            default: false
        }
    },
    emits: ['filterValues'],
    setup(props, {emit}) {
        const chevronDownShow = ref(false)


        

        function handleShowChevron() {
            if(chevronDownShow.value === true) {
                chevronDownShow.value = false
            }
            else {chevronDownShow.value = true}
        }

        function handleRunFilter(values) {
            emit('filterValues', values)
            chevronDownShow.value = false
        }

        return {
            chevronDownShow,
            handleShowChevron,
            handleRunFilter
        }
    }
})
</script>
<style lang="scss">
@import '../../assets/styles/main';

.brutal-filter {
    background-color: $--color-main;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    border-radius: $radius*3;
    font-family: MorningBreeze-Bold;
    font-size: 24px;
    &__field {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
    }
    &__chevron-down {
        cursor: pointer;
    }
    &__chevron-down-values {
        background-color: $--color-main;
        padding: 0 20px;
        width: 100%;
        border-bottom-left-radius: $radius*3;
        border-bottom-right-radius: $radius*3;
        font-family: MorningBreeze-Light;
        font-size: 20px;
    }
    &__chevron-down-items {
        cursor: pointer;
        padding-top: 10px;
        padding-bottom: 10px;
        &:hover{
            background-color: rgba($--color-verygray, 0.5)
        }
    }
    &__runarea {
        text-align: end;
    }
    &__run {
        color: $--color-black;
    }
    // &__values {
    //     cursor: pointer;
    //     &:hover {
    //         background: rgba($--color-verygray, 0.2)
    //     }
    // }
}


</style>
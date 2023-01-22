<template>
    <div class="brutal-trabls-item">
        <div class="brutal-trabls-item__area-trabl">
            <div class="brutal-trabls-item__area-name header_text">
                Трабл
            </div>
            <div class="brutal-trabls-item__btns">
                <brutalButton label="Основная инфа" :disabled="btnMainInfo" @click="handleSwitchSection(switcher=1)"/>
                <brutalButton label="Пруфы" :disabled="btnPrufs" @click="handleSwitchSection(switcher=2)"/>
                <brutalButton label="История" :disabled="btnHistory" @click="handleSwitchSection(switcher=3)"/>
            </div>
            <div class="brutal-trabls-item__maininfo"
                v-show="btnMainInfo"
                v-for="trabl in getTrablsById"
                :key="trabl.id">
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Номер трабла</label>
                    <span class="field-value">{{trabl.number}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Статус</label>
                    <span class="field-value">{{trabl.status}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Инициатор</label>
                    <span class="field-value">{{trabl.initiatr}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Заинтересованное лицо</label>
                    <span class="field-value">{{trabl.interest}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Тип трабла</label>
                    <span class="field-value">{{trabl.type}}</span>
                </div>
                <div class="brutal-trabls-item__fields"
                v-show="trabl.pcNumber !== ''">
                    <label class="field-name text">Номер компуктера</label>
                    <span class="field-value">{{trabl.pcNumber}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Локация</label>
                    <span class="field-value">{{trabl.location}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Рабочая группа</label>
                    <span class="field-value">{{trabl.workgroup}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Тема</label>
                    <span class="field-value">{{trabl.title}}</span>
                </div>
                <div class="brutal-trabls-item__fields">
                    <label class="field-name text">Подробное описание</label>
                    <span class="field-value">{{trabl.description}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import brutalButton from '@/components/button';
import useModels from '@/composables/useModels';
import { useRoute } from 'vue-router';

export default defineComponent(
    {
    name: "brutalTrablsItem",
    components: {brutalButton},
    setup() {
        const route = useRoute()
        const id = ref('')
        const btnMainInfo = ref(true)
        const btnPrufs = ref(false)
        const btnHistory = ref(false)
        
        function handleSwitchSection(switcher) {
            console.log(switcher)
            if(switcher === 1) {
                btnMainInfo.value = true
                btnPrufs.value = false
                btnHistory.value = false
            }
            else if(switcher === 2) {
                btnMainInfo.value = false
                btnPrufs.value = true
                btnHistory.value = false
            }
            else {
                btnMainInfo.value = false
                btnPrufs.value = false
                btnHistory.value = true
            }
            console.log(`btnMainInfo = ${btnMainInfo.value}`, `btnPrufs = ${btnPrufs.value}`, `btnHistory = ${btnHistory.value}`)
        }

        onMounted(() => id.value = route.params.id)

        const {getTrablsById} = useModels(id)
        console.log(getTrablsById)
        return {
            getTrablsById,
            handleSwitchSection,
            btnMainInfo,
            btnPrufs,
            btnHistory
        }
    }
    }
) 
</script>
<style lang="scss">
@import '../../../assets/styles/main';

.brutal-trabls-item {
    margin: auto;
    &__area-trabl {
        min-width: 800px;
        max-width: 1400px;
        position: absolute;
        left: 30%;
        margin-top: 100px;
        border: solid 1px $--color-apsidgray;
    };
    &__area-name {
        font-size: 36px;
    };
    &__btns {
        display: flex;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &__maininfo {
        display: grid;
    }
    &__fields {
        display: flex;
        margin-bottom: 10px;
        padding: 10px;
    }
}



.field-name {
    flex-basis: 50%;
    text-align: center;
}
.field-value {
    flex-basis: 50%;
    text-align: left;
    background-color: $--color-maindef;
    border-radius: $radius*3;
    padding: 10px;
    font-family: MorningBreeze-Light;
}




</style>
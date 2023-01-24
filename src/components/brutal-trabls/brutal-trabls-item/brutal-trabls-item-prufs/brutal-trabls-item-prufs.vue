<template>
  <div class="brutal-trabls-item-prufs">
    <div class="brutal-trabls-item-prufs__prufsFile">
      <img
        v-show="trablInfo.prufs.mimeType === 'image/jpeg'"
        :src="pruf"
        alt="img"
        class="cursor-pointer"
        height="300"
        width="300"
        @click="handlePrufsClick"/>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {filepath} from "@/shared/path-names";

export default defineComponent(
    {
      name: "brutalTrablsItemPrufs",
      props: {
        trablInfo: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      setup(props) {
        const objectPrufs = ref(props.trablInfo.prufs)

        const pruf = ref([])




        onMounted(() => getPrufs())

        function getPrufs() {

        }

        return {

        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/main';

</style>
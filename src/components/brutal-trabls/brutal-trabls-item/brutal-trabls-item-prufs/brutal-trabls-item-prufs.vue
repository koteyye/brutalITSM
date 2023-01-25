<template>
  <div class="brutal-trabls-item-prufs">
    <div class="brutal-trabls-item-prufs__prufsFile"
    v-for="(prufsObj, index) in prufs"
    :key="index"
    >
      <img
        v-show="checkMimeType(prufsObj.mimeType)"
        :src="prufsObj.src"
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
          type: Array,
          default() {
            []
          }
        }
      },
      setup(props) {
        const objectPrufs = ref(props.trablInfo.prufs)
        

        
        //const prufs = computed(() => props.trablInfo.map((item) => `${filepath}${item.s3}`))

        const prufs = computed(() => props.trablInfo.map((item) => ({mimeType: item.mimeType, src: `${filepath}${item.s3}`})))


        console.log(prufs.value)

        
        function checkMimeType(type) {
          const aaa = type.includes('image')
          console.log({type, bol: aaa})
          return aaa
        }

        onMounted(() => getPrufs())

        function getPrufs() {

        }

        return {
          checkMimeType,
          prufs
        }
      }
    }
)
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/main';

</style>
<template>
  <div class="brutal-create__page">
    <div class="brutal-create__trabl-form">
      <div class="brural-create__head text">Оформление трабла</div>
      <div class="brutal-create__fields">
        <div class="brutal-create__iniciator fields">
          <label class="brutal-create__iniciator-field-name text fieldname">Инициатор</label>
          <input v-model="iniciator" class="brutal-create__iniciator-field fieldinput"/>
        </div>
        <div class="brutal-create__interes fields">
          <label class="brutal-create__interes-field-name text fieldname" >Заинтересованное лицо</label>
          <input v-model="interes" class="brutal-create__interes-field fieldinput"/>
        </div>
        <div class="brutal-create__typeTrabl fields">
          <label class="brutal-create__typeTrabl-field-name text fieldname">Тип трабла</label>
          <input v-model="typeTrabl" class="brutal-create__typeTrabl-field fieldinput"/>
        </div>
        <div class="brutal-create__compucter fields">
          <label class="brutal-create__compucter-field-name text fieldname">Номер компуктера</label>
          <input v-model="compucter" class="brutal-create__compucter-field fieldinput"/>
        </div>
        <div class="brutal-create__location fields">
          <label class="brutal-create__location-field-name text fieldname">Локация</label>
          <input v-model="locationn" class="brutal-create__location-field fieldinput"/>
        </div>
        <div class="brutal-create__pisanina fields">
          <label class="brutal-create__pisanina-field-name text fieldname">Подробное описание трабла</label>
          <textarea v-model="pisanina" placeholder="Максимально подробно пиши о своем трабле" class="brutal-create__pisanina-field fieldinput"/>
        </div>
        <div class="brutal-create__prufs">
    <!--        Сюда лоэдер-->
        </div>
        <div class="brutal-create__btn">
          <brutal-button label="Отправить эту хуйню"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import brutalButton from "@/components/button/brutal-button.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "brutalCreateTrabl",
  components: {brutalButton},
  setup() {


    return {
      //iniciator, interes, typeTrabl, compucter, locationn, pisanina
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.brutal-create__page {
  width: 100%;
  text-align: -webkit-center;
}

.brutal-create__trabl-form {
  margin-top: 30px;
  padding: 0px 20px;
  border: solid 1px $--color-apsidgray;
  max-width: 1000px;
  margin-left: 20px;
}

.brural-create__head {
  text-align: center;
}

.brutal-create__fields {
  display: grid;
  grid-row-gap: 24px;
  max-width: 920px;
  max-height: 870px;
  margin-top: 20px
}

.fields {
  text-align: center;
  display: flex;
}

.fieldinput {
  border-radius: $radius*3;
  padding-left: 20px;
  flex-basis: 50%;
  font-family: KistyCC;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: $--color-apsidgray;
}

.fieldname {
  flex-basis: 50%;
}

.brutal-create__pisanina-field {
  height: 220px;
}

textarea::placeholder {
  color: #bcc0bc;
}

.brutal-create__btn {
  text-align: center;
}

</style>
<template>
  <div class="contact-info">
    <h2 class="contact">Контакты</h2>
    <div class="text preview-contact">Если вы хотите, чтобы вас послали нахуй, вы можете воспользоваться одним из следующих каналов связи:</div>
    <div class="phone">
      <brutal-button icon="fa-solid fa-phone"/>
      <div class="text phone__name">Телефон:</div>
      <div class="title phone__number">34444</div>
    </div>
    <div class="email">
      <brutal-button icon="fa-solid fa-envelope"/>
      <div class="text email__name">Email</div>
      <div class="title email__value">sd@dme.ru</div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import brutalButton from "@/components/button/brutal-button.vue";

export default defineComponent( {
  name: "brutalContactInfo",
  components: {brutalButton},
  setup() {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main';

.contact-info {
  border: solid 1px $--color-apsidgray;
  margin-top: 10px;
  max-width: 350px;
}

.contact {
  color: $--color-text;
  font-family: Faceless;
  font-size: 30px;
  letter-spacing: 10px;
  text-align: center;
}


.phone {
  display: flex;
  padding-left: 5px;
  &__name {
    margin: auto;
  }
}

.email {
  display: flex;
  padding-bottom: 10px;
  padding-left: 5px;
  &__name {
    margin: auto
  }
}

.preview-contact {
  padding: 10px;
  text-align: center;
}

</style>
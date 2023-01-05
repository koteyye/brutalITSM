<template>
  <div class="main-page">

    <div class="brutal-news__main">
      <h1 class="news__title">Новости</h1>
      <brutal-news
          v-for="(news, index) in news"
          :key="index"
          :news-data="news"/>
    </div>
    <div class="contacsinfo">
      <brutal-contact-info/>
    </div>

  </div>
</template>

<script>
import {news} from "@/components/main-page/news";
import {defineComponent} from "vue";
import brutalNews from "@/components/main-page/brutal-news";
import brutalContactInfo from "@/components/main-page/brutal-contact-info";

export default defineComponent({
  name: "MainPage",
  components: {
    brutalNews, brutalContactInfo
  },
  props: {},
  setup() {
    return {
      news
    }
  }
})
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

.news__title {
  color: $--color-text;
  font-family: Faceless;
  font-size: 30px;
  letter-spacing: 10px;
  text-align: center;
}

.main-page {
  display: flex;
  margin-right: 20px;
}

.brutal-news__main {
  border: solid 1px $--color-apsidgray;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 1400px;
}

</style>
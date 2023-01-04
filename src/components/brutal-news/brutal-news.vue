<template>
  <div class="brutal-news">
    <div class="title news">
      <div class="text brutal-news__item">
        <h2 class="theme">{{newsData.theme}}</h2>
        <div class="img">
          <img :src="newsImg" alt="img" class="cursor-pointer">
        </div>
        <div class="row autor">
          <div class="field">Автор:</div>
          <div class="value">{{newsData.author}}</div>
        </div>
        <div class="row autor">
          <div class="field">Дата публикации:</div>
          <div class="value">{{newsData.date_public}}</div>
        </div>
        <div class="content">{{newsData.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
//import brutalNewsContent from "@/components/brutal-news-content";

export default  defineComponent({
  name: "brutalNews",
  props: {
    newsData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {


    const newsImg = computed(() => `/image/${props.newsData.image}`)

    function handleNewsClick() {
      //Открыть новость
    }

    return {
      handleNewsClick, newsImg
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';

.theme {
  text-align: left;
  padding-bottom: 10px;
}

img {
  border-radius: $radius*5;
  max-height: 800px;
}

.row {
  text-align: left;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}

.field {
  margin-right: 10px;
  font-size: 15px;
}
.value {
  margin: auto 10px;
}

.content {
  text-align: left;
}

</style>
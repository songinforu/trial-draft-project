<script setup>
import { getHomeList } from "@/api";
import { onMounted, ref } from "vue";
import { IMG_URL } from "@/api/config/base-url";
import line from '@/assets/images/line.svg'

const homeList = ref([]);

onMounted(() => {
  getHomeList().then((res) => {
    homeList.value = res.content.map((o) => {
      o.imgUrl = IMG_URL + o.imgPath;
      return o;
    });
  });
});
</script>

<template>
  <div class="home-list-container">
    <div class="home-list-center-wrapper">
      <p class="title flex items-center justify-center flex-col">
        合作伙伴
        <img :src="line" alt="" width="144" height="1">
      </p>
      <div class="mt-32px grid grid-cols-6 gap-16px">
        <div class="h-126px" v-for="item in homeList" :key="item.id">
          <img class="w-224px h-full" :src="item.imgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-list-container {
  height: 484px;
  background: url(@/assets/images/home-list-bg.png) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  .home-list-center-wrapper {
    width: 1424px;
    margin: 0 auto;
    .title {
      font-family: "FZJUNH_CUJW--GB1-0";
      font-size: 28px;
      color: #02112d;
      letter-spacing: 0;
      text-align: center;
      line-height: 64px;
      font-weight: 400;
      margin-top: 60px;
    }
  }
}
</style>

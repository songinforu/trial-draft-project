<script setup>
import topLeft from "@/assets/images/top-left.png";
import topRight from "@/assets/images/top-right.png";
import bottomLeft from "@/assets/images/bottom-left.png";
import bottomRight from "@/assets/images/bottom-right.png";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      email: null,
      orderNum: null,
      lat: null,
      lng: null,
      introduction: null,
      userId: null,
      address: null,
      name: null,
      id: null,
      type: null,
    }),
  },
  coordinate: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    }),
  },
});

const colorList = [
  {
    type: "cn",
    color: "#F2EA3F",
  },
  {
    type: "sj",
    color: "#1DEBFF",
  },
  {
    type: "xq",
    color: "#B4FACA",
  },
  {
    type: "gyl",
    color: "#B793FF ",
  },
  {
    type: "wl",
    color: "#FBD8B5",
  },
];

function getColor(type) {
  const colorObj = colorList.find((item) => item.type === type);
  return colorObj?.color || "#979797";
}
</script>

<template>
  <div class="dialog-container" :style="{ top: coordinate.y + 'px', left: coordinate.x + 'px' }">
    <div class="w-full h-17px flex justify-between">
      <img :src="topLeft" alt="" width="17px" height="17px" />
      <img :src="topRight" alt="" width="17px" height="17px" />
    </div>
    <div class="flex-1">
      <main class="p-18px flex">
        <div
          class="w-6px h-6px rounded-full mt-8px"
          :style="{ background: getColor(data.type) }"
        ></div>
        <div class="ml-6px flex-1">
          <h5>{{ data.name }}</h5>
          <div class="mt-2px mb-8px">
            <span class="mr-12px text-white">需求方</span>
            <span class="text-white">个人商家</span>
          </div>
          <p> <span class="mr-8px">简介:</span>{{ data.introduction }}</p>
          <p> <span class="mr-8px">成交量:</span>{{ data.orderNum }}</p>
          <p> <span class="mr-8px">邮箱:</span>{{ data.email }}</p>
          <p> <span class="mr-8px">地址:</span>{{ data.address }}</p>
          <footer>查看商家样品示例 ></footer>
        </div>
      </main>
    </div>
    <div class="w-full h-17px flex justify-between">
      <img :src="bottomLeft" alt="" width="17px" height="17px" />
      <img :src="bottomRight" alt="" width="17px" height="17px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-container {
  width: 242px;
  min-height: 252px;
  background: rgba(21, 27, 38, 0.8);
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  main {
    h5 {
      padding: 0;
      margin: 0;
      font-family: "PingFangSC-Regular";
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      font-weight: 400;
    }
    .text-white {
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #ffffff;
      line-height: 20px;
      font-weight: 400;
    }
    p {
      opacity: 0.7;
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #ffffff;
      line-height: 22px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    footer {
      font-family: "PingFangSC-Medium";
      font-size: 12px;
      color: #1492ff;
      line-height: 20px;
      font-weight: 500;
    }
  }
}
</style>

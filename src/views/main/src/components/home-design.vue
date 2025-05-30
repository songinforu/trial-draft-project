<script setup>
import { getHomeDesignList } from "@/api";
import { onMounted, ref } from "vue";
import { IMG_URL } from "@/api/config/base-url";
import line from "@/assets/images/line.svg";
import starAll from "@/assets/images/star-all.png";
import starHalf from "@/assets/images/star-half.png";
import starEmpty from "@/assets/images/star-empty.png";
import addressIcon from "@/assets/images/address-icon.png";
import eyesIcon from "@/assets/images/eyes-icon.png";
import heartIcon from "@/assets/images/heart-icon.png";
import rightArrow from "@/assets/images/right-arrow.png";
import cooperation from "@/assets/images/cooperation.png";
import hasCertificate from "@/assets/images/hascertificate.png";
const mainList = ref([]);

onMounted(() => {
  getHomeDesignList().then((res) => {
    mainList.value = res.map((o) => {
      o.imgUrl = IMG_URL + o.designFile;
      o.logoUrl = IMG_URL + o.logo;
      o.labelNames = o.labelName.split(",");
      if (o.provName && o.cityName) {
        o.address = `${o.provName}·${o.cityName}`;
      }
      return o;
    });
  });
});

const generateStars = (score) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(starAll);
  }
  if (hasHalfStar) {
    stars.push(starHalf);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(starEmpty);
  }
  return stars;
};

const isHover = ref(null);
const handleMouseEnter = (item) => {
  isHover.value = item.id;
};

const handleMouseLeave = (item) => {
  isHover.value = null;
};
</script>

<template>
  <div class="demand-homeList-container">
    <div class="demand-homeList-center-wrapper">
      <p class="title flex items-center justify-center flex-col">
        原创设计工作室＆独立设计师
        <img :src="line" alt="" width="144" height="1" />
      </p>
      <div class="mt-32px grid grid-cols-3 gap-16px">
        <div
          class="card-item relative"
          v-for="item in mainList"
          :key="item.id"
          @mouseenter="handleMouseEnter(item)"
          @mouseleave="handleMouseLeave(item)"
        >
          <div>
            <img :src="item.imgUrl" alt="" width="380" height="184" />
          </div>
          <div class="p-24px pt-20px">
            <div class="flex items-center">
              <img
                :src="item.logoUrl"
                alt=""
                width="50.63"
                height="50.63"
              />
              <div class="flex-1 ml-8px">
                <p class="card-item-title">
                  {{ item.name }}
                  <template v-if="item.state">
                    <img :src="hasCertificate" alt="" width="68" height="24" />
                  </template>
                </p>
                <div class="flex mt-12.4px mb-10px">
                  <div class="flex items-center mr-8px">
                    <img
                      v-for="i in generateStars(item.score)"
                      :key="i"
                      :src="i"
                      alt=""
                      width="16"
                      height="16"
                    />
                  </div>
                  <span class="star-wrapper">{{ item.score }}</span>
                </div>
              </div>
            </div>

            <nav class="h-20px overflow-hidden">
              <span class="nav-item" v-for="o in item.labelNames" :key="o">{{
                o
              }}</span>
            </nav>
            <p class="device-wrapper">
              {{ item.introduction }}
            </p>
            <div class="address-wrapper">
              <div class="flex items-center">
                <img :src="addressIcon" alt="" width="16" height="16" />
                <span class="ml-4px">{{ item.address }}</span>
              </div>
              <div class="flex items-center">
                <div class="flex items-center">
                  <img :src="eyesIcon" alt="" width="16" height="16" />
                  <span class="ml-4px">{{ item.seeNum }}万</span>
                </div>
                <div class="flex items-center ml-14px">
                  <img :src="heartIcon" alt="" width="16" height="16" />
                  <span class="ml-4px">{{ item.enshrinesNum }}</span>
                </div>
                <div class="flex items-center ml-14px">
                  <img :src="cooperation" alt="" width="16" height="16" />
                  <span class="ml-4px">{{ item.orderNum }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="isHover == item.id"
              class="w-full h-72px absolute bottom-0 bg-#FFFFFF left-0 flex items-center justify-center"
            >
              <p
                class="look-detail-wrapper flex items-center justify-center cursor-pointer"
              >
                查看详情
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="more-wrapper">
        查看更多
        <img class="ml-4px" :src="rightArrow" alt="" width="24" height="24" />
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demand-homeList-container {
  height: 1077px;
  background: url(@/assets/images/home-design-bg.png) no-repeat center
    center;
  background-size: 100% 100%;
  overflow: hidden;
  .demand-homeList-center-wrapper {
    width: 1200px;
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
    .card-item {
      width: 380px;
      height: 386px;
      background: #ffffff;
      box-shadow: 0px 2px 16px 0px rgba(9, 48, 30, 0.08);
      font-family: "PingFangSC-Medium";
      overflow: hidden;
      .card-item-title {
        width: 100%;
        font-size: 18px;
        color: #151b26;
        line-height: 24px;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        justify-content: space-between;
      }
      .star-wrapper {
        font-size: 12px;
        color: #ff9326;
        line-height: 20px;
        font-weight: 600;
      }
      .nav-item {
        border: 1px solid rgba(247, 247, 249, 1);
        border-radius: 2px;
        opacity: 0.95;
        font-size: 12px;
        color: #303540;
        line-height: 20px;
        font-weight: 400;
        background: #f7f7f9;
        margin-right: 16px;
        padding: 0 8px;
      }

      .device-wrapper {
        height: 20px;
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        color: #5c5f66;
        line-height: 22px;
        font-weight: 400;
        overflow: hidden;
        margin-top: 12px;
      }
      .address-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #5c5f66;
        line-height: 22px;
        font-weight: 400;
        margin-top: 20px;
      }
      .look-detail-wrapper {
        border: 1px solid rgba(20, 146, 255, 1);
        background: #1492ff;
        width: 208px;
        height: 38px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 22px;
        font-weight: 400;
      }
    }
    .more-wrapper {
      margin-top: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "PingFangSC-Regular";
      font-size: 18px;
      color: #666b7f;
      line-height: 32px;
      font-weight: 400;
    }
  }
}
</style>

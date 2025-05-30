<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logo.png";

const navList = ref([
  {
    id: 1,
    name: "首页",
  },
  {
    id: 2,
    name: "需求中心",
  },
  {
    id: 3,
    name: "设计中心",
  },
  {
    id: 4,
    name: "产能中心",
  },
  {
    id: 5,
    name: "供应链",
  },
  {
    id: 6,
    name: "物流服务",
  },
  {
    id: 7,
    name: "时尚活动",
  },
]);
const activeNav = ref(1);

const handleNavClick = (id) => {
  activeNav.value = id;
};
</script>

<template>
  <div class="nav-view-container">
    <div class="nav-view-title center-wrapper">
      <div class="flex justify-between pt-43px">
        <div class="nav-view-title-left flex">
          <img class="mr-16px" :src="logo" alt="logo" />
          <p>某某工业互联网平台</p>
        </div>
        <div class="nav-view-title-right">
          <div>登录</div>
          <div class="register">注册</div>
        </div>
      </div>
    </div>
    <div class="nav-view-content">
      <div class="center-wrapper h-full flex">
        <div class="flex-1 h-full flex justify-center active-item" v-for="item in navList" :key="item.id" @click="handleNavClick(item.id)">
          <div class="w-1/2 font-wrapper flex items-center justify-center" :class="{ active: item.id === activeNav }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-view-container {
  .nav-view-title {
    height: 110px;
    .nav-view-title-left {
      img {
        width: 48px;
        height: 36px;
      }
      p {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #151a26;
        letter-spacing: 0;
        font-weight: 500;
        margin: 0;
      }
    }
    .nav-view-title-right {
      display: flex;
      align-items: center;
      opacity: 0.95;
      font-family: "PingFangSC-Regular";
      font-size: 14px;
      color: #080e1a;
      font-weight: 400;

      .register {
        margin-left: 24px;
        width: 52px;
        height: 28px;
        border: 1px solid rgba(20, 146, 255, 1);
        border-radius: 2px;
        color: #ffffff;
        line-height: 28px;
        text-align: center;
        background: #1492ff;
      }
    }
  }
  .nav-view-content {
    width: 100%;
    height: 50px;
    background: #1492ff;
    .active-item {
      cursor: pointer;
      color: #ffffff;
      font-weight: 400;
      &:hover {
        font-weight: 600;
      }
    }
    .font-wrapper {
      height: 96.5%;
      font-family: "PingFangSC-Regular";
      font-size: 16px;
      text-align: center;
    }
    .active {
      font-weight: 600;
      border-bottom: 1.5px solid #FFFFFF;
    }
  }
}
</style>

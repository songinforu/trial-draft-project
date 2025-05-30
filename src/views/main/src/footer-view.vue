<script setup>
import address from "@/assets/images/address.png";
import email from "@/assets/images/email.png";
import rectangle from "@/assets/images/rectangle.png";
import qrCode from "@/assets/images/qrCode.png";
import u155 from "@/assets/images/u155.png";
</script>

<template>
  <div class="footer-view">
    <div class="center-wrapper">
      <p class="title">联系我们</p>
      <p class="sub-title">Contact Us</p>
      <main class="main-wrapper flex">
        <div class="main-left">
          <div class="flex items-center ml-20px">
            <img class="w-39px h-50px mr-41px" :src="address" alt="" />
            <p>地址：海淀区百度科技园</p>
          </div>
          <div class="flex mt-45px items-center ml-20px">
            <img class="w-40px h-31px mr-40px" :src="email" alt="" />
            <p>电子邮件：xxxx@xx.com</p>
          </div>
        </div>
        <div class="main-right">
            <div class="main-right-rectangle">
                <img class="w-160px h-160px"  :src="qrCode" alt="">
                <img class="w-160px h-160px absolute top-40px left--71px"  :src="u155" alt="">
            </div>
        </div>
      </main>
      <footer>
        <div class="ml-6px mr-47.12px">友情链接</div>
        <div class="mr-47.12px">桐乡市人民政府</div>
        <div>桐乡市经信局</div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-view {
  height: 500px;
  background: url(@/assets/images/footer-bg.png) no-repeat center center;
  background-size: 100% 100%;
  .title {
    font-family: "FZJUNH_CUJW--GB1-0";
    font-size: 36px;
    color: #ffffff;
    letter-spacing: 1.5px;
    text-align: center;
    font-weight: 400;
    padding-top: 60px;
    margin: 0;
    height: 41px;
  }
  .sub-title {
    width: 202px;
    height: 32px;
    opacity: 0.8;
    font-family: Helvetica;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 32px;
    font-weight: 400;
    margin: 0 auto;
  }
  .main-wrapper {
    height: 240px;
    border-bottom: 1px solid rgba(123, 127, 144, 0.5);
    .main-left {
      flex: 1;
      opacity: 0.8;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      text-align: left;
      line-height: 26px;
      font-weight: 400;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .main-right {
      flex: 1;
      .main-right-rectangle{
        height: 100%;
        width: 448px;
        margin-left: auto;
        background: url(@/assets/images/rectangle.png) no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  footer {
    height: 126px;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #ffffff;
    text-align: left;
    line-height: 30px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
}
</style>

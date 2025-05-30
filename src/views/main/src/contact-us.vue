<script setup></script>

<template>
  <div class="contact-us-container">
    <span>联系我们</span>
  </div>
</template>

<style lang="scss" scoped>
.contact-us-container {
  width: 44px;
  height: 142px;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(116, 91, 57, 0.08);
  cursor: pointer;
  border-radius: 4px;
  position: fixed;
  bottom: 212px;
  right: 12px;
  z-index: 9999;
  color: #1492ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    width: 16px;
    height: 88px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
  }
  &:hover {
    background: #1492ff;
    color: #ffffff;
  }
}
</style>

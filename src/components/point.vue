<script setup>
import { computed } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "lightblue",
  },
  speedParam: {
    type: Number,
    default: 2,
  },
});
const speed = computed(() => {
  return props.speedParam + "s";
});
</script>

<template>
  <div>
    <div
      class="point-wrapper"
      :style="{ borderColor: color, boxShadow: `0 0 10px ${color}` }"
    >
      <div
        class="point-content"
        :style="{ backgroundColor: color, animationDuration: speed }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.point-wrapper {
  width: 24px;
  height: 24px;
  border: 2px solid;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .point-content {
    width: 16px;
    height: 16px;
    border-radius: 20px;
    animation: breatheContent infinite ease-in-out;
  }

  @keyframes breatheContent {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
}
</style>

<script setup>
import { h, onMounted, ref, render } from "vue";
import tongxiang from "@/assets/json/tongxiang.json";
import mapImg from "@/assets/images/map.png";
import { getCompanyList, getPersonList } from "@/api";
import { createPointDom } from "./hooks/createPointDom.js";
import Dialog from "@/components/dialog.vue";
const components = {
  Dialog,
};
const mapLoaded = ref(false);
const pStart = ref(null);
const pEnd = ref(null);
// 加载百度地图WebGL API（兼容MapMask）
const loadMapScript = () => {
  return new Promise((resolve, reject) => {
    // 1. 移除旧脚本
    document
      .querySelectorAll("script.loadmap")
      .forEach((script) => script.remove());

    // 2. 加载主API（必须使用WebGL版）
    const script = document.createElement("script");
    script.className = "loadmap";
    script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=qOeVC2vV8Nlqb0fAhCFuNsOtCeSv1XbS&callback=initBMapGL`;

    // 3. 全局回调（API加载完成后执行）
    window.initBMapGL = () => {
      // 4. 检查MapMask是否存在（部分AK可能无权限）
      if (!window.BMapGL || !window.BMapGL.MapMask) {
        reject(new Error("BMapGL.MapMask未定义，请检查AK权限或API版本"));
        return;
      }
      mapLoaded.value = true;
      resolve();
    };

    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 初始化地图
const initMap = () => {
  const BMapGL = window.BMapGL;
  const map = new BMapGL.Map("container", {
    backgroundColor: [0, 0, 0, 0], // 可选背景色
  });
  // 设置地图中心点
  map.centerAndZoom(new BMapGL.Point(120.471, 30.63), 12);
  map.disableDoubleClickZoom(); //禁止缩放
  map.disableDragging(); //禁止拖拽
  return map;
};

// 添加桐乡市掩膜（使用您的坐标点）
const addMapMask = (map) => {
  const BMapGL = window.BMapGL;

  /* const areas = [];
  for (let i = 0; i < tongxiang.features.length; i++) {
    let villages = [];
    const villagesPoints = tongxiang.features[i].geometry.coordinates[0][0];
    for (let j = 0; j < villagesPoints.length; j++) {
      areas.push(villagesPoints[j].toString());
    }
    villages = villages.join(";");
    areas.push(villages);
  }
  const path = [];
  for (let z = 0; z < areas.length - 1; z++) {
    let villages = [];
    villages = areas[z].split(",");
    path.push(new BMapGL.Point(villages[0], villages[1]));
  }
  // 创建地图蒙层
   const mapMaskOutside = new BMapGL.MapMask(path, {
    isBuildingMask: true, // 是否隐藏建筑物
    isPoiMask: true, // 是否隐藏POI兴趣点
    isMapMask: true, // 是否隐藏地图底图
    showRegion: "outside", // 显示区域范围
    topFillColor: "#1DEBFF", // 顶部填充颜色（区域内部）
    topFillOpacity: 0.5, // 顶部填充透明度
    sideFillColor: "#1DEBFF", // 侧面填充颜色（3D边缘）
    sideFillOpacity: 0.9, // 侧面填充透明度
    maskColor: [0, 0, 0, 0], // 关键参数：蒙层背景全透明
    maskOpacity: 0, // 蒙层透明度设为0
  });
  const mapMaskInside = new BMapGL.MapMask(path, {
    isBuildingMask: true, // 是否隐藏建筑物
    isPoiMask: true, // 是否隐藏POI兴趣点
    isMapMask: true, // 是否隐藏地图底图
    showRegion: "inside", // 显示区域范围
    topFillColor: "#1DEBFF", // 顶部填充颜色（区域内部）
    topFillOpacity: 0.5, // 顶部填充透明度
    sideFillColor: "#1DEBFF", // 侧面填充颜色（3D边缘）
    sideFillOpacity: 0.9, // 侧面填充透明度
    maskColor: [0, 0, 0, 0], // 关键参数：蒙层背景全透明
    maskOpacity: 0, // 蒙层透明度设为0
  });
  map.addOverlay(mapMaskOutside);
  map.addOverlay(mapMaskInside); */

  const mapMaskAllSide = new BMapGL.MapMask([
    pStart.value,
    pEnd.value,
  ], {
    isBuildingMask: true, // 是否隐藏建筑物
    isPoiMask: true, // 是否隐藏POI兴趣点
    isMapMask: true, // 是否隐藏地图底图
    showRegion: "inside", // 显示区域范围
    topFillColor: "#1DEBFF", // 顶部填充颜色（区域内部）
    topFillOpacity: 0.5, // 顶部填充透明度
    sideFillColor: "#1DEBFF", // 侧面填充颜色（3D边缘）
    sideFillOpacity: 0.9, // 侧面填充透明度
    maskColor: [0, 0, 0, 0], // 关键参数：蒙层背景全透明
    maskOpacity: 0, // 蒙层透明度设为0
  });
  map.addOverlay(mapMaskAllSide);

  // 创建地图边界
  /* const border = new BMapGL.Polyline(path, {
    strokeColor: "#1DEBFF",
    strokeWeight: 4, // 线宽
    strokeOpacity: 1, // 线透明度
  });
  map.addOverlay(border); */

  // 插入图片
  // const { start, end } = expandBounds(pStart.value, pEnd.value, 1.04);
  const bounds = new BMapGL.Bounds(pStart.value, pEnd.value);
  // 创建地面叠加层实例
  const imgOverlay = new BMapGL.GroundOverlay(bounds, {
    type: "image",
    url: mapImg,
    opacity: 1,
  });
  // 叠加层添加到地图
  map.addOverlay(imgOverlay);
  getCompanyListData(map);
  getPersonListData(map);
};
//地图缩放函数
function expandBounds(pStart, pEnd, scaleFactor = 1.1) {
  const BMapGL = window.BMapGL;

  // 计算中心点
  const centerLng = (pStart.lng + pEnd.lng) / 2;
  const centerLat = (pStart.lat + pEnd.lat) / 2;

  // 计算原始宽度和高度
  const width = pEnd.lng - pStart.lng;
  const height = pEnd.lat - pStart.lat;

  // 计算新的宽度和高度
  const newWidth = width * scaleFactor;
  const newHeight = height * scaleFactor;

  // 计算新的边界点
  const newPStart = new BMapGL.Point(
    centerLng - newWidth / 2,
    centerLat - newHeight / 2
  );

  const newPEnd = new BMapGL.Point(
    centerLng + newWidth / 2,
    centerLat + newHeight / 2
  );

  return { start: newPStart, end: newPEnd };
}

//请求接口（获取公司列表）
const getCompanyListData = (map) => {
  getCompanyList().then((res) => {
    res.forEach((item) => {
      createPointDomFn(item, map);
    });
  });
};

//请求接口（获取个人列表）
const getPersonListData = (map) => {
  getPersonList().then((res) => {
    res.forEach((item) => {
      createPointDomFn(item, map);
    });
  });
};

/**
 * 创建点DOM
 * @param {Object} data 数据
 * @param {Object} map 地图实例
 */
function createPointDomFn(data, map) {
  function createPointDOM() {
    const div = document.createElement("div");
    const dom = createPointDom(data.type);
    div.appendChild(dom);
    return div;
  }
  // 创建自定义覆盖物
  const customOverlay = new BMapGL.CustomOverlay(createPointDOM, {
    point: new BMapGL.Point(data.lng, data.lat),
    opacity: 0.5,
    map: map,
    offsetY: -10,
    properties: {
      title: "this is a title",
      size: "100",
    },
  });

  // 将自定义覆盖物添加到地图上
  map.addOverlay(customOverlay);

  // 绑定鼠标事件
  customOverlay.addEventListener("click", function (e) {
    handleClickPoint(e, data);
  });
}
//点击点
const handleClickPoint = (e, data) => {
  const coordinate = {
    x: e.pixel.x + 20,
    y: e.pixel.y + 100,
  };
  createDynamicComponent({ data, coordinate });
};
const dialogWrapper = ref(null);
function createDynamicComponent(props = { data, coordinate }) {
  // 创建 VNode
  const vnode = h(Dialog, props);
  dialogWrapper.value = document.querySelector(".dialog-wrapper");
  const containerBox = document.createElement("div");
  dialogWrapper.value.appendChild(containerBox);
  // 渲染组件到容器中
  render(vnode, containerBox);
}

const handleMouseLeave = () => {
  dialogWrapper.value.innerHTML = "";
};

onMounted(async () => {
  try {
    await loadMapScript();
    const map = initMap();
    const bs = map.getBounds(); //获取可视区域
    pStart.value = bs.getSouthWest(); //可视区域左下角
    pEnd.value = bs.getNorthEast(); //可视区域右上角
    addMapMask(map);
  } catch (error) {
    console.error("地图初始化失败:", error);
    // 可替换为用户提示（如Toast）
    alert(`地图加载失败: ${error.message}`);
  }
});
</script>

<template>
  <div class="map-view">
    <div class="center-wrapper flex h-full">
      <div class="flex-1 h-full flex flex-col mt-339px">
        <p class="title">经纬天地 桐享未来</p>
        <p class="desc">
          纺织行业切入，企业主导，百度倾力支持，赋能桐乡区域，促进产业数字化和数字产业化，促活繁荣产业链和工业互联网生态圈
        </p>
      </div>
      <main class="flex-1 h-full ml-30px flex items-center">
        <div class="map-wrapper relative" @mouseleave="handleMouseLeave">
          <div id="container" class="h-full w-full"></div>
          <div class="dialog-wrapper"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-view {
  height: 910px;
  background: url(@/assets/images/map-bg.png) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  .center-wrapper {
    .title {
      font-family: "SourceHanSansSC-Medium";
      font-size: 56px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 89px;
      font-weight: 500;
    }
    .desc {
      font-family: "PingFangSC-Regular";
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 6.6px;
      line-height: 21px;
      font-weight: 400;
      margin-top: 16px;
    }
    .map-wrapper {
      width: 680px;
      height: 680px;

      #container {
        background: transparent !important;
      }
      .img-wrapper {
        position: absolute;
        width: 670px;
        height: 670px;
        top: 0;
        left: 0;
        z-index: 9999;
      }
    }
  }

  ::v-deep(.BMap_cpyCtrl) {
    display: none;
  }

  ::v-deep(.anchorBL) {
    display: none !important;
  }
}
</style>

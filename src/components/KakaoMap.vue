<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, Ref, watch } from 'vue';

let map: Ref<any> = ref(null) 

const props = defineProps<{
  mapx: string;
  mapy: string;
}>();

const loadScript = () => {
  const script = document.createElement("script");
  script.src=`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`
  script.onload = () => window.kakao.maps.load(loadMap)

  document.head.appendChild(script)
}

const loadMap = () => {
  console.log(parseFloat(props.mapx), parseFloat(props.mapy))
  const container = document.getElementById("map");
  const options = {
    center: new window.kakao.maps.LatLng(props.mapy, props.mapx),
    level: 3,
  };
  map = new window.kakao.maps.Map(container, options);
  loadMarker();
}

const loadMarker = () => {
  const markerPosition = new window.kakao.maps.LatLng(props.mapy, props.mapx);
  const marker = new window.kakao.maps.Marker({
    position: markerPosition
  });

  marker.setMap(map);
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadMap();
  } else {
    loadScript();
  }
})

watch(() => [props.mapx, props.mapy], (([newMapX, newMapY]) => {
  if(window.kakao && window.kakao.maps && newMapX && newMapY) {
    loadMap();
  }
}))

</script>
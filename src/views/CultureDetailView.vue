<template>
  <div id="content">
    <div class="detail-container">
      <!-- <ion-icon name="arrow-back-outline" class="back"></ion-icon> -->
      <div class="nav">홈 > 축제/행사 > {{commonsStore.contentDetail.title}}</div>
      <div class="detail-top">
        <div class="title"><strong>{{commonsStore.contentDetail.title}}</strong></div>
        <div class="sigungu">{{commonsStore.sigungu}} | {{setStEdDateForm(commonsStore.contentDetail2.eventstartdate, commonsStore.contentDetail2.eventenddate)}}</div>
      </div>
      <div class="detail-body">
        <div class="images">
          <img :src="commonsStore.contentDetail.firstimage">
          <img :src="commonsStore.detailImage.originimgurl">
        </div>
        <div class="intro">
          <div class="intro-des" v-html="commonsStore.contentDetail.overview" />
        </div>
        <div class="detail-info">
          <strong class="semi-title">상세정보</strong>
          <div id="map"></div>
          <div class="table-area">
            <table>
              <tbody>
                <tr>
                  <th>홈페이지</th>
                  <td v-html="commonsStore.contentDetail.homepage"></td>
                </tr>
                <tr>
                  <th>주관사</th>
                  <td>{{commonsStore.contentDetail2.sponsor2}}({{commonsStore.contentDetail2.sponsor1}})</td>
                </tr>
                
                <tr>
                  <th>전화번호</th>
                  <td>{{commonsStore.contentDetail.tel}}</td>
                </tr>
                <tr>
                  <th>이용요금</th>
                  <td v-html="commonsStore.contentDetail2.usetimefestival"></td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <th>예약페이지</th>
                  <td v-html="commonsStore.contentDetail2.bookingplace"></td>
                </tr>
                <tr>
                  <th>상세주소</th>
                  <td>{{commonsStore.contentDetail.addr1}}({{commonsStore.contentDetail.zipcode}})</td>
                </tr>
                <tr>
                  <th>주최기간</th>
                  <td>{{setStEdDateForm(commonsStore.contentDetail2.eventstartdate, commonsStore.contentDetail2.eventenddate)}}</td>
                </tr>
                <tr>
                  <th>행사시간</th>
                  <td>{{commonsStore.contentDetail2.playtime}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, onMounted, computed } from 'vue'
import type {Ref} from 'vue'
import { useTourStore } from '@/stores/tour'
import { useCommonsStore } from '@/stores/commons'
import { useRoute } from 'vue-router'
import _ from 'lodash'

const tourStore = useTourStore()
const commonsStore = useCommonsStore()

const route = useRoute()

const cateCodes = require('@/assets/data/catcode.json')


commonsStore.getContentDetail(route.params.id, route.params.type)

const setStEdDateForm = (st:string, ed:string) : string => {
  let datearr:Array<string> = [st, ed]
  datearr.forEach((date:string, idx:number)=>{
    let y: string = date.substr(0, 4)
    let m: string = date.substr(4, 2)
    let d: string = date.substr(6, 2)
    datearr[idx] = `${y}.${m}.${d}`
  })
  return `${datearr[0]} ~ ${datearr[1]}`
}

//kakao map
let map: Ref<any> = ref(null) 

const loadScript = () => {
  const script = document.createElement("script");
  script.src=`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`
  script.onload = () => window.kakao.maps.load(loadMap)

  document.head.appendChild(script)
}

const loadMap = () => {
  console.log(parseFloat(commonsStore.contentDetail.mapx), parseFloat(commonsStore.contentDetail.mapy))
  const container = document.getElementById("map")
  const options = {
    center: new window.kakao.maps.LatLng(commonsStore.contentDetail.mapy, commonsStore.contentDetail.mapx),
    level: 3,
  }
  map = new window.kakao.maps.Map(container, options)
  loadMarker()
}

const loadMarker = () => {
  const markerPosition = new window.kakao.maps.LatLng(commonsStore.contentDetail.mapy, commonsStore.contentDetail.mapx)
  const marker = new window.kakao.maps.Marker({
    position: markerPosition
  })

  marker.setMap(map)
}

//commonsStore.setContentCategories(tourStore.contentDetail.cat1, tourStore.contentDetail.cat2, tourStore.contentDetail.cat3, tourStore.contentDetail.contenttypeid)
onMounted(()=>{
  
  //console.log(parseFloat(tourStore.contentDetail.mapx), parseFloat(tourStore.contentDetail.mapy))
  if(window.kakao && window.kakao.maps) {
    loadMap()
  }
  else {
    loadScript()
  }
})

</script>
<template>
  <div>
    <div class="navbar fixed-top d-flex justify-content-center">
      <div class="lft">
        <div class="logo" @click="pageLink('/')">TRAVEL TO # ?</div>
      </div>
      <div class="rgt">
        <div class="search">
          <input v-model="searchKeyword" type="text" class="ipt" placeholder="검색어를 입력해주세요"/>
          <ion-icon name="search-outline" class="search-ico" @click="goToSearch"/>
        </div>

        <div class="tabs">
          <div v-for="tab in tabs" :key="tab.name" :class="['tab-item', {'now-tab': route.path === tab.to}]" @click="pageLink(tab.to)">
            <div>{{tab.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCommonsStore } from '@/stores/commons'

export default defineComponent ({
  setup() {
    const tabs = require('@/assets/data/tabs_info.json').NAVBAR

    const commonsStore = useCommonsStore()

    const router = useRouter()
    const route = useRoute()

    let searchKeyword : Ref<string> = ref('')

    const pageLink = (to: string) => {
      router.push(to)
    }

    const goToSearch = () => {
      if(searchKeyword.value && route.path !== '/search') {
        router.push({ name: 'search', query: { keyword: searchKeyword.value }})
      }
      else if(searchKeyword.value && route.path === '/search') {
        commonsStore.getSearchResult({ 
          keyword: searchKeyword.value,
          contentTypeId: '12',
          areaCode: '',
          pageNo: '1',
          })
      }
      else {
        alert('검색어를 입력해주세요.')
      }
    }

    return {
      tabs,
      pageLink,
      route, router,
      searchKeyword,
      goToSearch
    }
  },
  mounted() {
    console.log()
  },
})
</script>
<style>

</style>
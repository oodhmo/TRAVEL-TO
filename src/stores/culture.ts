import { defineStore } from 'pinia'
import { fetchFestivalInfo } from '@/api'
import { IFestivalItems } from '@/types/festival-item'
import { IParam } from '@/types/query'

export const useCultureStore = defineStore('cultureStore', {
  state: () => ({
    festivalList: [] as Array<IFestivalItems>,
    festivalItemCnt: 0 as number,
  }), 
  actions: {
    getFestivalInfo(query: IParam) {
      fetchFestivalInfo(query).then((resp:any) => {
        this.festivalList = resp.data.response.body.items.item
        this.festivalItemCnt = resp.data.response.body.totalCount
      })
    }
  }
})


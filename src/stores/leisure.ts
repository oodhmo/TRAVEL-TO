import { fetchLeisureInfo } from '@/api'
import { defineStore } from 'pinia'
import { IItems } from '@/types/tour-items'
import { IQuery } from '@/types/query'

export interface ILeisure {
  leisureList: IItems
}

export const useLeisureStore = defineStore('leisureStore', {
  state: () => ({
    leisureList: [] as Array<ILeisure>,
    leisureItemCnt: 0 as number
  }),
  actions: {
    getLeisureInfo(query: IQuery) {
      fetchLeisureInfo(query)
        .then((resp:any) => {
          this.leisureList = resp.data.response.body.items.item
          this.leisureItemCnt = resp.data.response.body.totalCount
        })
    }
  }
})


/* eslint-disable */ 
import { defineStore } from 'pinia'
import { fetchTourInfo } from '@/api'
import { IItems } from '@/types/tour-items'
import { IParam } from '@/types/query'
import { Icat1, Icat2, Icat3 } from '@/types/category'
import _ from 'lodash'

export const useTourStore = defineStore('tourStore', {
  state: () => ({
    tourList: [] as Array<IItems>,
    selectedArea: "" as string | undefined,
    tourItemsCount: 0 as number,
    tourAreaCode: '' as string | undefined
  }),
  actions: {
    getTourList(query:IParam) {
      fetchTourInfo(query)
        .then((resp:any) => {
          console.log(resp)
          this.tourList = resp.data.response.body.items
          this.selectedArea = query?.areaCode
        })
    },
    getTourItemsCount(query:IParam) {
      fetchTourInfo(query)
        .then((resp:any) => {
          this.tourItemsCount = resp.data.response.body.totalCount
        })
    },
    resetAreaCode() {
      this.tourAreaCode = ''
    }
  }
})

// pages/search-detail/search-detail.js
import {
  getSearchHot,
  getSearchResult,
  getSearchSuggest
} from '../../../service/music'
import {
  debounce
} from 'underscore'
import playerStore from '../../../store/playerStore'
Page({
  data: {
    searchValue: "",
    hotList: [],
    historyData: [],
    suggestSong: [],
    searchResult: [],
    isChange: false,
    isShowRes: false
  },
  onLoad() {
    const historyData = wx.getStorageSync('searchHistory')
    if (historyData) {
      this.setData({
        historyData
      })
    }
    this.fetchgetSearchHot()
  },
  async fetchgetSearchHot() {
    const res = await getSearchHot()
    const hotList = res.result.hots
    this.setData({
      hotList
    })
  },
  fetchSuggest: debounce(async function (keywords) {
    const res = await getSearchSuggest(keywords)
    const suggestSong = res.result.allMatch
    this.setData({
      suggestSong
    })
  }, 300),
  async fetchSearchResult(keywords) {
    const {
      result
    } = await getSearchResult(keywords)
    if (!result) return
    this.setData({
      searchResult: result.songs,
      isShowRes: true
    })
  },
  onChange(event) {
    this.setData({
      searchValue: event.detail,
      isChange: true,
      isShowRes: false
      // searchResult:''
    })
    if (!this.data.searchValue) return
    this.fetchSuggest(this.data.searchValue)
  },
  onSearch() {
    const historyData = wx.getStorageSync('searchHistory')
    const serachValue = this.data.searchValue
    let pushHistory = []
    if (historyData) {
      // 去掉重复的
      const newData = historyData.filter(item => item !== serachValue)
      pushHistory.push(serachValue, ...newData)
    } else {
      pushHistory.push(serachValue)
    }
    wx.setStorageSync('searchHistory', pushHistory)
    this.setData({
      historyData: pushHistory,
      isChange: false
    })
    this.fetchSearchResult(serachValue)
  },
  delHistory() {
    wx.removeStorageSync('searchHistory')
    this.setData({
      historyData: ''
    })
  },
  songItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playSongList", this.data.searchResult)
    playerStore.setState("playSongIndex", index)
  },
  historyTap(event) {
    const index = event.currentTarget.dataset.index
    //  console.log(index);
    this.fetchSearchResult(this.data.historyData[index])
  },
  suggestTap(event) {
    const index = event.currentTarget.dataset.index
    //  console.log(index);
    this.fetchSearchResult(this.data.suggestSong[index].keyword)
  },
  hotItemTap(event) {
    const index = event.currentTarget.dataset.index
    //  console.log(index);
    this.fetchSearchResult(this.data.hotList[index].first)
  }
})
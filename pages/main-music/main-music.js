import {
  getBanner,
  getHotList,
} from "../../service/music"
import querySelect from "../../utils/query-select"
import {
  throttle
} from 'underscore'
import recommendStore from "../../store/recommend-list"
import rankingStore, {
  rankingMap
} from "../../store/ranking-list"
import playerStore from "../../store/playerStore"

const querySelectThrottle = throttle(querySelect, 100)
// pages/main-music/main-music.js
Page({
  data: {
    value: '',
    banners: [],
    bannerHeight: 0,
    recommendSongs: [],
    hotList: [],
    recommendList: [],
    rankingInfos: {},
    songDeatil:{},
    isPlaying:false,

  },
  onLoad() {
    this.fetchBanner()
    this.fetchHotList()
    // =========store action======
    recommendStore.onState('recommendSongInfo', this.handleRecommendSongs)
    recommendStore.dispatch("fetchCommend")
    // 巅峰store
    // 方法一
    for (const key in rankingMap) {
      rankingStore.onState(key, this.getRankingHanlder(key))
    }
    // 方法二
    // rankingStore.onState("newRanking",this.getRankingHanlder("newRanking"))
    // rankingStore.onState("originRanking",this.getRankingHanlder("originRanking"))
    // rankingStore.onState("upRanking",this.getRankingHanlder("upRanking"))

    rankingStore.dispatch("fetchRankList")


    playerStore.onStates(["songDeatil","isPlaying"],this.getCurrentPlayer)
  },
  onUnload() {
    recommendStore.offState('recommendSongInfo', this.handleRecommendSongs)
    for (const key in rankingMap) {
      rankingStore.offState(key, this.getRankingHanlder(key))
    }
  },
  // 搜索
  onSearchTap() {
    wx.navigateTo({
      url: '/packageSearch/pages/search-detail/search-detail',
    })
  },
  // banner
  onBannerLoad() {
    querySelectThrottle(".banner-image").then(res => {
      this.setData({
        bannerHeight: res[0].height
      })
    })
  },

  // 推荐
  onRcmMoreTap() {
    wx.navigateTo({
      url: '/pages/menu-song/menu-song?type=recommend',
    })
  },
  rmdSongTap(event){
    const currentIndex=event.currentTarget.dataset.index
    playerStore.setState("playSongList",this.data.recommendSongs)
    playerStore.setState("playSongIndex",currentIndex)
  },

  changSongStatus(){
    playerStore.dispatch('changerStatus')
  },
  nextSong(){
    playerStore.dispatch("controlPlay")
  },
  toPlayer(){
    wx.navigateTo({
      url: '/packagePlayer/pages/music-play/music-play',
    })
  },

  // ===========网络请求===========
  // banner数据
  async fetchBanner() {
    const res = await getBanner()
    this.setData({
      banners: res.banners
    })
  },
  fetchHotList() {
    getHotList().then(res => {
      this.setData({
        hotList: res.playlists
      })
    })
    getHotList("华语").then(res => {
      this.setData({
        recommendList: res.playlists
      })
    })
  },
  //  ===========store获取数据===========
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({
      recommendSongs: value.tracks.slice(0, 6)
    })
  },
  getRankingHanlder(ranking) {
    return value => {
      if (!value.name) return
      const newInfos = {
        ...this.data.rankingInfos,
        [ranking]: value
      }
      this.setData({
        rankingInfos: newInfos
      })
    }
  },
  getCurrentPlayer({songDeatil,isPlaying}){
    if(songDeatil){
      this.setData({songDeatil})
    }
    if(isPlaying!==undefined){
       this.setData({isPlaying})
    }
  }
})
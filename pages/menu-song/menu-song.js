import rankingStore from "../../store/ranking-list"
import {
  getPlaylist
} from "../../service/music"
import recommendStore from "../../store/recommend-list"

// pages/menu-song/menu-song.js
Page({
  data: {
    key: '',
    type: '',
    songInfo: {},
    id: ""
  },
  onLoad(options) {
    // console.log(options);
    this.setData({
      type: options.type
    })
    // =====store获取数据=======
    if (this.data.type === 'ranking') {
      this.data.key = options.key
      rankingStore.onState(this.data.key, this.hanlderRanking)
    } else if (this.data.type === 'menu') {
      this.data.id = options.id
      this.fetchSongInfo()
    } else if (this.data.type === "recommend") {
      this.setData({
        key: "recommendSongInfo"
      })
      recommendStore.onState("recommendSongInfo", this.hanlderRanking)
    }
  },
  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.hanlderRanking)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState(this.data.key, this.hanlderRanking)
    }
  },
  hanlderRanking(value) {
    if (!value.name) return
    this.setData({
      songInfo: value
    })
    // console.log(value);
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },

  async fetchSongInfo() {
    // console.log(this.data.id);
    const res = await getPlaylist(this.data.id)
    this.setData({
      songInfo: res.playlist
    })
  }


})
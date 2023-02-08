import {
  getsongPlay
} from "../../service/song"
const app = getApp()

// pages/music-play/music-play.js
Page({
  data: {
    id: -1,
    songDeatil: {}
  },
  onLoad(options) {
    // 初始化

    const id = options.id
    this.setData({
      id
    })

    // 请求数据
    this.fetchSongDetail()
  },
  async fetchSongDetail() {
    const res = await getsongPlay(this.data.id)
    this.setData({
      songDeatil: res.songs[0]
    })
  }
})
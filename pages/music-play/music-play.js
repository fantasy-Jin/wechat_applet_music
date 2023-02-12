import {
  throttle
} from 'underscore'
import playerStore from "../../store/playerStore"
const app = getApp()
import {
  audioContext
} from "../../store/playerStore"
const modeNames = ["order", "repeat", "random"]
Page({
  data: {
    contentHeight: 550,
    tabItems: ['歌曲', '歌词', '评论'],
    isFirstPlay: true,
    id: -1,
    songDeatil: {},
    currentIndex: 0,
    lyric: [],
    currentLyric: "歌词加载中...",
    lyricIndex: 0,
    lyricScrollTop: 0,
    isPlaying: true,
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChanging: false,
    comments: [],
    playSongList: [],
    playSongIndex: 0,
    playModeIndex: 0, // 0:顺序播放 1:单曲循环 2:随机播放
    playModeName: "order",
    popupShow: false
  },
  onLoad(options) {
    // 初始化
    const contentHeight = app.globalData.windowHeight
    this.setData({
      contentHeight
    })
    const id = options.id
    this.setData({
      id
    })
    // 播放歌曲
    if (id) {
      playerStore.dispatch("playSongWithId", id)
    }
    playerStore.onStates(["songDeatil", "currentTime", "durationTime", "isPlaying", "playModeIndex", "lyric", "currentLyric", "lyricIndex", "comments", "isFirstPlay"], this.getSongAllInfo)

    // 歌曲列表
    playerStore.onStates(["playSongList", "playSongIndex"], this.getPlayerList)
  },
  onUnload() {
    playerStore.offStates(["playSongList", "playSongIndex"], this.getPlayerList)
    playerStore.offStates(["songDeatil", "currentTime", "durationTime", "isPlaying", "playModeIndex", "lyric", "currentLyric", "lyricIndex", "comments", "isFirstPlay"], this.getSongAllInfo)
  },
  // ========== 事件监听 ==========
  onLeftTap() {
    wx.navigateBack()
  },
  onSwiperTab(event) {
    const currentIndex = event.detail.current
    this.setData({
      currentIndex
    })
  },
  tabChange(event) {
    const currentIndex = event.currentTarget.dataset.index
    this.setData({
      currentIndex
    })
  },

  // ========进度条滑动========
  sliderChange(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({
      sliderValue: value,
      currentTime,
      isSliderChanging: false,
    })
  },
  sliderChanging: throttle(function (event) {
    this.data.isSliderChanging = true
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    this.setData({
      currentTime,
      sliderValue: value,
    })
  }, 10),
  updataprocess: throttle(function (currentTime) {
    if (this.data.isSliderChanging) return
    const sliderValue = currentTime / this.data.durationTime * 100
    this.setData({
      sliderValue
    })
  }, 1000, {
    leading: false,
    trailing: false
  }),

  // =======控制播放======== 
  pauseSong() {
    playerStore.dispatch("changerStatus")
  },
  prevSong() {
    playerStore.dispatch("controlPlay", false)
  },
  nextSong() {
    playerStore.dispatch("controlPlay")
  },
  modechange() {
    playerStore.dispatch("modechange")
  },
  onListTap() {
    this.setData({
      popupShow: !this.data.popupShow
    })
  },
  onlistTap(event) {
    const index = event.currentTarget.dataset.index
    const id = event.currentTarget.dataset.id
    this.setData({
      sliderValue: 0,
      currentTime: 0,
      durationTime: 0,
      currentLyric: '歌词加载中..'
    })
    playerStore.dispatch("playSongWithId", id)
    playerStore.setState("playSongIndex", index)
  },


  // =======store========
  getPlayerList({
    playSongList,
    playSongIndex
  }) {
    if (playSongList) {
      this.setData({
        playSongList
      })
    }
    if (playSongIndex !== undefined) {
      this.setData({
        playSongIndex
      })
    }
  },

  getSongAllInfo({
    songDeatil,
    currentTime,
    durationTime,
    isPlaying,
    playModeIndex,
    lyric,
    currentLyric,
    lyricIndex,
    comments,
    isFirstPlay
  }) {
    if (songDeatil) {
      this.setData({
        songDeatil
      })
    }
    if (currentTime) {
      this.setData({
        currentTime
      })
      this.updataprocess(currentTime)
    }
    if (durationTime) {
      this.setData({
        durationTime
      })
    }
    if (isPlaying !== undefined) {
      this.setData({
        isPlaying
      })
    }
    if (playModeIndex !== undefined) {
      this.setData({
        playModeName: modeNames[playModeIndex]
      })
    }
    if (lyricIndex !== undefined) {
      this.setData({
        lyricIndex,
        lyricScrollTop: lyricIndex * 40
      })
    }
    if (lyric) {
      this.setData({
        lyric
      })
    }
    if (currentLyric) {
      this.setData({
        currentLyric
      })
    }
    if (comments) {
      this.setData({
        comments
      })
    }
    if (isFirstPlay !== undefined) {
      this.setData({
        isFirstPlay
      })
    }
  }

})
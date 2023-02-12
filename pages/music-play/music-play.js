import {
  getComment,
  getLyric,
  getsongPlay,
} from "../../service/song"
import {
  throttle
} from 'underscore'
import {
  parseLyric
} from "../../utils/parse-lyric"
import playerStore from "../../store/playerStore"
const app = getApp()
const audioContext = wx.createInnerAudioContext()
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
    isWaiting: false,
    comments: [],
    playSongList: [],
    playSongIndex: 0,
    playModeIndex: 0, // 0:顺序播放 1:单曲循环 2:随机播放
    playModeName: "order",
    popupShow: false
  },
  onLoad(options) {
    // if (!this.data.songDeatil.name) {
    //   wx.showLoading({
    //     title: '疯狂敲代码中',
    //     mask: true
    //   })
    // }
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
    if(id){
      playerStore.dispatch("playSongWithId",id)
    }
    playerStore.onStates(["songDeatil","currentTime","durationTime","isPlaying","playModeIndex","lyric","currentLyric","lyricIndex","comments","isFirstPlay"], this.getSongAllInfo)

    // 歌曲列表
    playerStore.onStates(["playSongList", "playSongIndex"], this.getPlayerList)


  },
  onUnload() {
    playerStore.offStates(["playSongList", "playSongIndex"], this.getPlayerList)
  },

  // // ======网络请求=======
  // async fetchSongDetail() {
  //   const res = await getsongPlay(this.data.id)
  //   this.setData({
  //     songDeatil: res.songs[0],
  //     durationTime: res.songs[0].dt - 100,
  //   })

  //   wx.hideLoading()

  // },
  // async fetchlyric() {
  //   const lyric = await getLyric(this.data.id)
  //   const newLyric = parseLyric(lyric.lrc.lyric)
  //   this.setData({
  //     lyric: newLyric
  //   })
  // },
  // async fetchCommend() {
  //   const res = await getComment(this.data.id)
  //   const comments = res.data.comments
  //   this.setData({
  //     comments
  //   })
  // },

  // ========== 播放歌曲 ========
  async setupPlaySong(id) {
    // this.setData({
    //   id
    // })
    // // 请求数据
    // this.fetchSongDetail()
    // this.fetchlyric()
    // this.fetchCommend()
    // // 歌曲播放
    // audioContext.stop()
    // audioContext.src =`https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // audioContext.autoplay = true
    // this.songPlaying()

    // audioContext.onWaiting(() => {
    //   wx.showLoading({
    //     title: '疯狂敲代码中',
    //     mask: true
    //   })
    //   audioContext.pause()
    // })
    // audioContext.onCanplay(() => {
    //   wx.hideLoading()
    //   audioContext.play()
    // })
    //  // 结束
    // audioContext.onEnded(() => {
    //   if(audioContext.loop) return
    //   this.controlPlay()
    // })

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
  pauseSong() {
    // console.log(audioContext.paused);
    if (audioContext.paused) {
      audioContext.play()
      this.setData({
        isPlaying: true
      })
    } else {
      audioContext.pause()
      this.setData({
        isPlaying: false
      })
    }

  },
  // 进度条滑动
  sliderChange(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({
      // sliderValue: value,
      // currentTime,
      isSliderChanging: false,
      isPlaying: true
    })
    // audioContext.play()
  },
  sliderChanging(event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    // audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime,
      isSliderChanging: true,
      sliderValue: value,
    })
  },
  // // 音乐播放监听
  // songPlaying() {
  //   const throttleUpadate = throttle(() => {
  //     const currentTime = audioContext.currentTime * 1000
  //     const sliderValue = currentTime / this.data.durationTime * 100
  //     this.setData({
  //       currentTime,
  //       sliderValue
  //     })
  //   }, 700, {
  //     leading: false,
  //     trailing: false
  //   })
  //   const throttleLyric = throttle(this.lyricMatching, 500)
  //   audioContext.onTimeUpdate(() => {
  //     if (this.data.isSliderChanging) return
  //     throttleUpadate()
  //     throttleLyric()
  //   })

  // },
  // 匹配歌词
  // lyricMatching() {
  //   if (!this.data.lyric.length) return

  //   let lyricIndex = this.data.lyric.length - 1
  //   for (let i = 0; i < this.data.lyric.length; i++) {
  //     const lyricItem = this.data.lyric[i]
  //     if (lyricItem.time - 1000 >= this.data.currentTime) {
  //       lyricIndex = i - 1
  //       break
  //     }
  //   }
  //   if (lyricIndex === this.data.lyricIndex) return
  //   const currentLyric = this.data.lyric[lyricIndex]?.text
  //   const lyricScrollTop = lyricIndex * 40
  //   this.setData({
  //     lyricIndex,
  //     currentLyric,
  //     lyricScrollTop
  //   })
  // },
  // 控制播放
  prevSong() {
    this.controlPlay(false)
  },
  nextSong() {
    this.controlPlay()
  },
  modechange() {
    let modeIndex = this.data.playModeIndex
    modeIndex++
    if (modeIndex === 3) modeIndex = 0
    if (modeIndex === 1) {
      audioContext.loop = true
    } else {
      audioContext.loop = false
    }
    this.setData({
      playModeIndex: modeIndex,
      playModeName: modeNames[modeIndex]
    })

  },
  // controlPlay(isNext = true) {
  //   let index = this.data.playSongIndex
  //   let length = this.data.playSongList.length

  //   switch (this.data.playModeIndex) {
  //     case 1:
  //     case 0:
  //       // 顺序播放
  //       index = isNext ? index + 1 : index - 1
  //       if (index === -1) index = length - 1
  //       if (index === length) index = 0
  //       break;
  //     case 2:
  //       // 随机播放
  //       index = Math.floor(Math.random() * length)
  //       break;
  //   }

  //   const newSong = this.data.playSongList[index]
  //   // 重置
  //   this.setData({
  //     sliderValue: 0,
  //     currentTime: 0,
  //     durationTime: 0,
  //     currentLyric: '歌词加载中..'
  //   })
  //   this.setupPlaySong(newSong.id)
  //   playerStore.setState("playSongIndex", index)
  // },
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
    this.setupPlaySong(id)
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
        playModeIndex
      })
    }
    if (lyricIndex !== undefined) {
      this.setData({
        lyricIndex
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
    if (isFirstPlay!==undefined) {
      this.setData({
        isFirstPlay
      })
    }
  }

})
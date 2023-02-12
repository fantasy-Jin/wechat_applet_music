import {
  HYEventStore
} from "hy-event-store"
import {
  getComment,
  getLyric,
  getsongPlay,
} from "../service/song"

import {
  parseLyric
} from "../utils/parse-lyric"
export const audioContext = wx.createInnerAudioContext()
const playerStore = new HYEventStore({
  state: {
    // 歌曲信息
    id: 0,
    songDeatil: {},
    currentTime: 0,
    durationTime: 0,
    isPlaying: true,
    playModeIndex: 0, // 0:顺序播放 1:单曲循环 2:随机播放

    lyric: [],
    currentLyric: "歌词加载中...",
    lyricIndex: 0,
    comments: [],
    isFirstPlay: true,

    // 当前播放的歌曲列表
    playSongList: [],
    playSongIndex: 0,
  },
  actions: {
    playSongWithId(ctx, id) {
      ctx.id = id
      ctx.isPlaying = true
      // ======网络请求======
      getsongPlay(ctx.id).then(res => {
        ctx.songDeatil = res.songs[0]
        ctx.durationTime = res.songs[0].dt - 100
      })
      getLyric(ctx.id).then(res => {
        const newLyric = parseLyric(res.lrc.lyric)
        ctx.lyric = newLyric
      })
      getComment(ctx.id).then(res => {
        const comments = res.data.comments
        ctx.comments = comments
      })
      // 歌曲播放
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
      audioContext.autoplay = true
      if (ctx.isFirstPlay) {
        ctx.isFirstPlay = false
        this.dispatch("songPlaying")
      }
    },
    // 音乐播放监听
    songPlaying(ctx) {
      audioContext.onTimeUpdate(() => {
        ctx.currentTime = audioContext.currentTime * 1000
        // 匹配歌词 
        if (!ctx.lyric.length) return
        let lyricIndex = ctx.lyric.length - 1
        for (let i = 0; i < ctx.lyric.length; i++) {
          const lyricItem = ctx.lyric[i]
          if (lyricItem.time - 1000 >= ctx.currentTime) {
            lyricIndex = i - 1
            break
          }
        }
        if (lyricIndex === ctx.lyricIndex) return
        const currentLyric = ctx.lyric[lyricIndex]?.text
        const lyricScrollTop = lyricIndex * 40
        ctx.lyricIndex = lyricIndex
        ctx.currentLyric = currentLyric
      })

      // audioContext.onWaiting(() => {
      //   wx.showLoading({
      //     title: '疯狂敲代码中'
      //   })
      //   audioContext.pause()
      // })
      // audioContext.onCanplay(() => {
      //   if (ctx.isPlaying) {
      //     wx.hideLoading()
      //     audioContext.play()
      //   }
      // })
      // 结束
      audioContext.onEnded(() => {
        if (audioContext.loop) return
        this.dispatch("controlPlay")
      })
    },
    controlPlay(ctx, isNext = true) {
      let index = ctx.playSongIndex
      let length = ctx.playSongList.length
      switch (ctx.playModeIndex) {
        case 1:
        case 0:
          // 顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = length - 1
          if (index === length) index = 0
          break;
        case 2:
          // 随机播放
          index = Math.floor(Math.random() * length)
          break;
      }
      const newSongId = ctx.playSongList[index].id
      // 重置
      // 播放
      this.dispatch("playSongWithId", newSongId)
      ctx.playSongIndex = index
    },
    // 暂停/播放
    changerStatus(ctx) {
      if (audioContext.paused) {
        audioContext.play()
        ctx.isPlaying = true
      } else {
        audioContext.pause()
        ctx.isPlaying = false
      }
    },

    // 模式切换
    modechange(ctx) {
      let modeIndex = ctx.playModeIndex
      modeIndex++
      if (modeIndex === 3) modeIndex = 0
      if (modeIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }
      ctx.playModeIndex = modeIndex
    },
  }
})
export default playerStore
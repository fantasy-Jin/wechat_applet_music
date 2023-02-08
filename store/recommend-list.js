import {
  HYEventStore
} from 'hy-event-store'
import {
  getPlaylist
} from '../service/music'

const recommendStore = new HYEventStore({
  state: {
    recommendSongInfo: {}
  },
  actions: {
    fetchCommend(ctx) {
      getPlaylist('3778678').then(res => {
        ctx.recommendSongInfo = res.playlist
      })
    }
  }
})
export default recommendStore
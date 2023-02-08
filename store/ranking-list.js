import {
  HYEventStore
} from 'hy-event-store'
import {
  getPlaylist
} from '../service/music'

export const rankingMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    fetchRankList(ctx) {
      for (const key in rankingMap) {
        const id = rankingMap[key]
        getPlaylist(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})
// rankingStore.dispatch("fetchRankList")
export default rankingStore
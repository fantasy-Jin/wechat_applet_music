// components/menusong-item/menusong-item.js
Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    }
  },
  methods: {
    onSongItemTap() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/music-play/music-play?id=${id}`,
      })
    }
  }

})
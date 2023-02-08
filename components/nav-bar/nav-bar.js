import {
  get
} from "underscore"

// components/nav-bar/nav-bar.js
const app = getApp()
Component({

  properties: {

  },

  data: {
    statusHeight: 20
  },
  lifetimes: {
    attached() {
      const statusHeight = app.globalData.statusHeight
      this.setData({
        statusHeight
      })
    }
  }

})
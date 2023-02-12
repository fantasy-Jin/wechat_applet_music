import {
  get
} from "underscore"

// components/nav-bar/nav-bar.js
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
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
  },
  methods: {
    navLeftTap() {
      this.triggerEvent("leftClick")
    }
  }

})
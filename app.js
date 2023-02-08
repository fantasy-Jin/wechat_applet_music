// app.js
App({
  globalData:{
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    windowHeight: 555
  },
  onLaunch(){
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.windowHeight = res.screenHeight - res.statusBarHeight - 44
      },
    })
  }
})

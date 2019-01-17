const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch('/slides')
      .then(res => {
        this.setData({ slides: res.data })
      })

    fetch('/categories')
      .then(res => {
        this.setData({ categories: res.data })
      })
  }
})

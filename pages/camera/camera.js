const app = getApp();
Page({
  data: {
    //初始数据
    video: true,
    compressed: true,
    from: '相册',
    upfrom: [],
    count: 6,
    imgmax: 6,
    vtime: '30',
    cdirection: '后置摄像头',
    pcdirection: 'back',
    imgList: [],
    videoList: [],
    frompicker: ['相册', '相机', '相册和相机'],
    countpicker: ['无限制', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
    vtimepicker: ['10', '15', '30', '60', ],
    cdirectionpicker: ['前置摄像头', '后置摄像头'],
  },
  //图片来源选择
  fromPickerChange(e) {
    console.log(e);
    if (e.detail.value === 0) {
      this.setData({
        upfrom: ['album'],
        from: this.data.frompicker[e.detail.value]
      })
    } else if (e.detail.value === 1) {
      this.setData({
        upfrom: ['camera'],
        from: this.data.frompicker[e.detail.value]
      })
    } else {
      this.setData({
        upfrom: ['album', 'camera'],
        from: this.data.frompicker[e.detail.value]
      })
    }
  },
  //最大支持图片数选择
  countPickerChange(e) {
    console.log(e);
    if (e.detail.value > 0) {
      this.setData({
        count: this.data.countpicker[e.detail.value],
        imgmax: this.data.countpicker[e.detail.value]
      })
    } else {
      this.setData({
        count: this.data.countpicker[e.detail.value],
        imgmax: '-1'
      })
    }
  },
  //视频最大时长选择
  videoPickerChange(e) {
    console.log(e);
    this.setData({
      vtime: this.data.vtimepicker[e.detail.value],
    })
  },
  //摄像头方向数据选择
  cdirectionPickerChange(e) {
    console.log(e);
    if (e.detail.value === 1) {
      this.setData({
        pcdirection: 'back',
        cdirection: this.data.cdirectionpicker[e.detail.value]
      })
    } else {
      this.setData({
        pcdirection: 'front',
        cdirection: this.data.cdirectionpicker[e.detail.value]
      })
    }
  },
  //选择是否上传视频
  Isvideo() {
    var that = this
    if (this.data.video === true) {
      that.setData({
        video: false
      })
    } else {
      that.setData({
        video: true
      })
    }
  },
  //上传视频时是否压缩
  IsCompressed() {
    var that = this
    if (this.data.compressed === true) {
      that.setData({
        compressed: false
      })
    } else {
      that.setData({
        compressed: true
      })
    }
  },
  //调用从本地相册选择图片或使用相机拍照API。
  ChooseImage() {
    wx.chooseImage({
      count: this.data.imgmax, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: this.data.upfrom, //选择图片来源， ['album', 'camera'][相册，相机]]
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //查看图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  //查看视频
  ViewVideo(e) {
    wx.createVideoContext //播放视频（仍然不太完善）
    VideoContext.requestFullScreen
  },
  //调用拍摄视频或从手机相册中选视频API。
  ChooseVideo(e) {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: this.data.vtime,
      camera: this.data.pcdirection,
      success: (res) => {
    //    if (this.data.videoList.length == 0) {
          this.setData({
            videoList: this.data.videoList.concat(res.tempFilePaths)
          })
      //  } else {
       //   this.setData({
      //      videoList: res.tempFilePaths
        //  })
//}
        console.log(123)
      }
    })
  },
  //调用API删除图片
  DelImg(e) {
    wx.showModal({
      title: "删除图片",
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //调用API删除视频
  DelVideo(e) {
    wx.showModal({
      title: "删除视频",
      content: '确定要删除此视频吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.videoList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            videoList: this.data.videoList
          })
        }
      }
    })
  },
})
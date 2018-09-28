const linebot = require('linebot')
console.log(process.env.channelId)
const bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
})

bot.on('message', function (event) {
  if (event.message.type === 'text') {
    event.reply({
      type: 'template',
      altText: '你想知道哪裡的餐廳嗎？找不到最近的加油站？點擊下方按鈕[傳送位置資訊]，PlaceFinder幫你找到你想找的地點！',
      template: {
        type: 'buttons',
        text: '你想知道哪裡的餐廳嗎？找不到最近的加油站？點擊下方按鈕[傳送位置資訊]，PlaceFinder幫你找到你想找的地點！',
        imageAspectRatio: 'rectangle',
        imageSize: 'contain',
        thumbnailImageUrl: process.env.domain + 'static/brownThinking.jpg',
        imageBackgroundColor: '#ffffff',
        actions: [{
          type: 'location',
          label: '傳送位置資訊'
        }]
      }
    }).then(function (data) {
      // success
      console.log(data)
    }).catch(function (error) {
      // error
      console.log(error)
    })
  } else if (event.message.type === 'location') {
    let location = event.message.latitude + ',' + event.message.longitude
    event.reply({
      type: 'template',
      altText: '你在找哪種地點呢？',
      template: {
        type: 'buttons',
        text: '你在找哪種地點呢？',
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
        thumbnailImageUrl: process.env.domain + 'static/hangout.jpg',
        imageBackgroundColor: '#00cd02',
        actions: [{
          type: 'uri',
          label: '餐廳',
          uri: 'line://app/' + process.env.listLiffID + '?types=restaurant&location=' + location
        },
        {
          type: 'uri',
          label: '藥局',
          uri: 'line://app/' + process.env.listLiffID + '?types=pharmacy&location=' + location
        },
        {
          type: 'uri',
          label: '加油站',
          uri: 'line://app/' + process.env.listLiffID + '?types=gas_station&location=' + location
        },
        {
          type: 'uri',
          label: '便利商店',
          uri: 'line://app/' + process.env.listLiffID + '?types=convenience_store&location=' + location
        }
        ]
      }
    }).then(function (data) {
      // success
      console.log(data)
    }).catch(function (error) {
      // error
      console.log(error)
    })
  }
})

module.exports = bot.parser()

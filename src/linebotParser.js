const linebot = require('linebot')
const bot = linebot({
  channelId: process.env.channelId.slice(1, -1),
  channelSecret: process.env.channelSecret.slice(1, -1),
  channelAccessToken: process.env.channelAccessToken.slice(1, -1)
})
bot.on('message', function (event) {
  if (event.message.type === 'sticker' || (event.message.type === 'text' && event.message.text.search('line://') === -1)) {
    event.reply({
      type: 'template',
      altText: '你想知道哪裡的餐廳嗎？找不到最近的加油站？點擊下方按鈕[傳送位置資訊]，PlaceFinder幫你找到你想找的地點！',
      template: {
        type: 'buttons',
        text: '你想知道哪裡的餐廳嗎？找不到最近的加油站？點擊下方按鈕[傳送位置資訊]，PlaceFinder幫你找到你想找的地點！',
        imageAspectRatio: 'rectangle',
        imageSize: 'contain',
        thumbnailImageUrl: process.env.domain.slice(1, -1) + 'static/brownThinking.jpg',
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
    let listLiffID = process.env.listLiffID.slice(1, -1)
    console.log(process.env.listLiffID.slice(1, -1))

    event.reply({
      type: 'template',
      altText: '你在找哪種地點呢？',
      template: {
        type: 'buttons',
        text: '你在找哪種地點呢？',
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
        thumbnailImageUrl: process.env.domain.slice(1, -1) + 'static/hangout.jpg',
        imageBackgroundColor: '#00cd02',
        actions: [{
          type: 'uri',
          label: '餐廳',
          uri: 'line://app/' + listLiffID + '?types=restaurant&location=' + location
        },
        {
          type: 'uri',
          label: '藥局',
          uri: 'line://app/' + listLiffID + '?types=pharmacy&location=' + location
        },
        {
          type: 'uri',
          label: '加油站',
          uri: 'line://app/' + listLiffID + '?types=gas_station&location=' + location
        },
        {
          type: 'uri',
          label: '便利商店',
          uri: 'line://app/' + listLiffID + '?types=convenience_store&location=' + location
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

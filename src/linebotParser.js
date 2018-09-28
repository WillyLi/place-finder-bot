const linebot = require('linebot')
const bot = linebot({
  channelId: '1610106375',
  channelSecret: '2ff2ee93a2543970d98feeb78958fc77',
  channelAccessToken: 'GuwaYCruI+VDwEp/gWZ4O61Wx7WzOBu5/5/Ir1mybSuDfY3ur2jjjIKZPZTjz7iQ6v7XBTEP+zfDxq2KzHlpuaJZUV7wPLIjkhrVMcjnn72qYzD4SN5u98usLFkT96r9EW6DglSSrb7rmo6ryOt7dAdB04t89/1O/w1cDnyilFU='
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
        thumbnailImageUrl: 'https://static.newmobilelife.com/wp-content/uploads/2018/03/share-location-with-iphone_03.png',
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
        thumbnailImageUrl: 'https://img.appledaily.com.tw/images/ReNews/20160311/640_0bdb7a5f591c3ebc9fe498d458fe7d0b.jpg',
        imageBackgroundColor: '#00cd02',
        actions: [{
          type: 'uri',
          label: '餐廳',
          uri: 'line://app/1610106375-95yDl55L?types=restaurant&location=' + location
        },
        {
          type: 'uri',
          label: '藥局',
          uri: 'line://app/1610106375-95yDl55L?types=pharmacy&location=' + location
        },
        {
          type: 'uri',
          label: '加油站',
          uri: 'line://app/1610106375-95yDl55L?types=gas_station&location=' + location
        },
        {
          type: 'uri',
          label: '便利商店',
          uri: 'line://app/1610106375-95yDl55L?types=convenience_store&location=' + location
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

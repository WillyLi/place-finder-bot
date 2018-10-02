import axios from 'axios'

const language = 'zh-TW'
export default {
  getList ({
    commit,
    state
  }, payload) {
    let nextPageToken = state.nextPageToken
    if (!state.pageTokens.has(nextPageToken) && nextPageToken !== 'end') {
      commit('setLoading', true)
      axios
        .get(process.env.domain + 'api/getList', {
          params: {
            language,
            pagetoken: nextPageToken,
            location: payload.location,
            rankby: payload.rankby,
            types: payload.types
          }
        })
        .then(res => {
          commit('setPlaces', res.data.results)
          commit('setPageTokens', nextPageToken)
          commit('setLoading', false)
          commit('setNextPageToken', res.data.next_page_token || 'end')
          window.addEventListener('scroll', payload.scrollHandler)

          if (process.env.NODE_ENV === 'development') {
            console.log(res)
          }
        })
        .catch(error => {
          if (process.env.NODE_ENV === 'development') {
            console.log(error)
          }
        })
    }
  },
  getDetail ({
    commit
  }, payload) {
    commit('setDetail', {
      data: {
        'html_attributions': [],
        'result': {
          'address_components': [{
            'long_name': '內湖區',
            'short_name': '內湖區',
            'types': ['administrative_area_level_3', 'political']
          }, {
            'long_name': '台北市',
            'short_name': '台北市',
            'types': ['administrative_area_level_1', 'political']
          }, {
            'long_name': '台灣',
            'short_name': 'TW',
            'types': ['country', 'political']
          }, {
            'long_name': '11492',
            'short_name': '11492',
            'types': ['postal_code']
          }],
          'adr_address': '<span class="postal-code">11492</span><span class="country-name">台灣</span><span class="region">台北市</span><span class="locality">內湖區</span>瑞光路631號1樓',
          'formatted_address': '11492台灣台北市內湖區瑞光路631號1樓',
          'formatted_phone_number': '02 2657 1237',
          'geometry': {
            'location': {
              'lat': 25.08041369999999,
              'lng': 121.5664128
            },
            'viewport': {
              'northeast': {
                'lat': 25.0817626802915,
                'lng': 121.5677617802915
              },
              'southwest': {
                'lat': 25.07906471970849,
                'lng': 121.5650638197085
              }
            }
          },
          'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
          'id': '86fb6b221aa5805c893161d1772f4b9af2fc6e61',
          'international_phone_number': '+886 2 2657 1237',
          'name': 'Extension 1 by 橘色',
          'opening_hours': {
            'open_now': true,
            'periods': [{
              'close': {
                'day': 0,
                'time': '2200'
              },
              'open': {
                'day': 0,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 1,
                'time': '1500'
              },
              'open': {
                'day': 1,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 1,
                'time': '2200'
              },
              'open': {
                'day': 1,
                'time': '1700'
              }
            }, {
              'close': {
                'day': 2,
                'time': '1500'
              },
              'open': {
                'day': 2,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 2,
                'time': '2200'
              },
              'open': {
                'day': 2,
                'time': '1700'
              }
            }, {
              'close': {
                'day': 3,
                'time': '1500'
              },
              'open': {
                'day': 3,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 3,
                'time': '2200'
              },
              'open': {
                'day': 3,
                'time': '1700'
              }
            }, {
              'close': {
                'day': 4,
                'time': '1500'
              },
              'open': {
                'day': 4,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 4,
                'time': '2200'
              },
              'open': {
                'day': 4,
                'time': '1700'
              }
            }, {
              'close': {
                'day': 5,
                'time': '1500'
              },
              'open': {
                'day': 5,
                'time': '1130'
              }
            }, {
              'close': {
                'day': 5,
                'time': '2200'
              },
              'open': {
                'day': 5,
                'time': '1700'
              }
            }, {
              'close': {
                'day': 6,
                'time': '2200'
              },
              'open': {
                'day': 6,
                'time': '1130'
              }
            }],
            'weekday_text': ['星期一: 11:30 – 15:00, 17:00 – 22:00', '星期二: 11:30 – 15:00, 17:00 – 22:00', '星期三: 11:30 – 15:00, 17:00 – 22:00', '星期四: 11:30 – 15:00, 17:00 – 22:00', '星期五: 11:30 – 15:00, 17:00 – 22:00', '星期六: 11:30 – 22:00', '星期日: 11:30 – 22:00']
          },
          'photos': [{
            'height': 3000,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/105886342123328947730/photos">Hsuan-ju Chen</a>'],
            'photo_reference': 'CmRZAAAAXNFF19C1qVxjZIuqrS2Pa1RDk_-jqJ1ty-YaklI4jLq3kkfMnwJSWbvY94PGUGjkjJUH9Gaq9G5n43PsgJYMVnSUBAr7NjjycDLTquqr_1Nsg88HIhR97fXu3DsRbtw-EhDLWKUSuxc55--HRcjwc7GsGhTwKUsDNDx-pbXjbJ_Q7bDYZ4lUHA',
            'width': 5333
          }, {
            'height': 3456,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100090483199929079440/photos">林慧芯</a>'],
            'photo_reference': 'CmRaAAAAUDwcX-PWLWf8Hz6oDkERaf9aD2yYcb60QEzSwDuI6PUyBo9vcIqM9DrUOgVFX7f06crCDQlV7c78wjNdfFxV4nbscU0S4g7Mh99X2nnh3UBLwTFfBhVEcDnWMyotHkrpEhCzpuJnJ0o4jOoDV3mS1zcBGhTwt2tW-w9fSTseN3SCbjxEf-CHpA',
            'width': 4608
          }, {
            'height': 5333,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/105886342123328947730/photos">Hsuan-ju Chen</a>'],
            'photo_reference': 'CmRZAAAAKySwGHCzkhcWerUPdr60svDUERR4p9nv18FRoSNq8FitOSqg4ewXHfI1AWZ47bffvOfj8MRkBNFxQ8YLMwz1OFIw81FS7PZW6VODkZv-pth9KUKmQWDQIfYIwO0mUo-PEhAzTEQ39mR2xqVW7qeFGgDAGhS_fwMwtRcJctz1zxOYmpSlvBRqKA',
            'width': 3000
          }, {
            'height': 3648,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/114224597333917672818/photos">Seven Liao</a>'],
            'photo_reference': 'CmRaAAAArpWislXZ-d2pulcU64HMSWoNsIdNiAZSxsvA0qtCRfdP8FmGPfzfhzlATwZyIu3UtwnSe_EeQfB3Jt3-wwSyWevpZB7zOv5WI8-TTMhHWkET8jePkuwum7gHs4R6yloXEhA7BDQhnvTl6D4aXMtW_Bi4GhTwtwkG8oo3YiqFxwHKU6MsSXzlOw',
            'width': 2736
          }, {
            'height': 3024,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/109986521444827712037/photos">Gaven Chou</a>'],
            'photo_reference': 'CmRaAAAAv_48_MeZtgW3tEeiGGfO0BeTKn4hR4QKGW5X3SOFJFPGBQQ8iAPpXvc5O2XuHgy-uzgdu40bJhaPDrQs6WFQwR1hK1Bl010bOwOCySRbbFDAcEYY4q4QOT8VBxz54s9TEhA3WUphynHbqgrhstXLl9l6GhQloAd1m0WiM5vRSLKF6_hEK4W8ag',
            'width': 4032
          }, {
            'height': 2448,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100090483199929079440/photos">林慧芯</a>'],
            'photo_reference': 'CmRaAAAApV8D6sGzfybnLFeC0moTeU0i3zFDZFzudXmzw_sqYRyBUaIIwm0nLKG1Fok_zeCTPz4Or8zZy4CfIWKVp_lGah77JOhM960qMLzLQFKZLoqABfOc-2JkHMEDYLJMVsu0EhDtVMMACobt6nKmwngsgvUdGhTYgPEkTVWIAPed-9aDC8ZjQSR3Yw',
            'width': 3264
          }, {
            'height': 4032,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/113784320127704642955/photos">魏宏儒</a>'],
            'photo_reference': 'CmRaAAAAAOv89V0API0mLfc3M0gKtMrg1jEvYSfMOtrGYKCc51MowMbHA5lKC6M9xqMmlPOOPKGH2nf9cvGFc2vMhti7UPys0Tuvwlq9fep16A3uQjwWNy_W78VVPYO4sKYRddIjEhDayvmiyKmi-gnKT61XB3BQGhRS8C-NC6e7Fve5gkP30PWaWvm4uA',
            'width': 3024
          }, {
            'height': 2424,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108647096680750145675/photos">Wei-Ying Chen</a>'],
            'photo_reference': 'CmRaAAAAn-HCaK-7aRhB2MpnTfLQF5Z_ZHnHhIZS98On4OLnkVBA4KTkmBTMVijCa9HUUDjP-1sZFkBWvT1b46iYrzvalajSiNPgr0Fca5XGP7U777b5Q0mb-2Ub1tguXwjQCKCfEhD-jZlfqJTI2faCniBMjZ1YGhR_hLRm_yOl1TVNGKAp60s2kgF_IA',
            'width': 3232
          }, {
            'height': 2448,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100090483199929079440/photos">林慧芯</a>'],
            'photo_reference': 'CmRaAAAAci6VpuXXcYvlzqEYHvy22mjLYke8Ha3eqj53AUQWQRg3Oi7E-F-4SjN1hhKONPjUNl173gTqYyPuF9Nd202jHmIqbhNb-6mnS7-ns1l8sKo2OEawtlEMHqQyDCCqrL2LEhDC1u305PqV7vqMx16hLKKAGhTnPiD2oQltwt1-yNuTQBM8BHTf-Q',
            'width': 3264
          }, {
            'height': 2448,
            'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100090483199929079440/photos">林慧芯</a>'],
            'photo_reference': 'CmRaAAAAyx2HlOtE8OJiDCs-lqvH51l_33xDMv367vdcsbs8uj99x3PFpUarNOQ83NMjdqQvdu1wXaCLrHvS6z-olRtOzZBmQ8IF-9d_DOMMfDxju4Sb8fqqprlIR4OXOKoNg9VdEhDri3l43EL5HTVIAWHHSUZ3GhRV2J5Y-d3Ufvyc5BuyHwYP9WRj4Q',
            'width': 3264
          }],
          'place_id': 'ChIJu29qbG6sQjQR2F7y-lbBkqY',
          'plus_code': {
            'compound_code': '3HJ8+5H 台灣台北',
            'global_code': '7QQ33HJ8+5H'
          },
          'rating': 4.4,
          'reference': 'ChIJu29qbG6sQjQR2F7y-lbBkqY',
          'reviews': [{
            'author_name': '廖元熙',
            'author_url': 'https://www.google.com/maps/contrib/113686502471227645645/reviews',
            'language': 'zh-Hant',
            'profile_photo_url': 'https://lh5.googleusercontent.com/-jybYjnmPmQ4/AAAAAAAAAAI/AAAAAAAAAZE/JyKxd_BsjT0/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg',
            'rating': 2,
            'relative_time_description': '本星期',
            'text': '主要的食材很ok，如肉、海鮮等。但是旁邊的配菜就一般的火鍋料非常普通，但我真的認為最Low 的是服務人員除了在一樓吧台服務的蓄鬍小哥以外的人，服務態度都不好。整體而言CP值不高。',
            'time': 1538215728
          }, {
            'author_name': 'Luis Hsu',
            'author_url': 'https://www.google.com/maps/contrib/102281722942273868852/reviews',
            'language': 'zh-Hant',
            'profile_photo_url': 'https://lh4.googleusercontent.com/-FF1kdV2XYZw/AAAAAAAAAAI/AAAAAAAABE4/gRq3HyIK-GQ/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
            'rating': 4,
            'relative_time_description': '3 週前',
            'text': '3.5顆星\n\n店裡的裝潢簡約但蠻氣脈的，走日式風格。\n\n橘色旗下副牌，主打個人鍋，是高檔食材的涮涮鍋，食材本身的品質有著與本店相同的水準，估計是中央廚房配送，價位偏高但以期待有橘色的品質來說，以去橘色消費的期待值來說，此價位還算可以接受，但我應該不會因私人的行程推薦這裡。\n\n火鍋就是講究食材，肉類、海鮮的品質都不錯，兩個字：新鮮。\n\n套餐價位很精準的對準商務客，公司聚餐等，酒水的選擇較少，除了清酒、葡萄酒外希望可以增加點啤酒選項。\n\n本次兩人消費兩份套餐(一份海陸一份牛肉，加點一份蛤蠣)、一瓶白葡萄酒加上服務費約NT$4500。\n\n小路評價：7/12',
            'time': 1536313991
          }, {
            'author_name': 'minikey',
            'author_url': 'https://www.google.com/maps/contrib/115954745122219830008/reviews',
            'language': 'zh-Hant',
            'profile_photo_url': 'https://lh6.googleusercontent.com/-jOdWNrwuzzw/AAAAAAAAAAI/AAAAAAAAAu8/Fz2zbcmRw4s/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
            'rating': 5,
            'relative_time_description': '2 週前',
            'text': '食材都相當新鮮美味，海鮮非常棒，牛肉厚度十足，圍繞吧台的形式都有服務人員協助料理，可以將食材煮至最剛好的程度，呈現食材的新鮮及口感。\n\n推薦副餐選擇雜炊，最後將煮食過海鮮及牛肉的湯頭拿來燉粥，非常入味，相當好吃！甜點的部分也很不錯，份量及口味做為結尾都相當剛好。\n\n如果不是聚會的場合，而是純粹為了用餐目的，個人認為，相較於橘色本店，更加推薦 Extension 1。',
            'time': 1537118688
          }, {
            'author_name': 'TAIWAN CHEN',
            'author_url': 'https://www.google.com/maps/contrib/118323751532806578228/reviews',
            'language': 'zh-Hant',
            'profile_photo_url': 'https://lh5.googleusercontent.com/-lBylr904nUI/AAAAAAAAAAI/AAAAAAAAAN4/EZb-LazHdHE/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
            'rating': 5,
            'relative_time_description': '1 個月前',
            'text': '\n頂級豬肉（霜降）、活蝦、蚵蠣、煮粥\n\n相當優質的食材，不論是豬肉、蝦、蛤蠣，都很新鮮！\n\n差不多一套吃完，約8分飽\n\n安靜雅緻\n\n非常優，店員還會幫妳撥蝦煮粥，甚至幫妳顧鍋內食物是不是煮太熟太久，建議一定要煮粥\n\n高價位，套餐最基本要600起跳',
            'time': 1535516348
          }, {
            'author_name': 'Sherry',
            'author_url': 'https://www.google.com/maps/contrib/101627405360394445653/reviews',
            'language': 'zh-Hant',
            'profile_photo_url': 'https://lh4.googleusercontent.com/-pywdETIhjJs/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DUqxnGn_Dj9L5_nbpt0AQjPBThX4A/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg',
            'rating': 5,
            'relative_time_description': '1 個月前',
            'text': '環境服務都非常棒（剝蝦非常專業），海鮮新鮮，蝦和鮑魚上來時都還活生生的動來動去。一樓只有21個座位，如果是用餐時段感覺很容易滿，要先訂位比較保險。開車來旁邊就有停車場（但是非合作的🅿️，沒有折抵）',
            'time': 1535300034
          }],
          'scope': 'GOOGLE',
          'types': ['restaurant', 'food', 'point_of_interest', 'establishment'],
          'url': 'https://maps.google.com/?cid=12002868536217329368',
          'utc_offset': 480,
          'vicinity': '內湖區瑞光路631號1樓',
          'website': 'https://www.facebook.com/Extension1byOrangeshabu/'
        },
        'status': 'OK'
      }
    })

    // axios
    //   .get(process.env.domain + 'api/getDetail', {
    //     params: {
    //       language,
    //       ...payload
    //     }
    //   })
    //   .then(res => {
    //     commit('setDetail', res)
    //     if (process.env.NODE_ENV === 'development') {
    //       console.log(res)
    //     }
    //   })
    //   .catch(error => {
    //     if (process.env.NODE_ENV === 'development') {
    //       console.log(error)
    //     }
    //   })
  }
}

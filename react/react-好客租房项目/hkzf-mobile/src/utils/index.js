import { API } from '../utils'
export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    return new Promise((resolve,reject) => {
      const curCity = new window.BMapGL.LocalCity()
      curCity.get(async res => {
        try {
          console.log('当前城市信息：',res)
          const result = await API.get(`/area/info?name=${res.name}`)
          console.log(result)
          // 存储到本地存储中
          localStorage.setItem('hkzf_city',JSON.stringify(result.data.body))
          // 返回该城市数据
          resolve(result.data.body)
        }catch(e) {
          // 获取定位城市失败
          reject(e)
        }
      })
    })
  }

  // 如果有，直接返回本地存储中的城市数据
  // 注意 因为上面为了处理异步操作，使用了Promise 因此 为了该函数返回值的统一，也应该使用Promise
  // 因为此处的Promise 不会失败，所以，只要返回一个成功的Promise即可
  return Promise.resolve(localCity)
} 

export { API } from './api'
export { BASE_URL } from './url'
// 导出 auth 模块中的所有内容
export * from './auth'

export { getCity, setCity } from './city'
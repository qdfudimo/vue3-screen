import request from '@/util/request'

/**
 * 获取每日疫情数据
 */
const getChinaDayList = () => {
  return request({
    url: '/chinaDayList',
    method: 'post',
  })
}
/**
 * 获取世界每日疫情数据
 */
const getWorldDayList = () => {
  return request({
    url: '/worldDayList',
    method: 'post',
  })
}

export {
  getChinaDayList,
  getWorldDayList
}
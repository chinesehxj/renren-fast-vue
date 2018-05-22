import isInteger from 'lodash/isInteger'
import httpRequest from '@/utils/httpRequest'

var hmcarrier = {
  // 获取列表
  list: function (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/server/hmcarrier/list'),
      method: 'get',
      params: httpRequest.adornParams(params, 'get')
    })
  },
  // 获取信息
  info: function (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/server/hmcarrier/info' + (isInteger(id) ? `/${id}` : '')),
      method: 'get',
      params: httpRequest.adornParams(id)
    })
  },
  // 添加
  add: function (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/server/hmcarrier/save'),
      method: 'post',
      data: httpRequest.adornParams(params)
    })
  },
  // 修改
  updat: function (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/server/hmcarrier/update'),
      method: 'post',
      data: httpRequest.adornParams(params)
    })
  },
  // 删除
  del: function (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/server/hmcarrier/delete'),
      method: 'post',
      data: httpRequest.adornParams(params, 'post', false)
    })
  }
}

export default hmcarrier

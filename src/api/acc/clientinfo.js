import request from '@/utils/request'
export function CheckintoChildSystem(clientId) {
  return request({
    url: '/client/client/data/intoChildSystem',
    method: 'get',
    params: { clientId }
  })
}

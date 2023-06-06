import request from '@/utils/request'


export function Sinatv(row) 
{

  return request({
    url: '/account/da-notice/noticeList',
    method: 'get',
    params: {row}
  })
}
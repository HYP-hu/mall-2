import instance from './requests'

export function getHomeMultiData(){
  return instance({
    url: '/api/v1/home/multidata'
  }
  )
}

export function getHomeGoods(type, page) {
  return instance({
    url: '/api/v1/home/data',
    params: {
      type,
      page
    }
  })
}

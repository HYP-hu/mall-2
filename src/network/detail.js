import instance from './requests'
export function getDeatil(id) {
  return instance({
    url: '/api/v1/detail',
    params: {
      iid: id
    }
  })
}

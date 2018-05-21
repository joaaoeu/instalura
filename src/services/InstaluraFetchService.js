import { AsyncStorage } from 'react-native'

const path = 'https://instalura-api.herokuapp.com/api'

export default class InstaluraFetchService {

  static get(resource) {
    return AsyncStorage.getItem('token')
    .then(token => {
      return {
        headers: new Headers({
          "X-AUTH-TOKEN": token
        })
      }
    })
    .then(request => fetch(`${path}${resource}`, request))
    .then(response => response.json())
    .catch({
      
    })
  }

}

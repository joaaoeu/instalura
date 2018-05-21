import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'

// Screens
import Login from './screens/Login'
import Feed from './screens/Feed'

Navigation.registerComponent('Login', () => Login)
Navigation.registerComponent('Feed', () => Feed)

AsyncStorage.getItem('token')
.then(token => {
  if(token)
    return {
      screen: 'Feed',
      title: 'Instalura'
    }

  return {
    screen: 'Login',
    navigatorStyle: {
      navBarHidden: true
    }
  }
})
.then(screen => Navigation.startSingleScreenApp({screen}))

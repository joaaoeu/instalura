import { Dimensions, StyleSheet } from 'react-native'

const screen = Dimensions.get('screen')

export default StyleSheet.create({
  media: {
    width: screen.width,
    height: screen.width
  },
  mediaDoubleTap: {
    position: 'absolute',
    zIndex: 9999,
    width: 90,
    height: 90,
    top: screen.width * .4,
    left: screen.width * .38
  }
})

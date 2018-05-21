import { Dimensions, StyleSheet } from 'react-native'

const screen = Dimensions.get('screen')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 15
  },
  form: {
    width: screen.width * .75
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  error: {
    fontSize: 14,
    color: '#e04a4a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  }
})

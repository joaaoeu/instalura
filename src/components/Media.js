import React, { Component } from 'react'
import {
  Image,
  TouchableWithoutFeedback,
  View
} from 'react-native'

// Styles
import styles from './styles/Media'

export default class Media extends Component {
  constructor() {
    super()

    this.state = {
      lastMediaTapTime: null,
      mediaDoubleTap: false
    }
  }

  handleMediaTap = () => {
    const { lastMediaTapTime } = this.state
    const now = new Date().getTime()

    if(lastMediaTapTime && (now - lastMediaTapTime) < 300) {
      this.setState({lastMediaTapTime: null})
      this.handleMediaDoubleTap()
    } else {
      this.setState({lastMediaTapTime: now})
    }
  }

  handleMediaDoubleTap = () => {
    const { idPost, likeada, likesCallback } = this.props

    !likeada &&
      likesCallback(idPost)

    this.setState({mediaDoubleTap: true})
    setTimeout(() => { this.setState({mediaDoubleTap: false}) }, 600)
  }

  render() {
    const { mediaDoubleTap } = this.state
    const { urlFoto } = this.props

    return(
      <View>
        {
          mediaDoubleTap &&
            <Image
              style={styles.mediaDoubleTap}
              source={require('../../resources/img/icon-media-double-tap.png')} />
        }
        <TouchableWithoutFeedback onPress={this.handleMediaTap}>
          <Image
            style={styles.media}
            source={{uri: urlFoto}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

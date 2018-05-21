import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

// Styles
import styles from './styles/Likes'

export default class Likes extends Component {
  getLikeIcon = (liked) => {
    return liked
    ? require('../../resources/img/icon-like-checked.png')
    : require('../../resources/img/icon-like.png')
  }

  getLikers = (likers) => {
    return likers.length > 0 &&
      <Text style={styles.likeLabel}>
        {likers.length} {likers.length === 1 ? 'like' : 'likes'}
      </Text>
  }

  render() {
    const { idPost, likeada, likers, likesCallback } = this.props

    return(
      <View>
        <TouchableOpacity
          style={styles.likeIcon}
          onPress={() => {likesCallback(idPost)}}>
          <Image
            style={styles.likeIcon}
            source={this.getLikeIcon(likeada)} />
        </TouchableOpacity>

        {this.getLikers(likers)}
      </View>
    )
  }
}

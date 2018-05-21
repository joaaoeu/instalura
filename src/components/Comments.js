import React, { Component } from 'react'
import { Text, View } from 'react-native'

// Styles
import styles from './styles/Comments'

export default class Comments extends Component {
  render() {
    const { comments } = this.props

    return(
      <View>
        {
          comments !== '' &&
            comments.map(comment =>
              <Text key={comment.id}>
                <Text style={styles.commentAuthor}>{comment.login} </Text>
                <Text>{comment.texto}</Text>
              </Text>
            )
        }
      </View>
    )
  }
}

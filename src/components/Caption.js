import React, { Component } from 'react'
import { Text } from 'react-native'

// Styles
import styles from './styles/Comments'

export default class Caption extends Component {
  render() {
    const { caption, user } = this.props

    return(
      caption !== '' &&
        <Text>
          <Text style={styles.commentAuthor}>{user} </Text>
          <Text>{caption}</Text>
        </Text>
    )
  }
}

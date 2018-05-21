import React, { Component } from 'react'
import {
  Image,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

// Styles
import styles from './styles/NewCommentInput'

export default class NewCommentInput extends Component {
  constructor() {
    super()

    this.state = {
      newCommentValue: ''
    }
  }

  handleAddComment = () => {
    const { newCommentValue } = this.state
    const { idPost, newCommentCallback } = this.props

    newCommentCallback(idPost, newCommentValue, this.newCommentInput)

    this.setState({newCommentValue: ''})
  }

  render() {
    return(
      <View style={styles.newComment}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          placeholder="Adicione um comentário..."
          ref={input => this.newCommentInput = input}
          onChangeText={text => this.setState({newCommentValue: text})}
          onSubmitEditing={this.handleAddComment} />

        <TouchableOpacity onPress={this.handleAddComment}>
          <Image
            style={styles.sendIcon}
            source={require('../../resources/img/icon-send.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

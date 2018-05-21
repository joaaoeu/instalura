import React, { Component } from 'react'
import {
  Image,
  Text,
  View
} from 'react-native'

// Styles
import styles from './styles/Post'

// Components
import Media from './Media'
import Likes from './Likes'
import Caption from './Caption'
import Comments from './Comments'
import NewCommentInput from './NewCommentInput'

export default class Post extends Component {
  render() {
    const { postData, likesCallback, newCommentCallback } = this.props

    return(
      <View>
        <View style={styles.header}>
          <Image
            style={styles.profilePicture}
            source={{uri: postData.urlPerfil}} />
          <Text>{postData.loginUsuario}</Text>
        </View>

        <Media
          idPost={postData.id}
          likeada={postData.likeada}
          urlFoto={postData.urlFoto}
          likesCallback={likesCallback} />

        <View style={styles.footer}>
          <Likes
            idPost={postData.id}
            likeada={postData.likeada}
            likers={postData.likers}
            likesCallback={likesCallback} />

          <Caption
            caption={postData.comentario}
            user={postData.loginUsuario} />

          <Comments comments={postData.comentarios} />

          <NewCommentInput
            idPost={postData.id}
            newCommentCallback={newCommentCallback} />
        </View>
      </View>
    )
  }
}

import React, { Component } from 'react'
import { AsyncStorage, FlatList } from 'react-native'

// Components
import Post from '../components/Post'

// Services
import InstaluraFetchService from '../services/InstaluraFetchService'

export default class Feed extends Component {
  constructor() {
    super()

    this.state = {
      postList: []
    }
  }

  componentDidMount() {
    InstaluraFetchService.get('/fotos')
      .then(response => this.setState({postList: response}))
  }

  getPostById = (idPost) => {
    return this.state.postList
      .find(post => post.id === idPost)
  }

  updatePostList = (postUpdated) => {
    const postList = this.state.postList
      .map(post => post.id === postUpdated.id ? postUpdated : post)

    this.setState({postList})
  }

  handleLike = (idPost) => {
    AsyncStorage.getItem('user')
    .then(user => {
      const post = this.getPostById(idPost)

      let newLikers = []

      !post.likeada
      ? newLikers = [
          ...post.likers,
          {login: user}
        ]
      : newLikers = post.likers.filter(liker => {
          return liker.login !== user
        })

      const postUpdated = {
        ...post,
        likeada: !post.likeada,
        likers: newLikers
      }

      this.updatePostList(postUpdated)

      AsyncStorage.getItem('token')
      .then(token => {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${idPost}/like`, {
          method: 'POST',
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        })
        .then(response => {
          if(response.ok)
            return

          this.updatePostList(post)
        })
      })
    })
  }

  addComment = (idPost, newCommentValue, newCommentInput) => {
    if(newCommentValue === '')
      return

    const post = this.getPostById(idPost)

    AsyncStorage.getItem('token')
    .then(token => {
      fetch(`https://instalura-api.herokuapp.com/api/fotos/${idPost}/comment`, {
        method: 'POST',
        body: JSON.stringify({
          texto: newCommentValue
        }),
        headers: new Headers({
          "Content-Type": 'application/json',
          "X-AUTH-TOKEN": token
        })
      })
      .then(response => {
        if(!response.ok)
          return

        return response.json()
      })
      .then(comentario => [...post.comentarios, comentario])
      .then(comentarios => {
        const postUpdated = {
          ...post,
          comentarios
        }

        this.updatePostList(postUpdated)

        newCommentInput.clear()
      })
    })
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => String(item.id)}
        data={this.state.postList}
        renderItem={ ({item}) =>
          <Post
            postData={item}
            likesCallback={this.handleLike}
            newCommentCallback={this.addComment} />
        }
      />
    )
  }
}

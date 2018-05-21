import React, { Component } from 'react'
import {
  AsyncStorage,
  Button,
  Image,
  Text,
  TextInput,
  View
} from 'react-native'

// Styles
import styles from './styles/Login'

export default class Login extends Component {
  constructor(){
    super()

    this.state = {
      user: '',
      password: '',
      error: ''
    }
  }

  handleLogin = () => {
    const { user, password } = this.state
    const { navigator } = this.props

    if(user !== '' && password !== '') {

      const path = 'https://instalura-api.herokuapp.com/api'
      const resource = '/public/login'
      const request = {
        method: 'POST',
        body: JSON.stringify({
          login: user,
          senha: password
        }),
        headers: new Headers({
          "Content-Type": 'application/json'
        })
      }

      fetch(`${path}${resource}`,request)
      .then(response => {
        if(response.ok)
          return response.text()

        throw new Error('Usuário ou senha incorretos!')
      })
      .then(token => {
        this.setState({error: ''})

        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('user', user)

        navigator.resetTo({
          screen: 'Feed',
          title: 'Instalura'
        })
      })
      .catch(error => {
        this.setState({error: error.message})
      })
    } else {
      this.setState({error: 'Informe um usuário e uma senha!'})
    }
  }

  render() {
    const { error } = this.state

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../resources/img/instalura.png')} />

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Usuário..."
            onChangeText={text => this.setState({user: text})}
            returnKeyType={"next"}
            blurOnSubmit={false}
            onSubmitEditing={() => {this.passwordInput.focus()}} />

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Senha..."
            ref={input => this.passwordInput = input}
            onChangeText={text => this.setState({password: text})}
            onSubmitEditing={this.handleLogin} />

          {
            error !== '' &&
            <Text style={styles.error}>{error}</Text>
          }

          <Button
            color="#2e0e0e"
            title="Login"
            accessibilityLabel="Login"
            onPress={this.handleLogin} />
        </View>
      </View>
    )
  }
}

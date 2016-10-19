import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'

const isClient = typeof window !== 'undefined'
if (isClient) {
  var Auth0Lock = require('auth0-lock').default
}

export default class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()
    if (!isClient) {
      return false
    }
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, { // eslint-disable-line
      theme: {
        primaryColor: '#000'
      },
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication (authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  _authorizationError (error) {
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login () {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile (profile) {
    // Saves profile data to isClient && window.localStorage
    isClient && window.localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile () {
    // Retrieves the profile data from isClient && window.localStorage
    const profile = isClient && window.localStorage.getItem('profile')
    return profile ? JSON.parse(isClient && window.localStorage.profile) : {}
  }

  setToken (idToken) {
    // Saves user token to isClient && window.localStorage
    isClient && window.localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from isClient && window.localStorage
    return isClient && window.localStorage.getItem('id_token')
  }

  logout () {
    // Clear user token and profile data from isClient && window.localStorage
    isClient && window.localStorage.removeItem('id_token')
    isClient && window.localStorage.removeItem('profile')
  }
}
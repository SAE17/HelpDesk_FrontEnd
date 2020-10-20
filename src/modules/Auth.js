class Auth {
  /**
   * Authenticate a user. Save it in Local Storage
   *
   * @param {boolean} isLoggedIn
   */
  static authenticateUser(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn)
  }

  /**
   * Check if a user is authenticated
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return !!localStorage.getItem('isLoggedIn')
  }

  /**
   * Deauthenticate a user. Remove a isLoggedIn from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('isLoggedIn')
  }
}

export default Auth

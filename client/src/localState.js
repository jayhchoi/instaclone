export const defaults = {
  isAuthenticated: localStorage.getItem('token') ? true : false
}

export const resolvers = {
  Mutation: {
    loginUser: (_, { token }, { cache }) => {
      localStorage.setItem('token', token)
      cache.writeData({
        data: {
          isAuthenticated: true
        }
      })
      return null
    },
    logoutUser: (_, args, { cache }) => {
      localStorage.removeItem('token')
      window.location.reload()
      return null
    }
  }
}

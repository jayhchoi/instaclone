export const isAuthenticated = userId => {
  if (!userId) throw new Error('Authentication required')
  return true
}

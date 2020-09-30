export const regexEmail = (email: string): any => {
  const emailSplited = email.split('@')
  const regex = new RegExp(`^(\w+([-+.']\w+)*|\\*)@${emailSplited}$|\\*|${email}`)
  return regex
}
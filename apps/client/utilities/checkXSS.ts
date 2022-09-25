import { toast } from 'react-hot-toast'

export const checkXSS = (inputs: string[]) => {
  const inputString = inputs.join('').toLowerCase()
  const includeScriptTag =
    inputString.includes('<script>') || inputString.includes('</script>')
  if (includeScriptTag) {
    toast.error('Inputs cannot contain script tag.')
    return true
  } else {
    return false
  }
}

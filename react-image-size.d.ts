declare module 'react-image-size' {
  type Size = {
    width: number
    height: number
  }
  // eslint-disable-next-line no-unused-vars
  const reactImageSize: (src: string ) => Promise<Size>
  export default reactImageSize
}

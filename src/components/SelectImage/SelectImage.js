import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadImage } from '../../util/s3_storage'

import css from './SelectImage.css'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

const SelectImage = (props) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles[0])
      await uploadImage(acceptedFiles[0])
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ))

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section className="container">
      <div {...getRootProps({ className: css.root })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  )
}

// class SelectImage extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { pictures: [] }
//     this.onDrop = this.onDrop.bind(this)
//   }
//
//   async onDrop(pictureFiles, pictureDataURLs) {
//     console.log(pictureFiles)
//     this.setState({
//       pictures: this.state.pictures.concat(pictureFiles)
//     })
//     // await uploadImage(pictureFiles[0])
//   }
//
//   render() {
//     return (
//       <ImageUploader
//         withIcon={true}
//         buttonText="Choose images"
//         onChange={this.onDrop}
//         imgExtension={['.jpg', '.gif', '.png', '.gif']}
//         maxFileSize={5242880}
//       />
//     )
//   }
// }

export default SelectImage

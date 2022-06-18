import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, { defaultClassNames, IDropzoneProps } from 'react-dropzone-uploader';
import { useNavigate } from 'react-router-dom';
import Layout from './ImagesLayout';
import { useState } from 'react';

// interface ImagesProp {
  
// }

const ImagesInput = () => {
  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: 'https://httpbin.org/post' })
  const navigate = useNavigate();
  const [images, setImages] = useState<any>([]);

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, file }, status) => {
    const reader = new FileReader();

    reader.onload = function() {
      const imgUrl = reader.result;
      setImages(images.push(imgUrl))
      return imgUrl;
    }

    reader.readAsDataURL(file)
    //console.log(status, meta)
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => {
      const reader = new FileReader();

      reader.onload = function() {
        const imgUrl = reader.result;
        //setImages(images.push(imgUrl))
        return imgUrl;
      }
  
      reader.readAsDataURL(f.file)
      //return f;
    }
      ))
    console.log(images);
    allFiles.forEach(f => f.remove())
    navigate('/upload-property/details')
  }

  return (
    <div className='flex justify-center items-center align-middle min-h-screen'>
      <div className='w-[60%]'>
        <Dropzone
          getUploadParams={getUploadParams}
          LayoutComponent={Layout}
          onSubmit={handleSubmit}
          onChangeStatus={handleChangeStatus}
          classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
          inputContent="Drop/Select Property Images"
          submitButtonContent="Save Images and Enter details ->"
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
            submitButton: { backgroundColor: '#212222' },
            dropzone: { overflow: 'hidden' }
          }}
        />
      </div>
    </div>
  )
}

export default ImagesInput;

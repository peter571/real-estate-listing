import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '../CustomComponents';
import { useAppDispatch } from '../../store/hooks';
import { propertyActions } from '../../store';

const ImagesInput = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    var files = e.target.files!;
    let arr: string[] = [];

    function readAndPreview(file: File) {

      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.onload = function () {
          const imgUrl = this.result;
          if (typeof imgUrl === 'string') {
            arr.push(imgUrl);
          }
          setImages(arr);
        }
        reader.readAsDataURL(file);
      }
    }

    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  }


  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(propertyActions.uploadImages(images));
    navigate('/upload-property/details');
  }

  return (
    <div className='flex justify-center items-center align-middle min-h-screen'>
      <div className='flex flex-col justify-center items-center align-middle w-[60%]'>
        <h1 className='my-5 font-bold antialiased text-lg'>Upload clear images of your property</h1>
        <div className='flex flex-wrap flex-row gap-4'>
          {images?.map((url, index) => {
            return <img className='' key={index} src={url} />
          })}
        </div>
        <input
          className='bg-[#212222] text-white my-5'
          type="file"
          name="properties"
          onChange={handleChange}
          multiple
          required
        />
        {images.length > 0 && (
          <Button onClick={handleSubmit} buttonText={'Save & add details ->'} type="submit" />
        )}
      </div>
    </div>
  )
}

export default ImagesInput;

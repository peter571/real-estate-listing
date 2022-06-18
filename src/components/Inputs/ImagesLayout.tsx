import React from 'react';
import { ILayoutProps } from 'react-dropzone-uploader';

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
    return (
      <div>
        <div className='flex flex-wrap gap-4'>
          {previews}
        </div>
        <div {...dropzoneProps}>
          {files.length < maxFiles && input}
        </div>
        <div className='my-3'>
          {files.length > 0 && submitButton}
        </div>
      </div>
    )
  }

export default Layout;

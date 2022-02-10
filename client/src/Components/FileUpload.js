import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Upload_File}from '../actions/userActions';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState();
  console.log("files", files);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('multi-files', files);
    dispatch(Upload_File(formData))
  }
  return (
      <>
          <div className='main_div'>
            <div className="header_div">
                <h1>Files</h1>
            </div> 
            <form onSubmit={handleSubmit}>
              <div>
                  <label>Upload Files</label>
                  <input type="file" id="file" name="files" onChange={(e) => setFiles(e.target.files[0]) } multiple/>
                  <button type='submit'>Upload</button>
              </div>
              <div>
                  
              </div>
            </form>
          </div>
      </>
  );
};

export default FileUpload;

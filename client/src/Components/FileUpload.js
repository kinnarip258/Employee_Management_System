import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Upload_File}from '../actions/userActions';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  console.log("files", file);

  const LoginUser = useSelector(state => state.LoginUser)
  console.log("LoginUser._id", LoginUser._id)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('multi-files', file);
    dispatch(Upload_File(LoginUser._id,formData))
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
                  <input type="file" id='file' onChange={(e) => setFile(e.target.files[0]) }/>
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

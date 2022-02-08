import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {Upload_File}from '../actions/userActions';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  console.log("file", file);
  
  return (
      <>
          <div className='main_div'>
            <div className="header_div">
                <h1>Files</h1>
            </div> 
            <form>
              <div>
                  <label>Upload Files</label>
                  <input type="file" name="profile-file" required onChange={(e) => setFile(e.target.value)}/>
                  <button onClick={() => dispatch(Upload_File())}>Upload</button>
              </div>
              <div>
                  
              </div>
            </form>
          </div>
      </>
  );
};

export default FileUpload;

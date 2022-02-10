import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Upload_File}from '../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const FileUpload = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState('');
  console.log("files", files);

  const handleSubmit = (e) => {
    console.log(files)
    if(files === ""){
      e.preventDefault();
      toast.error("select File", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
    else{
      e.preventDefault();
      const formData = new FormData();
      for(let i = 0 ; i< 5; i++){
        formData.append('multi-files', files[i]);
      }
      dispatch(Upload_File(formData))
    }
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
                  <input type="file" id="file" name="files" onChange={(e) => setFiles({...files, ...e.target.files}) } multiple/>
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

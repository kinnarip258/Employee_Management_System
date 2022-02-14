import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '@mui/material/Pagination';
import {Delete_File, Get_File, Loading_Toggle, Upload_File}from '../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const FileUpload = () => {

  const dispatch = useDispatch();
  const [files, setFiles] = useState('');
  const [loader, setLoader] = useState(false);

   //============================= For Files =============================
  const Files = useSelector(state => state.Files);
  console.log("file", Files);
  //============================= Get Response Of The Api =============================
  const deleteToggle = useSelector(state => state.deleteToggle);

  //============================= Pagination =============================
  const filePage = useSelector(state => state.filePage);

  const [pageNumber, setPageNumber] = useState(1);

   //============================= For Loading =============================
  const Loding = useSelector(state => state.Loding);

  const handleSubmit = (e) => {

    if(files === ""){
      e.preventDefault();
      toast.error("select File", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
    else{
      e.preventDefault();
      setLoader(true);
      const formData = new FormData();
      for(let i = 0 ; i< 5; i++){
        formData.append('multi-files', files[i]);
      }
      dispatch(Upload_File(formData)); 
    }
  }

  const handleDelete = (value) => {
    console.log("value", value);
    if(window.confirm("Are You Sure")){
      dispatch(Delete_File(value))        
    }
  }

  useEffect(() => {
    console.log("run");
    dispatch(Get_File(pageNumber));
  }, [dispatch,deleteToggle,pageNumber,Loding]);

  useEffect(() => {
    if(Loding === false){
      setLoader(false);
      dispatch(Loading_Toggle())
    }
  }, [Loding])

  return (
      <>
          <div className='main_div'>
            <div className="header_div">
                <h1>Files</h1>
            </div> 
            <form onSubmit={handleSubmit}>
              <div className='col-md-12 my-3 text-left'>
                  <label>Upload Files</label>
                  <input type="file" id="file" name="files" onChange={(e) => setFiles({...files, ...e.target.files})} multiple/>
                  <button type='submit'>Upload</button>
              </div>
            </form>

            <div >
                  {
                    loader ? (
                      <div className='col-md-15 my-3 text-center'>
                          <h2>Loading ...</h2>
                       </div>     
                    ) : null
                  }
              </div>
              
              <div className='col-md-20 mx-auto'>
                {
                  Files && Files.map((file) => {
                    
                    return(
                      <>
                        <div>
                          {
                            file.filetype === ".pdf" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/pdfIcon.png' alt='PDf'/>
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".docx" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/docIcon.png' alt='Doc'/>
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".txt" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/txtIcon.png' alt='txt'/>
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".xml" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/xmlIcon.png' alt='xml'/>
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {/* {  
                            file.filetype === ".jpg" || ".png" || ".jpeg" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/xmlIcon.png' alt='Image'/>
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          
                          } */}
                            
                        </div>
                      </>
                    )
                  })    
                }
              </div>

              <Pagination count={filePage} variant="outlined" color="secondary" onChange={(e, value) =>  {
                setPageNumber(value) }}/>  
          </div>
      </>
  );
};

export default FileUpload;

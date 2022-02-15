import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {DeleteMulti_File, Delete_File, Get_File, Loading_Toggle, Upload_File}from '../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "@material-ui/core/Select";

toast.configure();

const FileUpload = () => {

  const dispatch = useDispatch();

  //============================= UseState =============================
  const [files, setFiles] = useState('');
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  //============================= For Files =============================
  const Files = useSelector(state => state.Files);
  
  //============================= For LoginUser =============================
  const LoginUser = useSelector(state => state.LoginUser);

  //============================= Get Response Of The Api =============================
  const deleteToggle = useSelector(state => state.deleteToggle);

  //============================= Pagination =============================
  const filePage = useSelector(state => state.filePage);

  const [pageNumber, setPageNumber] = useState(1);

  //============================= For Loading =============================
  const Loding = useSelector(state => state.Loding);

  //============================= Upload Files =============================
  const handleSubmit = (e) => {
    console.log("submit");
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
      setLoader(true);
      e.target.reset();
      setFiles('');
      dispatch(Upload_File(formData)); 
    }
  }


  //============================= Delete file =============================
  const handleDelete = (value) => {
    if(window.confirm("Are You Sure")){
      setLoader(true);
      dispatch(Delete_File(value))        
    }
  }

  //============================= Delete Multi file =============================
  const handleMultiDelete = (e) => {
    e.preventDefault();
    if(window.confirm("Are You Sure")){
      setLoader(true);
      dispatch(DeleteMulti_File());        
    }
  }

  const handleChange = (e) => {
    setUsers(...users, ...e.target.value)
  };



  //============================= get File =============================
  useEffect(() => {
    dispatch(Get_File(pageNumber));
  }, [dispatch, pageNumber, Loding, deleteToggle]);

  //============================= For Loading =============================
  useEffect(() => {
    if(Loding === false || deleteToggle === true){
      setLoader(false);
      dispatch(Loading_Toggle())
    }
  }, [Loding, deleteToggle]);
   
  return (
      <>
          <div className='main_div'>

            <div className="header_div">
              {
                  LoginUser && (
                    <>
                        <h3>{`Welcome ${LoginUser.fname} ${LoginUser.lname}`}</h3>
                    </>
                  )
              }
            </div>

            <div className="header_div">
                <h1>Files</h1>
            </div> 

            <div>
                
                  {
                    loader ? (<> 
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box></>) : (
                      <>
                        <form onSubmit={handleSubmit}>
                        <div className='col-md-12 my-3 text-left'>
                            <label>Upload Files</label>
                            
                            <button type='submit'>Upload</button>
                        </div>
                      </form>
                      <form onSubmit={handleMultiDelete}>
                        <div className='col-md-12 my-3 text-left'>
                          <button type='submit' >Delete</button>
                        </div>
                      </form>
                      <input type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        value="allSelect"
                        onChange={handleChange} />
                        <label>Select All</label>
                      </>                    
                    )
                }
              </div>
              <div className='mainContainor'>
                
                {
                  Files[0] && Files[0].SortFiles.length > 0 && Files[0].SortFiles.map((file) => {
                    
                    return(
                      <>
                        <div>
                          {
                            file.filetype === ".pdf" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/pdfIcon.png' alt='PDf'/>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={file.public_id}
                                    onChange={handleChange}
                                  />
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".docx" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/docIcon.png' alt='Doc'/>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={file.public_id}
                                    onChange={handleChange}
                                  />
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".txt" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/txtIcon.png' alt='txt'/>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={file.public_id}
                                    onChange={handleChange}
                                  />
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".xml" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src='../Images/xmlIcon.png' alt='xml'/>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={file.public_id}
                                    onChange={handleChange}
                                  />
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                          {  
                            file.filetype === ".jpg" || file.filetype === ".png" || file.filetype === ".jpeg" ? (
                              <>
                                <h4>{file.filename}</h4>
                                <img src={file.filepath} alt='Image' id = "img"/>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={file.public_id}
                                    onChange={handleChange}
                                  />
                                <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </>
                            ) : null
                          }
                            
                        </div>
                      </>
                    )
                  })    
                }
              </div>

              <div className="pagination2">
                <Pagination count={filePage} variant="outlined" color="secondary" onChange={(e, value) =>  {
                  setPageNumber(value) }}/>  
              </div>
              
          </div>
      </>
  );
};

export default FileUpload;

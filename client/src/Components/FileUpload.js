import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {DeleteMulti_File, Delete_File, Get_File, Loading_Toggle, Upload_File}from '../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const FileUpload = () => {

  const dispatch = useDispatch();

  //============================= UseState =============================
  const [files, setFiles] = useState('');
 
  //============================= For Files =============================
  const Files = useSelector(state => state.Files);
  
  //============================= For Multiple Delete =============================
  const [multipleDelete, setMultipleDelete] = useState([])
  
  //============================= For LoginUser =============================
  const LoginUser = useSelector(state => state.LoginUser);

  //============================= Pagination =============================
  const filePage = useSelector(state => state.filePage);

  const [pageNumber, setPageNumber] = useState(1);

  //============================= For Loading =============================
  const Loading = useSelector(state => state.Loading);

  //============================= Upload Files =============================
  const handleSubmit = (e) => {
    if(files === ""){
      e.preventDefault();
      toast.error("select File", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
    else{
      e.preventDefault();
      dispatch(Loading_Toggle());
      const formData = new FormData();
      for(let i = 0 ; i< 10; i++){
        formData.append('multi-files', files[i]);
      }
      e.target.reset();
      setFiles('');
      dispatch(Upload_File(formData)); 
    }
  }

  //============================= Delete file =============================
  const handleDelete = (value) => {
    if(window.confirm("Are You Sure")){
      setMultipleDelete([]);
      dispatch(Loading_Toggle());
      dispatch(Delete_File(value))        
    }
  }

  //============================= Delete Multi file =============================
  const handleMultiDelete = (e) => {
    if(multipleDelete.length <= 0){
      e.preventDefault();
      toast.error("select File First", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
    else{
      e.preventDefault();
      if(window.confirm("Are You Sure")){
        dispatch(Loading_Toggle());
        dispatch(DeleteMulti_File(multipleDelete));        
      }
    }
  }

  const handleChange = (id) => {
    
    
    if (multipleDelete.includes(id)) {
        const checkedmyArray = multipleDelete.filter((i) => {
            return i !== id;
        });
        setMultipleDelete(checkedmyArray);
    }
    else {
        setMultipleDelete([...multipleDelete, id]);
    }
}


  //============================= get File =============================
  useEffect(() => {
    dispatch(Get_File(pageNumber));

  }, [dispatch, pageNumber, Loading ]);

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
                    Loading ? (<> 
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box></>) : (
                      <>
                        <form onSubmit={handleSubmit}>
                          <div className='col-md-12 my-3 text-left'>
                          <input type='file' name='files' multiple onChange={(e) => setFiles({ ...files, ...e.target.files })} ></input>
                          <button type='submit'>Upload</button>
                          </div>
                        </form>
                        <form onSubmit={handleMultiDelete}>
                          <div>
                            <button type='submit' >Delete</button>
                            
                          </div>
                        </form>
                        {/* <input type="checkbox"
                          className="form-check-input"
                          name="allSelect"
                          value="allSelect"
                          onChange={() => handleChange()}
                          />
                          <label>Select All</label> */}
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
                                <div className='showFiles'>
                                  <b>{file.filename}</b>
                                  <img src='../Images/pdfIcon.png' alt='PDf'/>
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={file.public_id}
                                      onChange={() => handleChange(file.public_id)}
                                    />
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                                </div>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".docx" ? (
                              <>
                                <div className='showFiles'>
                                  <b>{file.filename}</b>
                                  <img src='../Images/docIcon.png' alt='Doc'/>
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={file.public_id}
                                      onChange={() => handleChange(file.public_id)}
                                    />
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                                </div>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".txt" ? (
                              <>
                                <div className='showFiles'>
                                  <b>{file.filename}</b>
                                  <img src='../Images/txtIcon.png' alt='txt'/>
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={file.public_id}
                                      onChange={() => handleChange(file.public_id)}
                                    />
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                                </div>
                              </>
                            ) : null
                          }
                          {
                            file.filetype === ".xml" ? (
                              <>
                                <div className='showFiles'>
                                  <b>{file.filename}</b>
                                  <img src='../Images/xmlIcon.png' alt='xml'/>
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={file.public_id}
                                      onChange={() => handleChange(file.public_id)}
                                    />
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                                </div>
                              </>
                            ) : null
                          }
                          {  
                            file.filetype === ".jpg" || file.filetype === ".png" || file.filetype === ".jpeg" ? (
                              <>
                                <div className='showFiles'> 
                                  <b>{file.filename}</b>
                                  <img src={file.filepath} alt='Image' id = "img"/>
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={file.public_id}
                                      onChange={() => handleChange(file.public_id)}
                                    />
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                                </div>
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

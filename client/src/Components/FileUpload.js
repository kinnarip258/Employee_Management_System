import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {DeleteMulti_File, Delete_File, Get_File, Loading_Toggle, Upload_File}from '../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from './Checkbox'
toast.configure();

const FileUpload = () => {

  //============================= For Api Dispatch =============================
  const dispatch = useDispatch();

  //============================= UseState =============================
  const [files, setFiles] = useState('');
 
  //============================= For Files =============================
  const Files = useSelector(state => state.Files);
  
  //============================= For Multiple Delete =============================

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  // console.log("selectId",selectId);
  //============================= For LoginUser =============================
  const LoginUser = useSelector(state => state.LoginUser);

  //============================= Pagination =============================
  const filePage = useSelector(state => state.filePage);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  console.log("limit", limit);
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
      for(let i = 0 ; i < 100; i++){
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
      dispatch(Loading_Toggle());
      dispatch(Delete_File(value))        
    }
  }

  //============================= Delete Multi file =============================
  const handleMultiDelete = (e) => {
    
    if(isCheck.length <= 0){
      e.preventDefault();
      toast.error("select File First", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
    else{
      e.preventDefault();
      if(window.confirm("Are You Sure")){
        dispatch(Loading_Toggle());
        dispatch(DeleteMulti_File(isCheck));        
      }
    }
  }

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(Files[0] && Files[0].SortFiles.length > 0 && Files[0].SortFiles.map((li) => li.public_id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    setIsCheckAll(false);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  console.log("isCheck", isCheck);
  console.log("isCheckAll", isCheckAll);

  //============================= get File =============================
  useEffect(() => {
    setIsCheckAll(false);
    dispatch(Get_File(pageNumber, limit));
  }, [dispatch, pageNumber,limit, Loading ]);


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
                            <button type='submit' >Delete </button> 
                          </div>
                        </form>
                        
                        <Checkbox
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          handleClick={handleSelectAll}
                          isChecked={isCheckAll}
                        />
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
                          <div className='showFiles' key={file.public_id}>
                                <b>{file.filename}</b>
                                  {
                                    file.filetype === ".pdf" ? 
                                      <img src='../Images/pdfIcon.png' alt='PDf'/> : null
                                  }
                                  {
                                    file.filetype === ".docx" ? 
                                    <img src='../Images/docIcon.png' alt='Doc'/> : null
                                  }
                                  {
                                    file.filetype === ".txt" ? 
                                    <img src='../Images/txtIcon.png' alt='txt'/> : null
                                  }
                                  {
                                    file.filetype === ".xml" ? 
                                    <img src='../Images/xmlIcon.png' alt='xml'/> : null
                                  }
                                  {
                                    file.filetype === ".jpg" || file.filetype === ".png" || file.filetype === ".jpeg" ? 
                                    <img src={file.filepath} alt='Image' id = "img"/> : null
                                  }
                                  
                                  <Checkbox
                                    key={file.public_id}
                                    type="checkbox"
                                    name={file.public_id}
                                    id={file.public_id}
                                    handleClick={handleClick}
                                    isChecked={isCheck.includes(file.public_id)}
                                  />
                                  
                                  <button onClick={() => handleDelete(file.public_id)}>Delete</button>
                              </div>
                                      
                        </div>
                      </>
                    )
                  })    
                }
              </div>

              <div className="pagination2">
                <Pagination count={filePage} variant="outlined" color="secondary" onChange={(e, value) =>  {
                  setPageNumber(value)}}/> 
                <select onChange={(e) => setLimit(e.target.value)}>
                  <option value={"5"}>5</option>
                  <option value={"10"}>10</option>
                  <option value={"15"}>15</option>
                  <option value={"20"}>20</option>
                  <option value={"25"}>25</option>
                  <option value={"30"}>30</option>
                  <option value={"35"}>35</option>
                  <option value={"40"}>40</option>
                  <option value={"45"}>45</option>
                  <option value={"50"}>50</option>
                </select> 
              </div>
              
          </div>
      </>
  );
};

export default FileUpload;

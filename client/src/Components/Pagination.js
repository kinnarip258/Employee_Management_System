import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getUserDetailsUser ,AscendingName, DescendingName, SearchUser} from '../actions/userActions';

const Pagination = (props) => {

    const page = useSelector(state => state.page)
    const pages = new Array(page).fill(null).map((v, i) => i);
    console.log('pageNumber', pages)
    console.log("props.toggle: ", props.toggle)
    const ApiDispatch = useDispatch();
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {
                        pages.map((index) => {
                            return(
                                <>
                                    <li class="page-item"><a class="page-link" onClick={() => {
                                        if(props.toggle === "all"){
                                            ApiDispatch(getUserDetailsUser(index + 1))
                                        }
                                        else if(props.toggle === "asc"){
                                            ApiDispatch(AscendingName(index + 1)) 
                                        }
                                        else if(props.toggle === "desc"){
                                            ApiDispatch(DescendingName(index + 1)) 
                                        }
                                        else if(props.toggle === "search"){
                                            ApiDispatch(SearchUser(props.searchUser,index + 1)) 
                                        }
                                    }}>{index + 1}</a></li>
                                </>
                            )
                        })
                    }
                </ul>  
            </nav>
        </div>
    ) 
}
export default Pagination;



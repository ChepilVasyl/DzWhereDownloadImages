import MyFetch from "./MyFetch";
import {useEffect, useState} from "react";
import Pagination from "./Pagination";

export default () =>
{
    const [value,setValue] = useState({ colorModels: [] })
    useEffect(()=> {
        MyFetch("api/ColorApi")
            .then(data => {
                setValue(data)
            })
            .catch(err => {
                console.log("Та ж помилка, але з wrapper")
            })
    },[])
    console.log("from wrapper, totalPage = "+value.totalPage)
    return(
        <>
        <Pagination 
            currentPage={value.pageNumber}
            totalPage1 = {value.totalPage}
            pageSize1 = {value.pageSize}
        />
        </>
    )
}
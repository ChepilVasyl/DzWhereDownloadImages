import MyFetch from "./MyFetch";
import { useEffect, useState } from "react";

export default (props) => {
    const [colors, setColors] = useState([]);
    const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
    const [totalPage, setTotalPage] = useState(props.totalPage1);
    const pageSize = 2; // Кількість елементів на сторінці
    console.log("currentPage = "+currentPage)
    console.log("totalPages = "+totalPage)
    console.log("pageSize = "+pageSize)
    useEffect(() => {
        fetchColors(currentPage, pageSize);
    }, [currentPage]);

    const fetchColors = (currentPage, pageSize) => {
        MyFetch(`api/ColorApi?currentPage=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                setColors(response.colorModels);
                setTotalPage(Math.ceil(response.totalItems / pageSize));
            })
            .catch(err => {
                console.log("Error fetching data:", err);
            });
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    console.log(props)
    return (
        <div>
            <ul>
                {colors.map(temp =>
                    (
                        <li key={temp.id}>
                            <span style={{marginRight: '30px'}}>{temp.nameColor}</span>
                            <span style={{marginRight: '30px'}}>{temp.codeColor}</span>
                            <img alt="err" style={{marginRight: '30px'}} src={`http://localhost:5220/${temp.urlColor}`}
                                 width="50px"/>
                        </li>
                    ))}
            </ul>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Назад
            </button>
            <span>Сторінка {currentPage} з {totalPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPage}>
                Вперед
            </button>
        </div>
    );
};

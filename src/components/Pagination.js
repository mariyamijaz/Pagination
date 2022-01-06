import React, { useEffect } from 'react'
import { useState } from 'react';
import "./style.css";


const renderData = data=>{
    return(
        <ul>
             {data.map((todo, index)=>{
                 return <li key={index}>{todo.title}</li>
             })}
        </ul>
    );
}
export default function Pagination() {

    const [data, setData]= useState([]);

    const [currentPage, setCurrentPage]= useState(1);
    const [itemPerPage, setitemPerPage] = useState(5);

    const[pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageLimit, setmaxPageLimit]=useState(5);
    const [minPageLimit, setminPageLimit]= useState(0);

    const pages= [];
    for(let i=0; i<=Math.ceil(data.length/itemPerPage); i++){
        pages.push(i);
    }
    const handleClick =(e)=>{
           setCurrentPage(Number(e.target.id));
    }
    const handleNext=()=>{
        setCurrentPage(currentPage+1);

        if(currentPage+1> maxPageLimit){
            setmaxPageLimit(maxPageLimit+pageNumberLimit);
            minPageLimit(minPageLimit+pageNumberLimit);
        }
    }

    const handlePrevious=()=>{
        setCurrentPage(currentPage-1);

        if((currentPage-1)%pageNumberLimit==0){
            setmaxPageLimit(maxPageLimit-pageNumberLimit);
            minPageLimit(minPageLimit-pageNumberLimit);
        }
    }


    const indexOfLastItem = currentPage* itemPerPage;
    const  indexOfFirstItem= indexOfLastItem-itemPerPage;
    const currentItems= data.slice(indexOfFirstItem, indexOfLastItem)

    const renderPageNumber= pages.map(number=>{
        if(number< maxPageLimit+1 && number>minPageLimit){
        return(
            
            <li key={number} id={number} onClick={handleClick}  
            className={currentPage== number ? "active" : null}>{number}</li>
        )
        }else{
            return null;
        }
    })

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => setData(json));
    }, [])
    return (
        <div>
            <h1>To do List</h1> <br/>
           
            {renderData(currentItems)}
            <ul className='pagenumbers'>

                <li>
                    <button onClick={handlePrevious}>Previous</button>
                </li>
            
            {renderPageNumber}
           

            <li>
                <button onClick={handleNext}>Next</button>
            </li>
            </ul>
           
        </div>
    )
}

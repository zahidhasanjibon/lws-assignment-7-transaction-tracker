/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'


export default function Pagination({totalTask,taskPerPage,paginate}) {
    let pageNumbers = []
    for (let i = 1;  i<= Math.ceil(totalTask/taskPerPage); i++) {
        pageNumbers.push(i)        
    }


  return (
    <>
    <ul className='pagination'>
        {
            pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={(e) => paginate(e,number) } className='page-link'>{number}</a>
                </li>
            ))
        }
    </ul>
    </>
  )
}

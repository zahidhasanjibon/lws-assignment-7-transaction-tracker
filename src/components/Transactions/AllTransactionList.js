import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { editInActive, fetchTransactions } from "../../features/transaction/transactionSlice";
import Form from "../Form";
import Pasination from "../Pagination";
import Transaction from "./Transaction";

export default function AllTransactionList() {
  const [searchInp, setSearchInp] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [currentPage,setCurrentPage] = useState(1)
  const [transPerPage] = useState(8)
  const [modalOpen, setModalOpen] = useState(false);


  const dispatch = useDispatch();
  const { transactions, isLoading, isError } = useSelector(
      (state) => state.transaction
  );
const numberOfAllTransaction = transactions.length

  const isFilterSelect = (v) => v === filterOption;

  const handleFilterOptions = (e) => {
  
    setFilterOption(e.target.value);
    if(e.target.value === 'all'){
      dispatch(fetchTransactions({type:"",searchInp:""}))
    }else {
      dispatch(fetchTransactions({type:e.target.value,searchInp:""}))
    }
    
  };
  const handleSearch = (e) => {
    if(filterOption === 'all'){
      setCurrentPage(1)
      dispatch(fetchTransactions({type:"",searchInp:searchInp}))
    } else {
      setCurrentPage(1)
      dispatch(fetchTransactions({type:filterOption,searchInp:searchInp}))
    }

  }

  const handlePaginate = (e,pageNumber) => {
  const allPageNumber =  document.getElementsByClassName('page-link');
  [...allPageNumber].forEach((page) => {
    page.classList.remove('activePage')
  })
  e.target.classList.add('activePage')

    setCurrentPage(pageNumber)
    setModalOpen(false)
  }
  
  useEffect(() => {
    dispatch(fetchTransactions({type:'',searchInp:""}));
  
}, [dispatch])

    // get current transactions

    const indexOfLastTransaction  = currentPage * transPerPage
    const indexOfFirstTransaction = indexOfLastTransaction - transPerPage



  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
      content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
      content = [...transactions].reverse().slice(indexOfFirstTransaction,indexOfLastTransaction).map((transaction) => (
          <Transaction openModal={setModalOpen} key={transaction.id} transaction={transaction} />
      ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
      content = <p>No transactions found!</p>;
  }

  const handleModal = () => {
    dispatch(editInActive())
  }

  return (
    <>
    <div className="alltranlist">
      <div className="menubar">
        <div className="listWrapper">
          <div className="searchBox">
            <NavLink onClick={handleModal} to="/" className="home">Home</NavLink>
            <input
              type="text"
              placeholder="Search"
              value={searchInp}
              onChange={(e) => setSearchInp(e.target.value)}
            />
            <button onClick={handleSearch} className="search">search</button>
          </div>

          <div className="menu-right">
            <input
              type="radio"
              name="filter"
              value="all"
              checked={isFilterSelect("all")}
              onChange={handleFilterOptions}
            />{" "}
            ALl
            <input
              type="radio"
              name="filter"
              value="income"
              checked={isFilterSelect("income")}
              onChange={handleFilterOptions}
            />{" "}
            Income
            <input
              type="radio"
              name="filter"
              value="expense"
              checked={isFilterSelect("expense")}
              onChange={handleFilterOptions}
            />{" "}
            Expense
          </div>
        </div>
      </div>
      <div className="conatiner_of_list_of_transactions">
        <div className="tranList">
                <ul>{content}</ul>
        </div>
            </div>

    </div>
    <Pasination totalTask={numberOfAllTransaction} taskPerPage={transPerPage} paginate={handlePaginate}/>
    {modalOpen && <div className="modal-box"><Form openModal={setModalOpen} /> </div>}
    
    </>
  );
}

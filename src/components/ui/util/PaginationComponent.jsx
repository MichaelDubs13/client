import { Pagination } from "@tesla/design-system-react";
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const PaginationComponent = forwardRef(({filteredRecords, defaultRecordsPerPage}, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordsPerPage);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);

    useImperativeHandle(ref, ()=>({
        currentRecords : currentRecords
    }),[currentRecords])
    // useImperativeHandle(ref, ()=>({
    //     setPage: (number)=>{
    //         setCurrentPage(number);
    //     }
    // }), [currentPage])

    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
        console.log(currentRecords)
    }

    const handleRecordsPerPageChange = (number) =>{
        setCurrentPage(1);
        setRecordsPerPage(number);
    }

    return (
   
        <>
            <Pagination 
                        onPageChange={paginate}
                        onRecordsPerPageChange={handleRecordsPerPageChange}
                        variant="select"
                        recordsPerPage={recordsPerPage}
                        totalPages = {Math.ceil(filteredRecords.length / recordsPerPage)}
                        page={currentPage}
                        totalRecords={filteredRecords.length}
                        totalRecordsLabel={"Total: "}
                        recordsPerPageSteps={[20,40, 100, 200]}
                        prevLinkLabel={'Prev'}
                        nextLinkLabel={'Next'}
            />
        </>
    )
    
});

export default PaginationComponent
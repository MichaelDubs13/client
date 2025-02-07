import React , {useState, useEffect } from 'react';
import DeviceDataService from '../../../services/deviceDataService';
import {TBody, DataTable, Pagination } from "@tesla/design-system-react";


const SoftwareReferenceRow = ({group, hardware}) => {
    const [items, setItems] = useState([]);
    const filteredItems = items?.map(item => item.block).filter((item, index, self) => self.indexOf(item) === index);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentRecords = filteredItems.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(()=>{
        const fetchData = async () => {
           let data =[];
           await Promise.all(group.map(async (item) => {
                var results = await DeviceDataService.getBlocksByGSD(item.name);
                data = data.concat(results);
            }));
            setItems(data);
          }
        
          fetchData();
          return () => {
            setItems([]);
          };
    }, []);
 
    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }

    return (
        <>
            <tr>
                <td colSpan={6}>
                    <tr>
                        {
                            <>
                            {
                                <DataTable border={4} style={{width:"2000px"}}> 
                                
                                <TBody>
                                { 
                                    currentRecords && currentRecords.map( (block, key) =>{
                                        return <tr>
                                                    <td>{block}</td>
                                                </tr>
                                    })
                                }
                                </TBody>
                            </DataTable>
                            }
                            <Pagination
                                onPageChange={paginate}
                                onRecordsPerPageChange={handleRecordsPerPageChange}
                                variant="select"
                                recordsPerPage={recordsPerPage}
                                totalPages = {Math.ceil(items.length / recordsPerPage)}
                                page={currentPage}
                                totalRecords={items.length}
                                totalRecordsLabel={"Total: "}
                                recordsPerPageSteps={[20,40, 100, 200]}
                                prevLinkLabel={'Prev'}
                                nextLinkLabel={'Next'}
                            />
                            </>
                        }
                    </tr>
                </td>
            </tr>
        </>
    );
}

export default SoftwareReferenceRow;
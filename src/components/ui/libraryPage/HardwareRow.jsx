import React , {useState, useEffect} from 'react';
import DeviceDataService from '../../../services/deviceDataService';
import {TBody, DataTH, DataTable, Pagination } from "@tesla/design-system-react";

const HardwareRow = ({block}) => {
    const [expanded, setExpanded] = useState(false);
    const [hardwares, setHardwares] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentRecords = hardwares.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        const fetchData = async () => {
            var data = await DeviceDataService.getHardwaresByBlock(block.Name);
            setHardwares(data);
        };

        fetchData();
        return () => {
            setHardwares([]);
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
                                        currentRecords && currentRecords.map( (hardware, key) =>{
                                            return <tr> 
                                                    <td colSpan={6}>
                                                        {hardware.name}
                                                    </td>
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
                                    totalPages = {Math.ceil(hardwares.length / recordsPerPage)}
                                    page={currentPage}
                                    totalRecords={hardwares.length}
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

export default HardwareRow;
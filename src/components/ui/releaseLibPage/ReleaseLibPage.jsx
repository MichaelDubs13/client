import { Loader, Button } from "@tesla/design-system-react";
import React, { useState, useEffect } from 'react';
import useLibraryStore from "../../../store/libraryStore";
import ModalReleaseLibrary from "./ModalReleaseLibrary";
import * as XLSX from 'xlsx'
import ReleasedLibraryOverviewRow from "./ReleasedLibraryOverviewRow";
import UnreleasedChangeOverviewRow from "./UnreleasedChangeOverviewRow";
import SocketIoConsole from "../util/SocketIoConsole";


const ReleaseLibPage = () => {
    
    const fetchUnreleasedChanges = useLibraryStore((state) => state.fetchUnreleasedChanges);
    const fetchUnreleasedRevs = useLibraryStore((state) => state.fetchUnreleasedRevs);
    const fetchInconsistentLib = useLibraryStore((state) => state.fetchInconsistentLib);
    const fetchInconsistentDepLib = useLibraryStore((state) => state.fetchInconsistentDepLib);
    const fetchDuplicateNameLib = useLibraryStore((state) => state.fetchDuplicateNameLib);
    const fetchNondefaultInstances = useLibraryStore((state) => state.fetchNondefaultInstances);
    const changeSets = useLibraryStore((state) => state.changeSets);
    const revisions = useLibraryStore((state) => state.revisions).sort((a,b) => b.revision - a.revision);
    const libs = useLibraryStore((state) => state.libs);
    const inconsistentLib = useLibraryStore((state) => state.inconsistentLib);
    const inconsistentDepLib = useLibraryStore((state) => state.inconsistentDepLib);
    const duplicateNameLib = useLibraryStore((state) => state.duplicateNameLib);
    const nondefaultInstances = useLibraryStore((state) => state.nondefaultInstances);
    const createReleaseNotes = useLibraryStore((state) => state.createReleaseNotes);
    const fetchReleasedLibs = useLibraryStore((state) => state.fetchReleasedLibs);
    const endRev = changeSets.length > 0 ? Math.max(...changeSets.map(o => o.revision)) : 0;
    const startRev = changeSets.length > 0 ? Math.min(...changeSets.map(o => o.revision)) : 0;
    const totalErrors = inconsistentLib.length +inconsistentDepLib.length + duplicateNameLib.length + nondefaultInstances.length;
    const [isLoading, setIsLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [jobId, setJobId] = useState(false);

    const getGroupedChangeSets = () => {
        var results = [];

        changeSets.forEach((changeSet) => {
            var key = changeSet.path;

            if(results[key]){
                results[key].push(changeSet);
            }
            else{
                results[key] = [];
                results[key].push(changeSet);
            }
        })

        return results;
    }
    const groupedChangeSets = getGroupedChangeSets();

    useEffect(()=>{
        // Fetch jobs when the component mounts
        const fetchData = async () =>{
            await fetchReleasedLibs();
            await fetchUnreleasedChanges();
            await fetchUnreleasedRevs();
            await fetchInconsistentLib();
            await fetchInconsistentDepLib();
            await fetchDuplicateNameLib();
            await fetchNondefaultInstances();
            setIsLoading(false);
        }

        fetchData();    
  
    }, []);

    const createExcel = () => {
        var workbook = XLSX.utils.book_new();

        var data = [[`Revisions from ${startRev} to ${endRev}`], [`Pending Errors: ${totalErrors}`]]
        var worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Overview");


        data = changeSets.map((changeSet) => {
            return [changeSet.revision, changeSet.path, changeSet.type, changeSet.object, changeSet.username, changeSet.date]
        })
        worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Change History");

        data = revisions.map((rev) => {
            return [rev.revision, rev.comment, rev.username, rev.date]
        })
        worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Revision History");


        XLSX.writeFile(workbook, "RleaseNotes.xlsx");
      
    }
    
    const handleReleaseNote = async () => {
        const formData = new FormData();

        await createReleaseNotes(formData);
    }

    const handleReleaseLibrarySubmit = async (job) => {
        setJobId(job._id);
        setExpanded(true);
    }

    return (
   
        <>
            <h2>Unreleased Library changes</h2>
            <Button variant="secondary" onClick={createExcel}>Release Notes</Button>
            <ModalReleaseLibrary endRev={endRev} startRev={startRev} totalErrors={totalErrors} onSubmit={handleReleaseLibrarySubmit}/>
            <Loader show={isLoading} contained={true}/>
            <div style={{marginTop:"50px"}}>
                <UnreleasedChangeOverviewRow revisions={revisions} groupedChangeSets={groupedChangeSets}/>
                <ReleasedLibraryOverviewRow libs={libs}/>
                <SocketIoConsole id={jobId} expanded={expanded} setExpanded={setExpanded}/>
            </div>
        </>
    )
    
}

export default ReleaseLibPage
import useDeviceStore from "../../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import { Chip } from '@tesla/design-system-react';

const ViewLabelForm = ({id}) => {
   
    const labels = useDeviceStore((state) => state.labels);
    const fetchLabelsByPLC = useDeviceStore((state) => state.fetchLabelsByPLC);
    const createLabel = useDeviceStore((state) => state.createLabel);
    const deleteLabel = useDeviceStore((state) => state.deleteLabel);
    useEffect(()=>{
        const fetchData = async (id) =>{
            await fetchLabelsByPLC(id);
        }

        fetchData(id);
    }, []);

    const handleKeyDown = async(e) => {
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        const formData = new FormData();
    
        var payload = {value:value, plcs:[id]};

        formData.set("data", JSON.stringify(payload));
        
        await createLabel(formData);
        await fetchLabelsByPLC(id);

        e.target.value = ''
    }

    const removeLabel = async (label)=>{
        const formData = new FormData();
        var payload = {value:label.name, plcs:[id]};
        formData.set("data", JSON.stringify(payload));
        deleteLabel(formData);
        let result = await fetchLabelsByPLC(id);
    }
    
return (
        <>
        <div className="tags-input-container">
                    { labels && labels.map((label, index) => (
                        // <div className="tag-item" key={index}>
                        //     <span className="text">{label.name}</span>
                        //     <span className="close" onClick={() =>removeLabel(label)}>&times;</span>
                        // </div>
                        <Chip
                            closeProps={{ 'aria-label': 'Dismiss' }}
                            onClose={() =>removeLabel(label)}
                            statusColor="blue"
                            text={label.name}
                      />
                    )) }
                <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing to record a label" />
        </div>
        
        </>
    )
}

export default ViewLabelForm;
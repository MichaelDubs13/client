import React, { useState } from 'react';
import { Button, FormLabel, FormInputText} from '@tesla/design-system-react';
import useDeviceStore from '../../../store/deviceStore';

const AddHardwareLink = ({gsd_id, gsd_name, onSubmit}) => {
  const [link, setLink] = useState("");
  const createHardwareLink = useDeviceStore((state) => state.createHardwareLink);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    const payload = {
      link:link,
      name:gsd_name
    }
    formData.set("data", JSON.stringify(payload));
    await createHardwareLink(gsd_id, formData);
    onSubmit()
  };

  const handleLinkChange = async (event) => {
    setLink(event.target.value);
  }


  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>Add Hardware Url</h2>
      <FormLabel htmlFor="link">Url</FormLabel>
          <FormInputText
            id="link"
            placeholder="Enter Url"
            value={link}
            onChange={handleLinkChange}
        />
      <Button style={{width:'100px', marginTop:'20px'}} onClick={handleSubmit}>Add</Button>      
    </>
  );
};

export default AddHardwareLink;
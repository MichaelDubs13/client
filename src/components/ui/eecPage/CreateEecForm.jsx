import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import ModelBuilder from "./Models/ModelBuilder";
import Parser from './Excel/Parser.js';


const CreateEecForm = ({onSubmit}) => {
  const [eecPath, setEecPath] = useState("");
  const [eecFile, setEecFile] = useState(null);
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); 
  const [imx, setIMX] = useState('');

  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);


  const handleSubmit = async (event) => {
    event.preventDefault()
    downloadXML(imx, "generated_imx.imx");
    onSubmit()
  };

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }

  const handleEecUpload = async (event) => {
    event.preventDefault();
    if(event.target.files){
      var file = event.target.files[0];
      setEecPath(event.target.value);
      setEecFile(file);
      await parseExcel(event.target.files[0]);
    }
  }
  
  const parseExcel = async (file) =>{
    var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const excelParser = new Parser(data);
        const {config,pdps, xpdps, mcps, branches, switches, devices, groupedIOModules, hmis, gates} = excelParser.parse();
        var imx = ModelBuilder.buildIMX(config, pdps,xpdps, mcps, branches, switches, devices, groupedIOModules, hmis, gates);
        setIMX(imx);
      }
      reader.readAsBinaryString(file)
  }

  function downloadXML(doc, name) {
    const fileData = doc;
    const blob = new Blob([fileData], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  }

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>EEC Generator</h2>
      <FormItem>
          <FormLabel htmlFor="eec">EEC Configuration</FormLabel>
          <FormItemFileUpload
              id="eec"
              accept=".xlsx, .xlsm"
              multiple = {false}
              label="Select File"
              placeholder="Upload EEC configuration"
              value={eecPath}
              style={{ marginBottom: "5px"}}
              onChange={handleEecUpload}/>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="userEmail">User Email</FormLabel>
        <FormInputText
          id="userEmail"
          placeholder="Enter User Email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
      </FormItem>
      <Button onClick={handleSubmit}>Create EEC</Button>
    </>
  );
};

export default CreateEecForm;
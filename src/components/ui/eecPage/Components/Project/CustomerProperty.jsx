import "../../Eec.css";
import InputTextItem from "../Util/InputTextItem";
import { customerOptions, customerStore } from "../../Store/customerStore";
import DropdownItem from "../Util/DropdownItem";
import { Heading } from "@tesla/design-system-react";
import useAuthStore from "../../../../../store/authStore";
import { useEffect } from "react";


const CustomerProperty = () => {
    const setValue = customerStore((state) => state.setValue)
    const property = customerStore((state) => state.property)
    const {user, isAuthenticated} = useAuthStore();

     useEffect(() => {
        if (isAuthenticated === true) {
          setValue(user.email, "CreatorEmail_10242");
        }
      }, [user]);
    
    return (
        
        <>  
            <Heading is="h4">Customer Property</Heading>
            <InputTextItem title={"Tesla SharePoint Project Links"} placeHolder={property.TeslaProjectSharePointLink} setModelValue={setValue} property={"TeslaProjectSharePointLink"}/>
            <InputTextItem title={"Project Descriptions"} placeHolder={property.ProjectDescription_10011} setModelValue={setValue} property={"ProjectDescription_10011"}/>
            <InputTextItem title={"Project Type"} placeHolder={property.ProjectType_10031} setModelValue={setValue} property={"ProjectType_10031"}/>
            <DropdownItem title={"Revision Status"} placeHolder={property.TeslaProjectRevStatus} setModelValue={setValue} options={customerOptions.teslaProjectRevStatusOptions} property={"TeslaProjectRevStatus"}/>
            <InputTextItem title={"Revision number"} placeHolder={property.TeslaProjectRevNo} setModelValue={setValue} property={"TeslaProjectRevNo"}/>
            <InputTextItem title={"Drawing number"} placeHolder={property.TeslaProjectDWGno} setModelValue={setValue} property={"TeslaProjectDWGno"}/>
            <InputTextItem title={"Approved date"} placeHolder={property.TeslaProjectApprovedDate} setModelValue={setValue} property={"TeslaProjectApprovedDate"}/>
            <InputTextItem title={"Manufacturing data"} placeHolder={property.ManufacturingDate_10042} setModelValue={setValue} property={"ManufacturingDate_10042"}/>
            <DropdownItem title={"Voltage"} placeHolder={property.TeslaProjectVoltage} setModelValue={setValue} options={customerOptions.teslaProjectVoltageOptions} property={"TeslaProjectVoltage"}/>
            <DropdownItem title={"Voltage frequency"} placeHolder={property.TeslaProjectVoltageFreq} setModelValue={setValue} options={customerOptions.teslaProjectVoltageFreqOptions} property={"TeslaProjectVoltageFreq"}/>
            <InputTextItem title={"Full load current (FLA)"} placeHolder={property.TeslaProjectFullLoadCurrent} setModelValue={setValue} property={"TeslaProjectFullLoadCurrent"}/>
            <InputTextItem title={"Short Circuit Current Rating (SCCR)"} placeHolder={property.TeslaProjectSCCR} setModelValue={setValue} property={"TeslaProjectSCCR"}/>
            <InputTextItem title={"PLC System"} placeHolder={property.TeslaProjectPLCsystem} setModelValue={setValue} property={"TeslaProjectPLCsystem"}/>
            <InputTextItem title={"Bus System"} placeHolder={property.TeslaProjectBusSystem} setModelValue={setValue} property={"TeslaProjectBusSystem"}/>
            <InputTextItem title={"Customer - Full Name"} placeHolder={property.CustomerFullName_10115} setModelValue={setValue} property={"CustomerFullName_10115"}/>
            <InputTextItem title={"Customer - Description"} placeHolder={property.CustomerDescription_10117} setModelValue={setValue} property={"CustomerDescription_10117"}/>
            <InputTextItem title={"Customer - Street"} placeHolder={property.CustomerStreet_10105} setModelValue={setValue} property={"CustomerStreet_10105"}/>
            <InputTextItem title={"Customer - Zip Code(City)"} placeHolder={property.CustomerZipCode_10107} setModelValue={setValue} property={"CustomerZipCode_10107"}/>
            <InputTextItem title={"Customer - Country"} placeHolder={property.CustomerCountry_10109} setModelValue={setValue} property={"CustomerCountry_10109"}/>
            <InputTextItem title={"Customer - Phone"} placeHolder={property.CustomerPhone_10110} setModelValue={setValue} property={"CustomerPhone_10110"}/>
            <InputTextItem title={"Customer - E-mail"} placeHolder={property.CustomerEmail_10112} setModelValue={setValue} property={"CustomerEmail_10112"}/>
            <InputTextItem title={"Creator - Project Engineer Name"} placeHolder={property.CreatorName1_10232} setModelValue={setValue} property={"CreatorName1_10232"}/>
            <InputTextItem title={"Creator - Project Manager Name"} placeHolder={property.CreatorName2_10233} setModelValue={setValue} property={"CreatorName2_10233"}/>
            <InputTextItem title={"Creator - Project Approver Name"} placeHolder={property.Creatorname3_10234} setModelValue={setValue} property={"Creatorname3_10234"}/>
            <InputTextItem title={"Creator - Full Name"} placeHolder={property.CreatorFullName_10245} setModelValue={setValue} property={"CreatorFullName_10245"}/>
            <InputTextItem title={"Creator - Street"} placeHolder={property.CreatorStreet_10235} setModelValue={setValue} property={"CreatorStreet_10235"}/>
            <InputTextItem title={"Creator - Zip code(City)"} placeHolder={property.CreatoryZipCode_10237} setModelValue={setValue} property={"CreatoryZipCode_10237"}/>
            <InputTextItem title={"Creator - Country"} placeHolder={property.CreatorCountry_10239} setModelValue={setValue} property={"CreatorCountry_10239"}/>
            <InputTextItem title={"Creator - Phone"} placeHolder={property.CreatorPhone_10240} setModelValue={setValue} property={"CreatorPhone_10240"}/>
            <InputTextItem title={"Creator - E-mail"} placeHolder={property.CreatorEmail_10242} setModelValue={setValue} property={"CreatorEmail_10242"}/>
        </>           
    );
};
export default CustomerProperty;
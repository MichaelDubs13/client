import FormInputTextSetting from '../util/FormInputTextSetting';
import FormInputDropdownSetting from '../util/FormInputDropdownSetting';
import FormInputPasswordSetting from '../util/FormInputPasswordSetting';
import FormInputCheckBoxSetting from '../util/FormInputCheckBoxSetting';

const HmiGeneralSettings = ({deviceSettings}) => {
    const badgeReaderTypes = ["RFIDEas", "Siemens - RF1040R", "Omnikey", "Siemens"];


    return (
        <>
                <div style={{display: "inline-block"}}>
                    <FormInputTextSetting topic={"UIDTag"} group={""} originalValue={deviceSettings.UIDTag._text}/>
                    <FormInputTextSetting topic={"EndPoint"} group={""} originalValue={deviceSettings.EndPoint._text}/>
                    <FormInputDropdownSetting topic={"BadgeReaderType"} group={""} originalValue={deviceSettings.BadgeReaderType._text} options={badgeReaderTypes}/>
                    <FormInputTextSetting topic={"UserNameTag"} group={""} originalValue={deviceSettings.UserNameTag._text}/>
                    <FormInputTextSetting topic={"PasswordTag"} group={""} originalValue={deviceSettings.PasswordTag._text}/>
                    <FormInputTextSetting topic={"GroupNameTag"} group={""} originalValue={deviceSettings.GroupNameTag._text}/>
                    <FormInputTextSetting topic={"ADNameTag"} group={""} originalValue={deviceSettings.ADNameTag._text}/>
                    <FormInputTextSetting topic={"DomainName"} group={""} originalValue={deviceSettings.DomainName._text}/>
                    <FormInputTextSetting topic={"UserName"} group={""} originalValue={deviceSettings.UserName._text}/>
                    <FormInputPasswordSetting topic={"Password"} group={""} originalValue={deviceSettings.Pwd._text}/>
                    <FormInputCheckBoxSetting topic={"AutoLaunchNotSoLogon"} group={""} originalValue={deviceSettings.AutoLaunchNotSoLogon._text}/>
                    <FormInputCheckBoxSetting topic={"AutoStartNotSoPmLogon"} group={""} originalValue={deviceSettings.AutoStartNotSoPmLogon._text}/>
                    <FormInputCheckBoxSetting topic={"ActiveDirectorySearch"} group={""} originalValue={deviceSettings.ActiveDirectorySearch._text}/>
                    <FormInputCheckBoxSetting topic={"DisplayNotSoLogon"} group={""} originalValue={deviceSettings.DisplayNotSoLogon._text}/>
                    <FormInputCheckBoxSetting topic={"ControlCenterSearch"} group={""} originalValue={deviceSettings.ControlCenterSearch._text}/>
                </div>
        </>
    )
}

export default HmiGeneralSettings
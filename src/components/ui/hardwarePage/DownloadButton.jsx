import FileDataService from '../../../services/fileDataService';
import { Button } from "@tesla/design-system-react";

const DownloadButton = ({label, id}) => {
    
    const handleClick = () => {
        FileDataService.getGuide(id);
    }
    return(
        <>
            <Button variant="secondary" onClick={handleClick}>{label}</Button>
        </>
    );

}

export default DownloadButton;
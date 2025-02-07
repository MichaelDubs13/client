import FileDataService from '../../../services/fileDataService';
import { Button } from "@tesla/design-system-react";

const DownloadButton = ({label, filePath , style}) => {
    
    const handleClick = () => {
        const paths = filePath.split('/');
        
        if(paths.length > 1){
            FileDataService.get(filePath);
        } else {
            FileDataService.getAssets(filePath);
        }
        
    }
    return(
        <>
        
            <Button variant="secondary" style={style} onClick={handleClick}>{label}</Button>
        </>
    );

}

export default DownloadButton;
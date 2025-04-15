import { iconCopy } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from 'prop-types';

const DuplicateButton = ({onClick}) =>{
    const handleButtonClick = ()=> {
        if(onClick){
            onClick();
        }
    }

    return (
        <>
            <IconButton size="large" label="Duplicate"
              onClick={handleButtonClick}>
                <Icon data={iconCopy}/>
              </IconButton>
        </>
    );
}

DuplicateButton.prototype = {
    onClick:PropTypes.func,
}

export default DuplicateButton;
import { iconTrash } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import "../../Eec.css";
import PropTypes from 'prop-types';

const DeleteButton = ({onClick}) =>{

    const handleButtonClick = ()=> {
        if(onClick){
            onClick();
        }
    }

    return (
        <>
            <IconButton size="large" label="Delete"
              onClick={handleButtonClick}>
                <Icon data={iconTrash}/>
              </IconButton>
        </>
    );
}

DeleteButton.prototype = {
    onClick:PropTypes.func,
}

export default DeleteButton;
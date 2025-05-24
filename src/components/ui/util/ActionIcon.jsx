import { Icon, IconButton } from '@tesla/design-system-react';
import { useState } from 'react';

const ActionIcon = ({icon, label, onClick}) => {
 const [isHovered, setIsHovered] = useState(false);
 const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
 
       <IconButton size="large" label={label}
          onClick={onClick}>
            <Icon data={icon} size="xl" color= {isHovered ? '#A9A9A9' : 'black'}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}/>
        </IconButton>
    </>
  );
};

export default ActionIcon;

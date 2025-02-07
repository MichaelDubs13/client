import React , {useState, useEffect } from 'react';
import useImageStore from '../../../store/imageStore';
import ModalImage from './ModalImage';
import { Loader } from "@tesla/design-system-react";

const ImageRow = ({block}) => {
    const image = useImageStore((state) => state.image);
    const fetchImage = useImageStore((state) => state.fetchImage);
    const clearImage = useImageStore((state) => state.clearImage);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchImage(block.Name,`${block.Name}.png`, block.ProjectName);
            setIsLoading(false)
        };

        fetchData();
        return () => {
            clearImage();
          };
    }, []);

    return (
        <>
            <Loader show={isLoading} contained={true}/>
            <tr>
                <td colSpan={6}>
                    <tr className='tr-revision'>
                        <ModalImage image={image}/>
                    </tr>
                </td>
            </tr>
        </>
    );
}

export default ImageRow;
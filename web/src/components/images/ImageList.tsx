import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageModal from './ImageModal';
import './ImageList.css';
import {fetchImages} from '../../store/imageProcessing';
import RootState from "../../types/RootState";
import {Dispatch} from "redux";

import {sortingImages} from "../../services/imageProcessingService";
import {Image} from "../../types/imagesTypes";

const ImageList: React.FC = () => {
    const images = useSelector((state: RootState) => state.images.items);
    const loading = useSelector((state: RootState) => state.images.loading);
    const error = useSelector((state: RootState) => state.images.error);
    const dispatch: Dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchImages());
    }, [dispatch]);

    const handleImageClick = (image: Image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const [orderingCriteria, setOrderingCriteria] = useState<string>('default');


    const sortedImages = sortingImages(orderingCriteria, images);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="image-list-container">
            <div className="sorting-dropdown">
                <label htmlFor="sorting">Sort by:</label>
                <select id="sorting" onChange={(e) => setOrderingCriteria(e.target.value)} value={orderingCriteria}>
                    <option value="default">Default</option>
                    <option value="uuid">UID</option>
                    <option value="filename">Filename</option>
                    <option value="updatedAt">Updated at</option>
                    <option value="hotkey">Hotkey</option>
                </select>
            </div>
            {sortedImages.map((image, index) => (
                <div key={index} className="image-container" onClick={() => handleImageClick(image)}>
                    <img src={image.url} alt={`Image ${index}`}/>
                </div>
            ))}
            {selectedImage && <ImageModal image={selectedImage} onClose={closeModal}/>}
        </div>
    );
};

export default ImageList;
import React, {useState} from 'react';
import './ImageModal.css';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import CopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {handleDownload, handleCopy, convertToEST} from "../../services/imageProcessingService";
import {Image} from "../../types/imagesTypes";

type ModalProps = {
    image: Image;
    onClose: () => void;
};

const ImageModal: React.FC<ModalProps> = ({image, onClose}) => {
    const [showMetadata, setShowMetadata] = useState(false);

    const onDownloadClick = () => handleDownload(image.url);
    const onCopyClick = () => handleCopy(image.url);
    const onShowMetadataClick = () => setShowMetadata(!showMetadata);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <IconButton onClick={onClose} aria-label="Close">
                    <CloseIcon/>
                </IconButton>
                <img src={image.url} alt="Full Size"/>
                <div className="button-group">
                    <IconButton onClick={onDownloadClick} aria-label="Download">
                        <DownloadIcon/>
                    </IconButton>
                    <IconButton onClick={onCopyClick} aria-label="Copy">
                        <CopyIcon/>
                    </IconButton>
                    <IconButton onClick={onShowMetadataClick} aria-label="Show Metadata">
                        <InfoIcon/>
                    </IconButton>
                </div>
                {showMetadata && (
                    <div className="metadata">
                        <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
                        <p>Filename: {image.filename}</p>
                        <p>UID: {image.uuid}</p>
                        <p>Updated At: {convertToEST(image.updatedAt)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ImageModal;
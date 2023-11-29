import {Image} from "../types/imagesTypes";

export function handleDownload(imageUrl: string) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'downloadedImage.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(e => console.error('Download failed:', e));
}

export function handleCopy(imageUrl: string) {
    navigator.clipboard.writeText(imageUrl)
        .then(() => {
            alert("Image URL copied to clipboard");
        })
        .catch(err => {
            alert('Error in copying text');
        });
}


export const sortingImages = (criteria: string, images: Image[]) => {
    return images.slice().sort((a, b) => {
        switch (criteria) {
            case 'uuid':
                return a.uuid.localeCompare(b.uuid);
            case 'hotkey':
                return a.hotkey.localeCompare(b.hotkey);
            case 'filename':
                return a.filename.localeCompare(b.filename);
            case 'updatedAt':
                return a.updatedAt.localeCompare(b.updatedAt);
            default:
                return 0;
        }
    });
};

export function convertToEST(isoDateString: string) {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", { timeZone: "America/New_York" });
}
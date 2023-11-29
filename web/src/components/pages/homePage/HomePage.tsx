import React from "react";
import ImageList from "../../images/ImageList";
import './HomePage.css'

const HomePage: React.FC = () => {

    return (
        <div className='container'>
            <h1>Image Gallery</h1>
            <ImageList />
        </div>
    );
};

export default HomePage;
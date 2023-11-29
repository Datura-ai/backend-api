import React, { ReactElement, useState } from "react";
import HeaderComponent from "./Header";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    );
};

export default LayoutComponent;

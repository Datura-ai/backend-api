import React, { ReactNode, CSSProperties } from 'react';
import 'react-toastify/dist/ReactToastify.css';
interface TooltipProps {
  text: string;
  position?: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, position, children }) => {
  const tooltipStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    // Add other styles as needed
  };

  return (
    <div style={tooltipStyle}>
      {children}
      <div style={{ position: 'absolute', top: position === 'top' ? '-20px' : '20px' }}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

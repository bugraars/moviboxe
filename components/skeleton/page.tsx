// app/components/Skeleton.tsx
import React from 'react';
import './style.css';

const Skeleton: React.FC = () => {
  return (
    <div className="skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-title"></div>
        <div className="skeleton-ratings"></div>
        <div className="skeleton-overview"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default Skeleton;

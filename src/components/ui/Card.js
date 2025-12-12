import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl shadow-soft border border-neutral-100 p-6 transition-shadow duration-300 hover:shadow-hover ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

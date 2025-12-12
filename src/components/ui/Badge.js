import React from 'react';

const Badge = ({
    children,
    variant = 'neutral',
    className = ''
}) => {
    const variants = {
        success: "bg-primary-100 text-primary-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
        neutral: "bg-neutral-100 text-neutral-800",
        primary: "bg-primary-100 text-primary-800"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;

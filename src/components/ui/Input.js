import React from 'react';

const Input = ({
    label,
    error,
    className = '',
    id,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-4 py-2.5 rounded-xl border bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${error
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-neutral-300'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;

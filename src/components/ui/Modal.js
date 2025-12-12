import React, { Fragment } from 'react';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md'
}) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                <div
                    className="fixed inset-0 bg-neutral-900/50 transition-opacity"
                    onClick={onClose}
                />

                <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizes[size]}`}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                        <h3 className="text-lg font-semibold text-neutral-900">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-neutral-500" />
                        </button>
                    </div>

                    <div className="px-6 py-6">
                        {children}
                    </div>

                    {footer && (
                        <div className="bg-neutral-50 px-6 py-4 flex justify-end gap-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;

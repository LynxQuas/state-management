import { useEffect } from "react";

const Modal = ({
    isOpen,
    onClose,
    children,
    closeOnBackdropClick = true,
    width = "w-full",
    maxWidth = "max-w-md",
    padding = "p-6",
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                isOpen ? "visible" : "invisible"
            }`}
        >
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
                onClick={closeOnBackdropClick ? onClose : undefined}
                aria-hidden="true"
            />

            <div
                className={`relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all ${width} ${maxWidth} ${padding}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

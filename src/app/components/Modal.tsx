import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModalProps {
    onClose?: () => void
    closeOnBackdropClick?: boolean
    children?: React.ReactNode
}

export default function Modal({ onClose, closeOnBackdropClick = true, children }: ModalProps) {
    return (
        <div
            className="fixed z-10 inset-0 bg-black bg-opacity-[36%] backdrop-blur-[1px] flex justify-center items-center"
            onClick={() => closeOnBackdropClick && onClose && onClose()}
        >
            <div className='"flex flex-col bg-neutral-100 shadow-lg rounded-[20px] p-3 w-96' onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="flex w-full justify-end text-neutral-500 hover:text-neutral-700"
                >
                    <IoMdCloseCircleOutline size={30} className="text-red-500 hover:text-red-600" />
                </button>
                {children}
            </div>
        </div>
    )
}

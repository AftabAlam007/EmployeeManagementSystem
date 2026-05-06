// src/components/common/Modal.jsx
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // ✨ Import

// ✨ Note the component signature change: isOpen, onClose, title, children, size
const Modal = ({ isOpen, onClose, title, children, size = 'max-w-4xl' }) => {
  return (
    // ✨ Use Transition.Root to control the entire modal's presence
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/*
          Backdrop (Overlay)
          This fades in and out.
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            {/*
              Modal Panel
              This fades in, scales up, and slides down from the top.
            */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${size}`}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold text-slate-900"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-800 text-3xl font-light"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
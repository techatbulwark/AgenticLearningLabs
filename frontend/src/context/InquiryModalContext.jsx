import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const InquiryModalProvider = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useInquiryModal = () => useContext(ModalContext);

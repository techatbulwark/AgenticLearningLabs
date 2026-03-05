import React, { createContext, useContext, useState } from "react";

const PromptKitModalContext = createContext();

export const PromptKitModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PromptKitModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </PromptKitModalContext.Provider>
  );
};

export const usePromptKitModal = () => useContext(PromptKitModalContext);

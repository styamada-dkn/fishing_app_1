import useModal from "@/lib/hooks/useModal";
import { FC, ReactNode } from "react";

interface ModalContainerProps {
  children: ReactNode;
  content: (closeModal: () => void) => ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({ children, content }) => {
  const { openModal, closeModal, isOpen } = useModal(false);

  return (
    <>
      <button
        className="outline-none border-none bg-transparent cursor-pointer hover:opacity-90"
        onClick={openModal}
      >
        {children}
      </button>
      {isOpen && content(closeModal)}
    </>
  );
};

export default ModalContainer;

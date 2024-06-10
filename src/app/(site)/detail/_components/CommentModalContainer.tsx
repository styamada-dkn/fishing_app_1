import { FC, ReactNode } from "react";
import CommentForm from "./CommentForm";
import ModalContainer from "@/app/components/modal/ModalContainer";

interface CommentModalContainerProps {
  post_id: string;
  comment_id?: number;
  comment?: string;
  authUser: string;
  children: ReactNode;
}

const CommentModalContainer: FC<CommentModalContainerProps> = ({
  post_id,
  comment_id,
  comment,
  authUser,
  children,
}) => {
  return (
    <ModalContainer
      content={(closeModal) => (
        <CommentForm
          post_id={post_id}
          comment_id={comment_id}
          comment={comment}
          closeModal={closeModal}
          authUser={authUser}
        />
      )}
    >
      {children}
    </ModalContainer>
  );
};

export default CommentModalContainer;

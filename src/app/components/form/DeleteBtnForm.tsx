import useModal from "@/lib/hooks/useModal";
import { Button } from "../button/Button";
import { useFormStatus } from "react-dom";
import { FC } from "react";
import classNames from "classnames";
import { useFormState } from "react-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { deletePostData } from "@/lib/services/deletePostData";
import { initialFormState } from "./state";

interface DeleteBtnComponentProps {
  post_id: string;
  closeModal: () => void;
}

// 削除ボタン
const DeleteBtnComponent: FC<DeleteBtnComponentProps> = ({
  post_id,
  closeModal,
}) => {
  const { pending } = useFormStatus();

  const doAction = deletePostData.bind(null, post_id);

  const [state, dispatch] = useFormState(doAction, initialFormState());

  const overLayStyle = classNames(
    ["fixed", "w-full", "h-full", " top-0", "left-0", "z-30"],
    ["bg-gray-600", "opacity-70"]
  );
  const dialogStyle = classNames(
    [
      "fixed",
      "z-40",
      "flex",
      "flex-col",
      "justyfy-center",
      "items-center",
      "top-0",
      "left-0",
    ],
    ["min-h-36", "w-full"],
    [" bg-neutral"]
  );

  return (
    <form action={dispatch}>
      <div className="relative">
        <div
          className={overLayStyle}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        ></div>
        <div className={dialogStyle}>
          <div className="mt-8">
            <p className="mb-5 text-center text-warning">
              {pending ? (
                "削除しています。。。"
              ) : (
                <>
                  <span className="block">当該投稿を削除しますが、</span>
                  <span>本当によろしいでしょうか？</span>
                </>
              )}
            </p>
            <div className="flex justify-center items-center gap-x-5">
              <Button
                size="small"
                type="submit"
                disabled={pending}
                className="px-10 text-secondary disabled:bg-secondary/20 disabled:cursor-not-allowed"
              >
                実行
              </Button>
              <Button
                size="small"
                disabled={pending}
                onClick={closeModal}
                className="px-5 text-secondary disabled:bg-secondary/20 disabled:cursor-not-allowed"
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

interface DeleteBtnFormProps {
  post_id: string;
}

const DeleteBtnForm: FC<DeleteBtnFormProps> = ({ post_id }) => {
  const { closeModal, openModal, isOpen } = useModal(false);

  return (
    <>
      <Button
        onClick={openModal}
        size="small"
        className="w-full font-semibold text-secondary"
      >
        <div className="flex justify-center items-center">
          <FaRegTrashCan className="size-5" />
          <label className="font-semibold text-warning leading-5 pl-2  cursor-pointer">
            記事を削除する
          </label>
        </div>
      </Button>
      {isOpen && (
        <DeleteBtnComponent post_id={post_id} closeModal={closeModal} />
      )}
    </>
  );
};
export default DeleteBtnForm;

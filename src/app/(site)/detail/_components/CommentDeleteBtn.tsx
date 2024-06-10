import useModal from "@/lib/hooks/useModal";
import { FC, FormEvent, useState } from "react";
import classNames from "classnames";
import { Button } from "@/app/components/button/Button";
import { deleteComment } from "@/lib/services/deleteComment";
import { useRouter } from "next/navigation";

interface CommentDeleteBtnComponentProps {
  post_id: string;
  comment_id: number;
  closeModal: () => void;
  preCloseModal: () => void;
}

// 削除ボタン
const CommentDeleteBtnComponent: FC<CommentDeleteBtnComponentProps> = ({
  post_id,
  comment_id,
  closeModal,
  preCloseModal,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setPending(true);
      closeModal();
      preCloseModal();

      await deleteComment(post_id, comment_id);

      router.refresh();
      router.push(`/detail/${post_id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setPending(false);
    }
  };

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
    <form onSubmit={handleSubmit}>
      <div>
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
                  <span className="block">コメントを削除しますが、</span>
                  <span>本当によろしいでしょうか？</span>
                </>
              )}
            </p>
            <div className="flex items-center justify-center gap-x-5">
              <Button
                size="small"
                type="submit"
                disabled={pending}
                className="px-10 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
              >
                実行
              </Button>
              <Button
                size="small"
                disabled={pending}
                onClick={closeModal}
                className="px-5 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
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

interface CommentDeleteBtnProps {
  post_id: string;
  comment_id: number;
  disabled: boolean;
  preCloseModal: () => void;
}

const CommentDeleteBtn: FC<CommentDeleteBtnProps> = ({
  post_id,
  comment_id,
  disabled,
  // 前のモーダルを閉じるハンドラー
  preCloseModal,
}) => {
  const { closeModal, openModal, isOpen } = useModal(false);

  return (
    <>
      <Button
        size="small"
        type="submit"
        onClick={openModal}
        disabled={disabled}
        className="px-10 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
      >
        削除
      </Button>
      {isOpen && (
        <CommentDeleteBtnComponent
          post_id={post_id}
          comment_id={comment_id}
          closeModal={closeModal}
          preCloseModal={preCloseModal}
        />
      )}
    </>
  );
};
export default CommentDeleteBtn;

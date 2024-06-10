"use client";
import { Button } from "@/app/components/button/Button";
import classNames from "classnames";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";
import { insertComment } from "@/lib/services/insertComment";
import { CommentSchema } from "@/constants/validationSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { updateComment } from "@/lib/services/updateComment";

// 新規登録ボタン
interface CreateBtnComponentProps {
  post_id: string;
  comment: string;
  closeModal: () => void;
  onCancelBtnState: Dispatch<SetStateAction<boolean>>;
}
const CreateBtnComponent: FC<CreateBtnComponentProps> = ({
  post_id,
  comment,
  closeModal,
  onCancelBtnState,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      event.preventDefault();
      setPending(true);
      onCancelBtnState(true);

      const formData = new FormData(event.currentTarget);

      CommentSchema.parse({
        commentdata: formData.get("commentdata"),
      });

      await insertComment(post_id, formData);

      closeModal();
      router.refresh();
      router.push(`/detail/${post_id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.formErrors.fieldErrors.commentdata);
        return;
      }
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setPending(false);
      onCancelBtnState(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="commentdata" value={comment} />
        <Button
          size="small"
          type="submit"
          disabled={pending}
          className="px-10 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
        >
          追加
        </Button>
      </form>
    </>
  );
};

// 更新登録ボタン
interface UpdateBtnComponentProps {
  post_id: string;
  comment_id: number;
  comment: string;
  closeModal: () => void;
  onCancelBtnState: Dispatch<SetStateAction<boolean>>;
  onDeleteBtnState: Dispatch<SetStateAction<boolean>>;
}
const UpdateBtnComponent: FC<UpdateBtnComponentProps> = ({
  post_id,
  comment_id,
  comment,
  closeModal,
  onCancelBtnState,
  onDeleteBtnState,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      event.preventDefault();
      setPending(true);
      onCancelBtnState(true);
      onDeleteBtnState(true);

      const formData = new FormData(event.currentTarget);

      CommentSchema.parse({
        commentdata: formData.get("commentdata"),
      });

      await updateComment(post_id, comment_id, formData);

      closeModal();
      router.refresh();
      router.push(`/detail/${post_id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.formErrors.fieldErrors.commentdata);
        return;
      }
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      }
    } finally {
      setPending(false);
      onCancelBtnState(false);
      onDeleteBtnState(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="commentdata" value={comment} />
        <Button
          size="small"
          type="submit"
          disabled={pending}
          className="px-10 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
        >
          更新
        </Button>
      </form>
    </>
  );
};

interface CommentFormProps {
  post_id: string;
  comment_id?: number;
  comment?: string;
  authUser: string;
  closeModal: () => void;
}

const CommentForm: FC<CommentFormProps> = ({
  post_id,
  comment_id,
  comment,
  closeModal,
}) => {
  const [commentData, setCommentData] = useState(comment);
  const [cancelBtnPending, setCancelBtnPending] = useState(false);
  const [updateBtnPending, setUpdateBtnPending] = useState(false);
  const [deleteBtnPending, setDeleteBtnPending] = useState(false);

  const handleOnChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
  };

  const overLayStyle = classNames(
    ["fixed", "w-full", "h-full", " top-0", "left-0", "z-30"],
    ["bg-gray-600", "opacity-70"]
  );
  const dialogStyle = classNames(
    ["fixed", "z-40", "top-1/2", "left-1/2"],
    ["transform", "-translate-x-1/2", "-translate-y-1/2"],
    ["min-h-60", "w-full"],
    [" bg-neutral text-secondary"]
  );

  return (
    <>
      <div>
        <div
          className={overLayStyle}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        ></div>
        <div className={dialogStyle}>
          <h2 className="text-center text-form">
            コメント
            <span>{comment_id == null ? "追加中" : "編集中"}・・・</span>
          </h2>
          <div className="mt-2 flex min-h-28 w-full items-center justify-center leading-normal">
            <textarea
              name="comment"
              id="comment"
              value={commentData}
              onChange={(e) => handleOnChangeComment(e)}
              rows={5}
              required
              placeholder="コメント入力してください"
              className="w-full max-w-96 resize-none rounded-b-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
            />
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-center gap-x-5">
              {comment_id == null ? (
                // 新規コメント追加ボタン
                <CreateBtnComponent
                  post_id={post_id}
                  comment={commentData ?? ""}
                  closeModal={closeModal}
                  onCancelBtnState={setCancelBtnPending}
                />
              ) : (
                <>
                  {/* 更新ボタン */}
                  <UpdateBtnComponent
                    post_id={post_id}
                    comment_id={comment_id}
                    comment={commentData ?? ""}
                    closeModal={closeModal}
                    onCancelBtnState={setCancelBtnPending}
                    onDeleteBtnState={setDeleteBtnPending}
                  />
                  {/* 削除ボタン */}
                  <CommentDeleteBtn
                    post_id={post_id}
                    comment_id={comment_id}
                    disabled={deleteBtnPending}
                    preCloseModal={closeModal}
                  />
                </>
              )}
              {/* キャンセルボタン */}
              <Button
                size="small"
                disabled={cancelBtnPending}
                onClick={closeModal}
                className="px-5 text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentForm;

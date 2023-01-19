import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { APP_ROUTES } from "../../../../shared";

enum CommentFormFields {
  comment = "comment",
}

const CommentForm = () => {
  const { register, handleSubmit } = useForm();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((value) => {
    try {
      const postId = params.id;
      navigate(APP_ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        {...register(CommentFormFields.comment)}
        placeholder="Comment"
        className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
      />
      <button
        type="submit"
        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
      >
        Send
      </button>
    </form>
  );
};

export default CommentForm;

import React from "react";

import { CommentType } from "../../../../shared";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  // const avatar = comment.comment.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {/* {avatar} */}
      </div>
      <div className="flex text-gray-300 text-[10px]">{comment.content}</div>
    </div>
  );
};

export default React.memo(Comment);

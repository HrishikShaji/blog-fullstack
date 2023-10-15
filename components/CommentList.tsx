import { Comment } from "../components/Comment";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
}) => {
  return (
    <div>
      {comments.map((comment) => {
        console.log(comment);
        return (
          <div key={comment.id}>
            <Comment item={comment} postSlug={postSlug} />
            {comment.children && comment.children.length > 0 && (
              <div className="ml-10">
                <CommentList comments={comment.children} postSlug={postSlug} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

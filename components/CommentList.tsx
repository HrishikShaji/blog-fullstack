import { Comment } from "../components/Comment";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
}) => {
  console.log(comments);
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment item={comment} postSlug={postSlug} />
          {comments.children.length > 0 && (
            <div className="ml-10">
              <CommentList comments={comment.children} postSlug={postSlug} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

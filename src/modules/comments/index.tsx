import { useEffect, useState } from 'react';
import moment from 'moment';
import { IComment } from '@interface/comment';
import { IUser } from '@interface/user';
import { commentService } from '@services/comment.service';
import CommentForm from './form';
import {
  CommentList,
  CommentItem,
  Avatar,
  Content,
  Username,
  Timestamp,
  LoadMore,
  Loading
} from './styled';

const ITEMS_PER_PAGE = 5;

type Props = {
  objectId: string;
  currentUser: IUser;
};

const Comments = ({ objectId, currentUser }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const createComment = async (content: string) => {
    const result = await commentService.create({
      objectId,
      content
    });
    setComments((existing) => [result.data, ...existing]);
  };

  const loadItems = async () => {
    setLoading(true);
    const result = await commentService.search({
      objectId,
      limit: ITEMS_PER_PAGE,
      offset: page * ITEMS_PER_PAGE
    });
    setLoading(false);
    setComments((existing) => [...existing, ...result.data.data]);
    setTotal(result.data.total);
    setPage((p) => p + 1);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      {currentUser && <CommentForm onSubmit={createComment} />}
      {total > 0 && (
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment._id}>
              <Avatar src={comment.creator?.avatar || '/no-avatar.png'} />
              <div>
                <Username>{comment.creator?.username}</Username>
                <Timestamp>{moment(comment.createdAt).fromNow()}</Timestamp>
                <Content>{comment.content}</Content>
              </div>
            </CommentItem>
          ))}
        </CommentList>
      )}
      {isLoading && <Loading>Loading...</Loading>}
      {total > 0 && comments.length < total && !isLoading && (
        <LoadMore onClick={loadItems}>Load more comments</LoadMore>
      )}
    </>
  );
};

export default Comments;

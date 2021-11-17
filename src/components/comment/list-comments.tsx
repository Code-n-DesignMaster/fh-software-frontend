import { PureComponent } from 'react';
import moment from 'moment';
import { IComment } from '../../interfaces/comment';

interface IProps {
  comments: IComment[];
}

export class ListComments extends PureComponent<IProps> {
  render() {
    const { comments } = this.props;
    return (
      <div className="cmt-list">
        {comments.length > 0 &&
          comments.map((comment: IComment) => (
            <div className="cmt-item" key={comment._id}>
              <img
                alt="avatar"
                src={
                  comment.creator && comment.creator.avatar
                    ? comment.creator.avatar
                    : '/no-avatar.png'
                }
              />
              <div className="cmt-user">
                <div>
                  <span>
                    {comment.creator && comment.creator.username
                      ? comment.creator.username
                      : 'N/A'}
                    <span className="cmt-time">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </span>
                </div>
                <p className="cmt-content">{comment.content}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

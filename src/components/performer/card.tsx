import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IPerformer } from 'src/interfaces';
import Link from 'next/link';
import routes from 'server/routes';
import './performer.less';

interface IProps {
  performer: IPerformer;
  currentUser: any;
}

class PerformerCard extends PureComponent<IProps> {
  render() {
    const { performer, currentUser } = this.props;
    const includeAdmin =
      (currentUser &&
        currentUser.roles &&
        currentUser.roles.includes('admin')) ||
      false;
    return (
      <div className="model-card">
        {performer.feature === 1 && (
          <span className="feature">
            <div className="feature-label">FEATURED</div>
          </span>
        )}
        <routes.Link
          route={`/model/${performer.username}`}
          params={{ username: performer.username }}
        >
          <a>
            <div className="card-img">
              <img alt="avatar" src={performer.avatar || '/no-avatar.png'} />
            </div>
            {includeAdmin && (
              <div className="card-stat">
                <span>{performer?.stats?.views || 0} views</span>
                <span>{performer?.stats?.subscribers || 0} subs</span>
              </div>
            )}
            <div className="model-name">{performer.username}</div>
          </a>
        </routes.Link>
        {/* <div className="hovering">
          <Link href={{ pathname: '/model/profile', query: { username: per.username } }} as={'/model/' + per.username}>
            <a>{per.username}</a>
          </Link>
        </div> */}
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: state.user.current
});
export default connect(mapStates)(PerformerCard);

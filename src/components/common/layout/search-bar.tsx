import { PureComponent } from 'react';
import { Input } from 'antd';
// import Link from 'next/link';
import { performerService } from '@services/index';
import './search-bar.less';
import { debounce } from 'lodash';
import onClickOutside from 'react-onclickoutside';
import routes from 'server/routes';

const { Search } = Input;
interface IProps {
  userId: string;
}

interface IState {
  items: any[];
  searching: boolean;
  searched: boolean;
}

class SearchBar extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searching: false,
      searched: false
    };
  }

  handleClickOutside = (evt) => {
    if (this.state.searched) {
      return this.setState({ searched: false });
    }
  };

  onSearch = debounce(async (e) => {
    const value = (e.target && e.target.value) || null;
    if (!value) {
      return this.setState({ searched: false });
    }
    try {
      this.setState({ searching: true, searched: false });
      const data = await (
        await performerService.search({
          q: e.target.value,
          userId: this.props.userId
        })
      ).data;
      if (data && data.data) {
        this.setState({ searching: false, items: data.data, searched: true });
      }
    } catch (err) {
      this.setState({ searching: false, searched: true });
    }
    return undefined;
  }, 300);

  render() {
    const { searching, items, searched } = this.state;
    return (
      <div className="search-bar">
        <Search
          placeholder="Find your favorite model here..."
          onChange={(e) => {
            e.persist();
            this.onSearch(e);
          }}
          onFocus={(e) => {
            e.persist();
            this.onSearch(e);
          }}
          loading={searching}
          allowClear
          enterButton
        />
        {!searching && searched && (
          <ul className="drop-hint">
            {items.length > 0 &&
              items.map((item) => (
                <routes.Link
                  key={item._id}
                  route={`/model/${item.username}`}
                  params={{ username: item.username }}
                >
                  <a
                    onClick={() => {
                      this.setState({ searching: false, searched: false });
                    }}
                  >
                    <li key={item._id}>
                      {item.name || `${item.firstName} ${item.lastName}`}
                    </li>
                  </a>
                </routes.Link>
              ))}
            {!items.length && <li>No model found.</li>}
          </ul>
        )}
      </div>
    );
  }
}

export default onClickOutside(SearchBar);

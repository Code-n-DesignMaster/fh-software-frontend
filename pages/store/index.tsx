import { Layout, Tag, Button, message, Modal, Alert } from 'antd';
import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { productService } from '@services/index';
import { IProduct, IUser, IUIConfig } from '../../src/interfaces';
import { PerformerListProduct } from '@components/product/performer-list-product';
import { addCart, removeCart, clearCart } from '@redux/cart/actions';
import Link from 'next/link';
import _ from 'lodash';
import './store.less';

interface IProps {
  addCart: Function;
  cart: any;
  user: IUser;
  removeCart: Function;
  clearCart: Function;
  ui: IUIConfig;
  id: string;
}

const { Content } = Layout;

const ConfirmChangeCart = ({ visible, onOk, onCancel }) => {
  return (
    <div>
      <Modal
        title="Confirm to switch cart"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Alert
          message="You are ordering product of another model, please confirm that you want to switch?"
          type="warning"
        />
      </Modal>
    </div>
  );
};

class ProductViewPage extends PureComponent<IProps> {
  static authenticate: boolean = true;
  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  state = {
    product: null,
    relatedProducts: [],
    modalVisible: false,
    currentItem: null
  };

  async componentDidMount() {
    const id = this.props.id;
    const product = (await (await productService.userView(id))
      .data) as IProduct;
    if (product) {
      this.setState({ product });
      const relatedProducts = await (
        await productService.userSearch({
          limit: 24,
          excludedId: product._id,
          performerId: product.performerId
        })
      ).data;
      this.setState({
        relatedProducts: relatedProducts.data
      });
    }
  }

  async componentDidUpdate() {
    const id = this.props.id;
    if (id !== this.state.product._id) {
      const product = (await (await productService.userView(id))
        .data) as IProduct;
      if (product) {
        this.setState({ product });
        const relatedProducts = await (
          await productService.userSearch({
            limit: 24,
            excludedId: product._id,
            performerId: product.performerId
          })
        ).data;
        this.setState({
          relatedProducts: relatedProducts.data
        });
      }
    }
  }

  updateCartLocalStorage(item: IProduct) {
    let oldCart = localStorage.getItem(`cart_${this.props.user._id}`) as any;
    oldCart = oldCart && oldCart.length ? JSON.parse(oldCart) : [];
    const newCart = [...oldCart, ...[item]];
    localStorage.setItem(
      `cart_${this.props.user._id}`,
      JSON.stringify(_.uniqBy(newCart, '_id'))
    );
  }

  resetCartLocal() {
    localStorage.setItem(`cart_${this.props.user._id}`, JSON.stringify([]));
  }

  async onAddCart(item: IProduct) {
    await this.setState({ currentItem: item });
    const productOf = localStorage.getItem(`product_of`) as any;
    const cart = this.props.cart;
    if (cart && cart.items.length > 0 && productOf !== item.performerId) {
      await this.setState({ modalVisible: true });
      return;
    }
    localStorage.setItem(`product_of`, item.performerId);
    const index = cart.items.findIndex((element) => element._id === item._id);
    if (index > -1) {
      return message.error('You already added this item');
    }
    this.props.addCart([
      { _id: item._id, quantity: 1, performerId: item.performerId }
    ]);
    this.updateCartLocalStorage({
      _id: item._id,
      quantity: 1,
      performerId: item.performerId
    });
  }

  async onConfirmChangeCart() {
    localStorage.setItem(`product_of`, this.state.currentItem.performerId);
    await this.props.clearCart();
    this.onAddCart(this.state.currentItem);
    this.setState({ modalVisible: false });
  }

  onCancelChangeCart() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    const { user, ui } = this.props;
    const { modalVisible, product } = this.state;
    return (
      <Fragment>
        <Head>
          <title>HoneyDrip | {product && product.name} </title>
          <meta
            property="og:title"
            content={`honeydrip.com - ${product && product.name}`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - ${product && product.name}`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Layout>
          <Content>
            <div className="prod-main">
              <div className="main-container">
                <div className="prod-card">
                  <ConfirmChangeCart
                    visible={modalVisible}
                    onOk={this.onConfirmChangeCart.bind(this)}
                    onCancel={this.onCancelChangeCart.bind(this)}
                  />
                  {product && (
                    <div className="prod-img">
                      <img
                        src={
                          product.image ? product.image : '/empty_product.svg'
                        }
                      ></img>
                      {product.stock && (
                        <span className="prod-stock">
                          {product.stock} in stock
                        </span>
                      )}
                      {!product.stock && (
                        <span className="prod-stock">Out of stock!</span>
                      )}
                      <span className="prod-digital">{product.type}</span>
                    </div>
                  )}
                  {product && (
                    <div className="prod-info">
                      <div className="prod-name">{product.name}</div>
                      <p className="prod-desc">{product.description}</p>
                      <div className="add-cart">
                        <p className="prod-price">
                          ${product.price.toFixed(2)}
                        </p>
                        <Button
                          className="primary"
                          disabled={
                            !product.stock ||
                            (user && user._id === product.performerId)
                          }
                          onClick={this.onAddCart.bind(this, product)}
                        >
                          Add to Cart
                        </Button>
                        &nbsp;
                        <Button type="link" className="secondary">
                          <Link href="/cart">
                            <a>Go to Cart</a>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="main-container">
              <div className="related-prod">
                <h4 className="ttl-1">You may also like</h4>
                {this.state.relatedProducts.length > 0 && (
                  <PerformerListProduct products={this.state.relatedProducts} />
                )}
              </div>
            </div>
          </Content>
        </Layout>
      </Fragment>
    );
  }
}
const mapStates = (state: any) => ({
  cart: { ...state.cart },
  user: state.user.current,
  ui: state.ui
});

const mapDispatch = { addCart, removeCart, clearCart };
export default connect(mapStates, mapDispatch)(ProductViewPage);

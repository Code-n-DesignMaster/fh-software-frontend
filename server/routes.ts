// import Routes from 'next-routes';
const routes = require('next-routes');

/**
 * routes.add([name], pattern = /name, page = name)
   routes.add(object)
 */

export default routes()
  .add('top-models', '/top-models', '/model/top-models')
  .add('account', '/model/account', '/model/account')
  .add('feed-manager', '/model/feed-manager', '/model/feed-manager')
  .add('gallery-manager', '/model/gallery-manager', '/model/gallery-manager')
  .add('order-manager', '/model/order-manager', '/model/order-manager')
  .add('photo-manager', '/model/photo-manager', '/model/photo-manager')
  .add('store-manager', '/model/store-manager', '/model/store-manager')
  .add('video-manager', '/model/video-manager', '/model/video-manager')
  .add('my-subscriber', '/model/my-subscriber', '/model/my-subscriber')
  .add('home', '/home', '/home')
  .add('gallery', '/gallery/:id', '/gallery')
  .add('model', '/model/:username', '/model/[username]')
  .add('video', '/video/:id', '/video')
  .add('store', '/store/:id', '/store')
  .add('page', '/page/:id', '/page')
  .add('index', '/', '/index');

const Router = require('koa-router');

const manager = new Router();
const controller = require('./controller');

// console.log(controller);
manager.post('/login', controller.login);
manager.post('/getUser', controller.getUser);
manager.get('/searchUsers', controller.searchUsers);
manager.post('/createUser', controller.createUser);
manager.delete('/deleteUser', controller.deleteUser);
manager.put('/replaceUser', controller.replaceUser);
manager.patch('/updateUser', controller.updateUser);
manager.post('/silentRefresh', controller.silentRefresh);
// manager.get("/search", controller.search);

manager.get('/', (ctx, next) => {
  ctx.body = 'GET' + ctx.request.path;
});

module.exports = manager;

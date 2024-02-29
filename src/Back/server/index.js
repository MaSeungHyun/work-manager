require('dotenv').config();

const port = process.env.PORT || 4000;

const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');

const mongo = require('../database/mongo');

const auth = require('../Auth/auth_routes');

const cors = require('@koa/cors');
const Router = require('koa-router');
const router = new Router();

// app.use(cors());
app.use(bodyParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(router.routes()).use(router.allowedMethods());

router.use('/auth', auth.routes());

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

mongo.run();

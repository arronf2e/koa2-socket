const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

const server = require('http').createServer(app.callback());

const io = require('socket.io')(server)


app.use(views(path.join(__dirname, './app/view'), {
  extension: 'ejs'
}))

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'hello world'
	});
});

io.on('connection', function(socket){
	let i = 0;
	setInterval(() => {
		socket.emit('test', { count: ++i });
	}, 3000);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(3000);

console.log(`Server is running at port: 3000`);
import Koa from 'koa'
import routers from '@src/routers/index'
import { LoadConfig } from './routers/load'

const app = new Koa();

// config load 
app.use(LoadConfig)

// koa-router-settings
app.use(routers.routes());
app.use(routers.allowedMethods());

app.listen(8000, () => {
  console.log("The Server is running at http://localhost:8000");
});


import Koa from 'koa';
import routers from '@src/routers/index';
import { Init } from './init'
import { LoadConfig } from './routers/load';

const app = new Koa();

// init token caches
Init.tokenCache().then(() => {
    // 保证token顺利获得后再进行服务挂载
    app.use(LoadConfig);

    // koa-router-settings
    app.use(routers.routes());
    app.use(routers.allowedMethods());
    
    app.listen(8000, () => {
        console.log('The Server is running at http://localhost:8000');
    });
    
})
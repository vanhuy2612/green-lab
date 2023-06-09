'use strict';
import Server from '@root/libs/server';
import { ClusterService } from '@root/libs/core/cluster';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const ex_util = require('./build/Release/ex_util.node');
(async function start() {
  // this.logger.log(ex_util);
  const server = new Server();
  ClusterService.register(server.start);
})();

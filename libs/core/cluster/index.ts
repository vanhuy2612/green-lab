import cluster from 'cluster';
import os from 'os';

const cpus: number = os.cpus().length;
const numCPUs: number = cpus > 1 ? Math.floor(cpus * 0.8) : cpus;

export class ClusterService {
  /**
   * Allow 80% CPU running
   * @param numCPUs
   * @param cb
   */
  static register(cb: any): void {
    if (process.env.NODE_ENV === 'development') {
      cb();
    } else {
      if (cluster.isPrimary) {
        console.log(
          `Master server started on ${process.pid} and fork ${numCPUs} Worker`,
        );
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} died. Restarting`);
          cluster.fork();
        });
      } else {
        console.log(`Cluster server started on ${process.pid}`);
        cb();
      }
    }
  }
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.NODE_PORT || 3000,
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.NODE_IP || 'localhost',
  workerCount: process.env.NODE_CLUSTER_WORKERS || 4
};

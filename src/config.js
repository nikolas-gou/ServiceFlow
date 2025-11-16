const config = {
  server: 'http://192.168.2.240:8000', //home wifi
  dateFormat: 'el-GR',
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  config.server = 'http://192.168.2.240:8000'; //home wifi
}

export default config;

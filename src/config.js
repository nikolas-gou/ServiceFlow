const config = {
  // server: 'http://192.168.148.230:8000', hotspot mobile
  server: 'http://192.168.2.8:8000', //home wifi
  // server: 'http://localhost:8000', //localhost
  dateFormat: 'el-GR',
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  config.server = 'http://192.168.2.8:8000'; //home wifi
}

export default config;

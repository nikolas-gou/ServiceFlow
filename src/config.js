const config = {
  server: "http://localhost:8000",
  dateFormat: "el-GR",
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== "development") {
  config.server = "serviceflow.infinityfreeapp.com/ServiceFlow-Backend";
}

export default config;

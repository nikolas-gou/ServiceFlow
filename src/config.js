const config = {
  server: "http://localhost:8000",
  dateFormat: "el-GR",
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== "development") {
  config.server = "domain.gr";
}

export default config;

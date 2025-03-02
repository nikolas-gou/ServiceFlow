import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Typography, Box } from "@mui/material";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapping το path αγγλικα => ελληνικα. Στο μελλον ίσως global!
  const pathMap = {
    dashboard: "Πίνακας ελέγχου",
    overview: "Αρχική",
    analytics: "Στατιστικά",
    customers: "Πελάτες",
    services: "Επισκευές",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: 14 }}>
      {/* Dynamic Path */}
      <MUIBreadcrumbs separator="›" sx={{ fontSize: 14 }}>
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const mappingName = pathMap[name];
          console.log(mappingName, name);
          return isLast ? (
            <Typography key={name} sx={{ fontWeight: "bold", color: "#000" }}>
              {mappingName.charAt(0).toUpperCase() + mappingName.slice(1)}
            </Typography>
          ) : (
            <Typography
              key={name}
              style={{ textDecoration: "none", color: "#6b7280" }}
            >
              {mappingName.charAt(0).toUpperCase() + mappingName.slice(1)}
            </Typography>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
}

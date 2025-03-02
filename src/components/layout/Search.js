import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";

export default function Search() {
  const today = new Date().toLocaleDateString("el-GR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      justifyContent="space-between"
      width="100%"
    >
      <Box flexGrow={1} />
      <TextField
        variant="outlined"
        placeholder="Μάρκα, kw, hp, πελάτης"
        size="small"
        sx={{
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          minWidth: 250,
          "& .MuiOutlinedInput-root": {
            paddingRight: 1.5,
            fontSize: 14,
            height: 36,
            "& fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: 14,
          color: "#6b7280",
        }}
      >
        <EventIcon fontSize="small" sx={{ marginRight: 1 }} /> {today}
      </Box>
    </Box>
  );
}

import React from "react";
import { TextField, Grid } from "@mui/material";

function ThreePhaseFields(props) {
  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={4}>
        {/* step */}
        <TextField
          fullWidth
          label={props.step_label}
          name={props.step_name}
          variant="outlined"
          value={props.step_value}
          onChange={props.onChange}
          placeholder="π.χ. 8-10-12"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* spiral */}
        <TextField
          fullWidth
          label={props.spiral_label}
          name={props.spiral_name}
          variant="outlined"
          value={props.spiral_value}
          onChange={props.onChange}
          placeholder="π.χ. 66"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* cross_section */}
        <TextField
          fullWidth
          label={props.cross_section_label}
          name={props.cross_section_name}
          variant="outlined"
          value={props.cross_section_value}
          onChange={props.onChange}
          placeholder="π.χ. 6/10 + 7/10 + 2X8/10"
        />
      </Grid>
    </Grid>
  );
}

export default ThreePhaseFields;

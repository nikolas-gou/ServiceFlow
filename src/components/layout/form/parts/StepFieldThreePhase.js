import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Autocomplete,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import { Customer } from "../../../Models/Customer";
import { Repair } from "../../../Models/Repair";
import { CustomerRepository } from "../../../Repositories/CustomerRepository";
import { MotorRepository } from "../../../Repositories/MotorRepository";
import {
  rpm_types,
  rpm_types_translated,
  poles_types,
  poles_types_translated,
  volt_types,
  volt_types_translated,
  connectionism_types,
  connectionism_types_translated,
  typeOfMotor_translated,
  typeOfMotor,
  typeOfVolt,
  typeOfVolt_translated,
  typeOfStep,
  typeOfStep_translated,
} from "../../../Models/Motor";
import {
  repair_types,
  repair_types_translated,
} from "../../../Models/Repair_Types";
import { RepairRepository } from "../../../Repositories/RepairRepository";

function StepFieldThreePhase(props) {
  console.log(props);
  return (
    <>
      {props.repair.motor?.typeOfVolt == "3-phase" && (
        <>
          {props.repair.motor?.typeOfStep == "standard" && (
            <Grid item xs={12} sm={8} style={{ maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Βήμα (Ολόκληρο)"
                name="motor.step"
                variant="outlined"
                value={props.repair.motor?.step || ""}
                onChange={props.handleInputChange}
                placeholder="π.χ. 8-10-12"
              />
            </Grid>
          )}
          {props.repair.motor?.typeOfStep == "half" && (
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Βήμα (Μισό-Μισό)"
                name="motor.step"
                variant="outlined"
                value={props.repair.motor?.step || ""}
                onChange={props.handleInputChange}
                placeholder="π.χ. 8-10-12"
              />
            </Grid>
          )}
          {props.repair.motor?.typeOfStep == "combined" && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Βήμα (Μισό-Μισό)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 8-10-12"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Βήμα (Ολόκληρο)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 8-10-12"
                />
              </Grid>
            </>
          )}
        </>
      )}
      {props.repair.motor?.typeOfVolt == "1-phase" && (
        <>
          {props.repair.motor?.typeOfStep == "standard" && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Κυρίως Βήμα (Ολόκληρο)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 6-8-10-12"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Βοηθητικό Βήμα (Ολόκληρο)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 10-12"
                />
              </Grid>
            </>
          )}
          {props.repair.motor?.typeOfStep == "half" && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Κυρίως Βήμα (Μισό-Μισό)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 6-8-10-12"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Βοηθητικό Βήμα (Μισό-Μισό)"
                  name="motor.step"
                  variant="outlined"
                  value={props.repair.motor?.step || ""}
                  onChange={props.handleInputChange}
                  placeholder="π.χ. 10-12"
                />
              </Grid>
            </>
          )}
        </>
      )}
      {props.repair.motor?.typeOfStep == "combined" && (
        <>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Κυρίως Βήμα (Μισό-Μισό)"
              name="motor.step"
              variant="outlined"
              value={props.repair.motor?.step || ""}
              onChange={props.handleInputChange}
              placeholder="π.χ. 6-8-10-12"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Βοηθητικό Βήμα (Μισό-Μισό)"
              name="motor.step"
              variant="outlined"
              value={props.repair.motor?.step || ""}
              onChange={props.handleInputChange}
              placeholder="π.χ. 10-12"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Κυρίως Βήμα (Ολόκληρο)"
              name="motor.step"
              variant="outlined"
              value={props.repair.motor?.step || ""}
              onChange={props.handleInputChange}
              placeholder="π.χ. 6-8-10-12"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Βοηθητικό Βήμα (Ολόκληρο)"
              name="motor.step"
              variant="outlined"
              value={props.repair.motor?.step || ""}
              onChange={props.handleInputChange}
              placeholder="π.χ. 10-12"
            />
          </Grid>
        </>
      )}
    </>
  );
}

export default StepFieldThreePhase;

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

function TypeOfStepField(props) {
  console.log(props, "yaa");
  return (
    <FormControl fullWidth>
      <InputLabel id="type-select-label">Τύπος Βήματος</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        name="motor.typeOfStep"
        value={props.repair.motor?.typeOfStep || ""}
        label="Τύπος Βήματος"
        onChange={props.handleInputChange}
      >
        {typeOfStep.map((type, index) => {
          return (
            <MenuItem key={type} value={type}>
              {typeOfStep_translated[index]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default TypeOfStepField;

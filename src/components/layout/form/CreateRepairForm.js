import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
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
  FormHelperText,
} from "@mui/material";
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import { Customer } from "../../Models/Customer";
import { Repair } from "../../Models/Repair";
import { Motor } from "../../Models/Motor";
import { CustomerRepository } from "../../Repositories/CustomerRepository";

// Υποθετικά δεδομένα για τα dropdowns
const brandsData = [
  "SIEMENS",
  "ABB",
  "ELECTROTECH",
  "SCHNEIDER",
  "TOSHIBA",
  "Άλλο",
];
const motorConnectionTypes = ["Αστέρας", "Τρίγωνο", "Άλλο"];
const commonIssues = [
  "Βραχυκύκλωμα περιέλιξης",
  "Φθορά ρουλεμάν",
  "Πρόβλημα στο φρένο",
  "Διαρροή ρεύματος",
  "Φθορά ψηκτρών",
];

function CreateRepairForm() {
  const [tabValue, setTabValue] = useState(0);
  const [repair, setRepair] = useState(new Repair());
  const [customers, setCustomers] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Αρχικοποίηση των δεδομένων φόρμας
  useEffect(() => {
    const initialRepair = new Repair();
    initialRepair.customer = new Customer();
    initialRepair.motor = new Motor();
    initialRepair.description = "";
    initialRepair.cost = 0;
    setRepair(initialRepair);

    loadCustomers();
  }, []);

  // Φόρτωση πελατών από το repository
  const loadCustomers = async () => {
    try {
      const data = await CustomerRepository.listOfNames();
      setCustomers(data || []);
    } catch (err) {
      console.error("Σφάλμα φόρτωσης πελατών:", err);
      setCustomers([]);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Γενική διαχείριση αλλαγών για τα απλά πεδία
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Διαχείριση ένθετων πεδίων (π.χ. customer.name, motor.manufacturer)
      const [parent, child] = name.split(".");

      setRepair((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));

      // Καθαρισμός τυχόν σφαλμάτων
      if (errors[`${parent}.${child}`]) {
        setErrors((prev) => ({
          ...prev,
          [`${parent}.${child}`]: null,
        }));
      }
    } else {
      // Διαχείριση απλών πεδίων
      setRepair((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Καθαρισμός τυχόν σφαλμάτων
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    }
  };

  // Για το Autocomplete του πελάτη
  const handleCustomerChange = (event, newValue) => {
    setRepair((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        name: newValue,
      },
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (errors["customer.name"]) {
      setErrors((prev) => ({
        ...prev,
        ["customer.name"]: null,
      }));
    }
  };

  // Προσθήκη συνηθισμένων θεμάτων στην περιγραφή
  const handleAddCommonIssue = (issue) => {
    const updatedDescription = repair.description
      ? `${repair.description}\n- ${issue}`
      : `- ${issue}`;

    setRepair((prev) => ({
      ...prev,
      description: updatedDescription,
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (errors.description) {
      setErrors((prev) => ({
        ...prev,
        description: null,
      }));
    }
  };

  // Επικύρωση τρέχουσας καρτέλας
  const validateCurrentTab = () => {
    const newErrors = {};
    let isValid = true;
    let errorMsg = "";

    switch (tabValue) {
      case 0: // Βασικά Στοιχεία
        if (!repair.customer?.name) {
          newErrors["customer.name"] = "Το πεδίο Πελάτης είναι υποχρεωτικό";
          errorMsg = "Ξέχασες να συμπληρώσεις το πεδίο Πελάτης";
          isValid = false;
        }
        if (!repair.motor?.manufacturer) {
          newErrors["motor.manufacturer"] =
            "Η επιλογή Μάρκας είναι υποχρεωτική";
          errorMsg = errorMsg || "Ξέχασες να επιλέξεις Μάρκα";
          isValid = false;
        }
        if (!repair.customer?.phone) {
          newErrors["customer.phone"] = "Το πεδίο Τηλέφωνο είναι υποχρεωτικό";
          errorMsg = errorMsg || "Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο";
          isValid = false;
        }
        break;
      case 2: // Περιγραφή Βλάβης
        if (!repair.description) {
          newErrors.description = "Η περιγραφή βλάβης είναι υποχρεωτική";
          errorMsg = "Ξέχασες να συμπληρώσεις την περιγραφή βλάβης";
          isValid = false;
        }
        break;
      case 3: // Κόστος & Παράδοση
        if (!repair.cost) {
          newErrors.cost = "Το εκτιμώμενο κόστος είναι υποχρεωτικό";
          errorMsg = "Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος";
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setErrorMessage(errorMsg);

    return isValid;
  };

  // Επικύρωση όλων των καρτελών χωρίς εναλλαγή
  const validateAllTabs = () => {
    const allErrors = {};
    let isValid = true;
    let errorMsg = "";

    // Έλεγχος Βασικών Στοιχείων
    if (!repair.customer?.name) {
      allErrors["customer.name"] = "Το πεδίο Πελάτης είναι υποχρεωτικό";
      errorMsg = "Ξέχασες να συμπληρώσεις το πεδίο Πελάτης";
      isValid = false;
    }
    if (!repair.motor?.manufacturer) {
      allErrors["motor.manufacturer"] = "Η επιλογή Μάρκας είναι υποχρεωτική";
      errorMsg = errorMsg || "Ξέχασες να επιλέξεις Μάρκα";
      isValid = false;
    }
    if (!repair.customer?.phone) {
      allErrors["customer.phone"] = "Το πεδίο Τηλέφωνο είναι υποχρεωτικό";
      errorMsg = errorMsg || "Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο";
      isValid = false;
    }

    // Έλεγχος Περιγραφής Βλάβης
    if (!repair.description) {
      allErrors.description = "Η περιγραφή βλάβης είναι υποχρεωτική";
      errorMsg = errorMsg || "Ξέχασες να συμπληρώσεις την περιγραφή βλάβης";
      isValid = false;
    }

    // Έλεγχος Κόστους
    if (!repair.cost) {
      allErrors.cost = "Το εκτιμώμενο κόστος είναι υποχρεωτικό";
      errorMsg = errorMsg || "Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος";
      isValid = false;
    }

    setErrors(allErrors);
    setErrorMessage(errorMsg);

    return isValid;
  };

  const handleNextStep = () => {
    if (validateCurrentTab()) {
      if (tabValue < 3) {
        setTabValue(tabValue + 1);
      } else {
        handleSubmit();
      }
    } else {
      setErrorAlert(true);
    }
  };

  const handlePreviousStep = () => {
    setTabValue(tabValue - 1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (validateAllTabs()) {
      // Εδώ θα γινόταν η αποστολή στο API
      console.log("Δεδομένα Επισκευής για Αποθήκευση:", repair);
      setSuccessAlert(true);
    } else {
      setErrorAlert(true);
    }
  };

  // Τίτλος κουμπιού ανάλογα με την καρτέλα
  const buttonText = tabValue === 3 ? "Αποθήκευση" : "Επόμενο Βήμα";
  const buttonIcon = tabValue === 3 ? <SaveIcon /> : <NavigateNextIcon />;

  // Έλεγχος σφαλμάτων για κάθε πεδίο
  const hasError = (fieldName) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName) => errors[fieldName] || "";

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 3, color: "#1976d2" }}
        >
          Καταχώρηση Νέας Επισκευής
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="repair form tabs"
          >
            <Tab label="Βασικά Στοιχεία" />
            <Tab label="Τεχνικά Χαρακτηριστικά" />
            <Tab label="Περιγραφή Βλάβης" />
            <Tab label="Κόστος & Παράδοση" />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Tab 1: Βασικά Στοιχεία */}
          <Box hidden={tabValue !== 0} sx={{ pb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  options={customers || []}
                  value={repair.customer?.name || ""}
                  onChange={handleCustomerChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Πελάτης"
                      name="customer.name"
                      variant="outlined"
                      onChange={(e) => handleInputChange(e)}
                      error={hasError("customer.name")}
                      helperText={getErrorMessage("customer.name")}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Τύπος</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    name="customer.type"
                    value={repair.customer?.type || ""}
                    label="Τύπος"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="ιδιωτης">Ιδιώτης</MenuItem>
                    <MenuItem value="εργοστασιο">Εργοστάσιο</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Τηλέφωνο"
                  name="customer.phone"
                  variant="outlined"
                  value={repair.customer?.phone || ""}
                  onChange={handleInputChange}
                  error={hasError("customer.phone")}
                  helperText={getErrorMessage("customer.phone")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="customer.email"
                  variant="outlined"
                  value={repair.customer?.email || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  error={hasError("motor.manufacturer")}
                >
                  <InputLabel>Μάρκα</InputLabel>
                  <Select
                    name="motor.manufacturer"
                    value={repair.motor?.manufacturer || ""}
                    label="Μάρκα"
                    onChange={handleInputChange}
                  >
                    {brandsData.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                  {hasError("motor.manufacturer") && (
                    <FormHelperText>
                      {getErrorMessage("motor.manufacturer")}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ημερομηνία Παραλαβής"
                  name="motor.created_at"
                  type="date"
                  value={repair.motor?.created_at || ""}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Tab 2: Τεχνικά Χαρακτηριστικά */}
          <Box hidden={tabValue !== 1} sx={{ pb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Serial Number"
                  name="motor.serial_number"
                  variant="outlined"
                  value={repair.motor?.serial_number || ""}
                  onChange={handleInputChange}
                  placeholder="π.χ. 3568"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Βήμα"
                  name="motor.step"
                  variant="outlined"
                  value={repair.motor?.step || ""}
                  onChange={handleInputChange}
                  placeholder="π.χ. 8-10-12"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Σπείρες"
                  name="motor.spiral"
                  variant="outlined"
                  value={repair.motor?.spiral || ""}
                  onChange={handleInputChange}
                  placeholder="π.χ. 66"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Διατομή"
                  name="motor.cross_section"
                  variant="outlined"
                  value={repair.motor?.cross_section || ""}
                  onChange={handleInputChange}
                  placeholder="π.χ. 6/10 + 7/10 + 2X8/10"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Σύνδεση</InputLabel>
                  <Select
                    name="motor.connectionism"
                    value={repair.motor?.connectionism || ""}
                    label="Σύνδεση"
                    onChange={handleInputChange}
                  >
                    {motorConnectionTypes.map((type) => (
                      <MenuItem key={type} value={type.toLowerCase()}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ισχύς (kW)"
                  name="motor.kw"
                  type="number"
                  variant="outlined"
                  value={repair.motor?.kw || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ισχύς (HP)"
                  name="motor.hp"
                  type="number"
                  variant="outlined"
                  value={repair.motor?.hp || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Tab 3: Περιγραφή Βλάβης */}
          <Box hidden={tabValue !== 2} sx={{ pb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Συνήθεις βλάβες:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {commonIssues.map((issue) => (
                    <Button
                      key={issue}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      onClick={() => handleAddCommonIssue(issue)}
                    >
                      {issue}
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Περιγραφή Βλάβης"
                  name="description"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={repair.description || ""}
                  onChange={handleInputChange}
                  error={hasError("description")}
                  helperText={getErrorMessage("description")}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Tab 4: Κόστος & Παράδοση */}
          <Box hidden={tabValue !== 3} sx={{ pb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Εκτιμώμενο Κόστος (€)"
                  name="cost"
                  type="number"
                  variant="outlined"
                  value={repair.cost || ""}
                  onChange={handleInputChange}
                  error={hasError("cost")}
                  helperText={getErrorMessage("cost")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Εκτιμώμενη Ημερομηνία Παράδοσης"
                  name="estimated_delivery_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={repair.estimated_delivery_date || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Form Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {tabValue > 0 && (
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<NavigateBeforeIcon />}
                  onClick={handlePreviousStep}
                  sx={{ mr: 2 }}
                >
                  Προηγούμενο Βήμα
                </Button>
              </Box>
            )}

            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={buttonIcon}
                onClick={handleNextStep}
              >
                {buttonText}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Success Alert */}
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          Η επισκευή καταχωρήθηκε με επιτυχία!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert onClose={() => setErrorAlert(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateRepairForm;

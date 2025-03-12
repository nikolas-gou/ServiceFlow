import React, { useState } from "react";
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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Save as SaveIcon,
  Print as PrintIcon,
  PhotoCamera as CameraIcon,
} from "@mui/icons-material";

// Υποθετικά δεδομένα για τα dropdowns
const brandsData = [
  "SIEMENS",
  "ABB",
  "ELECTROTECH",
  "SCHNEIDER",
  "TOSHIBA",
  "Άλλο",
];
const motorTypes = ["AC", "DC", "Servo", "Step Motor", "Άλλο"];
const commonIssues = [
  "Βραχυκύκλωμα περιέλιξης",
  "Φθορά ρουλεμάν",
  "Πρόβλημα στο φρένο",
  "Διαρροή ρεύματος",
  "Φθορά ψηκτρών",
];

function CreateRepairForm() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    brand: "",
    motorType: "",
    steps: "",
    kw: "",
    hp: "",
    issueDescription: "",
    estimatedCost: "",
    estimatedCompletionDate: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCommonIssue = (issue) => {
    setFormData({
      ...formData,
      issueDescription: formData.issueDescription
        ? `${formData.issueDescription}\n- ${issue}`
        : `- ${issue}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Εδώ θα μπορούσατε να στείλετε τα δεδομένα στο API σας
    setSuccessAlert(true);
  };

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
                <TextField
                  disabled
                  fullWidth
                  label="Αριθμός Επισκευής"
                  variant="outlined"
                  value="Αυτόματη Καταχώρηση"
                  helperText="Δημιουργείται αυτόματα με την αποθήκευση"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ημερομηνία Παραλαβής"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={[
                    "Παπαδόπουλος",
                    "ΑΓΕΤ",
                    "Αντωνίου",
                    "Κωνσταντίνου",
                    "Βασιλόπουλος",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Πελάτης"
                      name="customerName"
                      variant="outlined"
                      onChange={handleInputChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Τηλέφωνο"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Μάρκα</InputLabel>
                  <Select
                    name="brand"
                    value={formData.brand}
                    label="Μάρκα"
                    onChange={(e) =>
                      handleSelectChange("brand", e.target.value)
                    }
                  >
                    {brandsData.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Tab 2: Τεχνικά Χαρακτηριστικά */}
          <Box hidden={tabValue !== 1} sx={{ pb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Τύπος Μοτέρ</InputLabel>
                  <Select
                    name="motorType"
                    value={formData.motorType}
                    label="Τύπος Μοτέρ"
                    onChange={(e) =>
                      handleSelectChange("motorType", e.target.value)
                    }
                  >
                    {motorTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Βήμα"
                  name="steps"
                  variant="outlined"
                  value={formData.steps}
                  onChange={handleInputChange}
                  placeholder="π.χ. 14-16-18"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ισχύς (kW)"
                  name="kw"
                  type="number"
                  variant="outlined"
                  value={formData.kw}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ισχύς (HP)"
                  name="hp"
                  type="number"
                  variant="outlined"
                  value={formData.hp}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="primary" aria-label="προσθήκη φωτογραφίας">
                    <CameraIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    Προσθήκη φωτογραφίας συσκευής
                  </Typography>
                </Box>
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
                  label="Περιγραφή Βλάβης"
                  name="issueDescription"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={formData.issueDescription}
                  onChange={handleInputChange}
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
                  label="Εκτιμώμενο Κόστος (€)"
                  name="estimatedCost"
                  type="number"
                  variant="outlined"
                  value={formData.estimatedCost}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Εκτιμώμενη Ημερομηνία Παράδοσης"
                  name="estimatedCompletionDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.estimatedCompletionDate}
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
            <Box>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                sx={{ mr: 2 }}
              >
                Εκτύπωση Δελτίου
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Αποθήκευση
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          Η επισκευή καταχωρήθηκε με επιτυχία!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateRepairForm;

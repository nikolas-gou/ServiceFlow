import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@mui/icons-material';
import { Customer } from '../../Models/Customer';
import { Repair } from '../../Models/Repair';
import { CustomerRepository } from '../../Repositories/CustomerRepository';
import { MotorRepository } from '../../Repositories/MotorRepository';
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
} from '../../Models/Motor';
import { common_faults, common_faults_translated } from '../../Models/CommonFault';
import { RepairRepository } from '../../Repositories/RepairRepository';

import WindingsContentFields from './parts/WindingsContentFields';
import TypeOfStepField from './parts/TypeOfStepField';

function CreateRepairForm(props) {
  const [tabValue, setTabValue] = useState(0);
  const [repair, setRepair] = useState(new Repair());
  const [selectedCommonFault, setSelectedCommonFault] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [motorBrands, setMotorBrands] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Αρχικοποίηση των δεδομένων φόρμας
  useEffect(() => {
    loadCustomers();
    loadMotorBrands();
  }, []);

  // Φόρτωση πελατών από το repository
  const loadCustomers = async () => {
    try {
      const data = await CustomerRepository.getAll();
      setCustomers(data || []);
    } catch (err) {
      console.error('Σφάλμα φόρτωσης πελατών:', err);
      setCustomers([]);
    }
  };

  const loadMotorBrands = async () => {
    try {
      const data = await MotorRepository.getAllBrands();
      setMotorBrands(data || []);
    } catch (err) {
      console.error('Σφάλμα φόρτωσης Κινητήρων:', err);
      setCustomers([]);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Γενική διαχείριση αλλαγών για τα απλά πεδία
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Μετατροπή σε κεφαλαία αν είναι το πεδίο customer.name
    const processedValue =
      name === 'customer.name' || name === 'motor.manufacturer' ? value.toUpperCase() : value;

    if (name.includes('.')) {
      // Διαχείριση ένθετων πεδίων (π.χ. customer.name, motor.manufacturer)
      const [parent, child] = name.split('.');

      if (child === 'hp') {
        // Όταν αλλάζει η τιμή hp, θέτουμε το hp και υπολογίζουμε το kw
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            hp: processedValue,
            kw: (parseFloat(processedValue) * 0.745699872).toFixed(2), // Μετατροπή hp σε kw
          },
        }));
      } else if (child === 'kw') {
        // Όταν αλλάζει η τιμή kw, θέτουμε το kw και υπολογίζουμε το hp
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            kw: processedValue,
            hp: (parseFloat(processedValue) / 0.745699872).toFixed(2), // Μετατροπή kw σε hp
          },
        }));
      } else {
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: processedValue,
          },
        }));
      }

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
        [name]: processedValue,
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

    // αν επιλεξει καποιον που υπαρχει παρε ολα τα στοιχεια
    if (customers.map((customer) => customer.name).includes(newValue)) {
      setRepair((prev) => ({
        ...prev,
        customer: customers.find((customer) => customer.name == newValue),
      }));
    } else {
      setRepair((prev) => ({
        ...prev,
        customer: new Customer(),
      }));
    }

    // Καθαρισμός τυχόν σφαλμάτων
    if (errors['customer.name']) {
      setErrors((prev) => ({
        ...prev,
        ['customer.name']: null,
      }));
    }
  };

  // Για το Autocomplete του manufacturer
  const handleManufacturerChange = (event, newValue) => {
    setRepair((prev) => ({
      ...prev,
      motor: {
        ...prev.motor,
        manufacturer: newValue,
      },
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (errors['motor.manufacturer']) {
      setErrors((prev) => ({
        ...prev,
        ['motor.manufacturer']: null,
      }));
    }
  };

  // Προσθήκη συνηθισμένων θεμάτων στην περιγραφή
  const handleAddCommonIssue = (common_fault) => {
    const updatedDescription = repair.description
      ? `${repair.description}\n- ${common_faults_translated[common_fault.id - 1].name}`
      : `- ${common_faults_translated[common_fault.id - 1].name}`;

    setRepair((prev) => ({
      ...prev,
      description: updatedDescription,
    }));

    // Προσθήκη του ID της βλάβης στον πίνακα, αν δεν υπάρχει ήδη
    setSelectedCommonFault((prev) => {
      if (!prev.includes(common_fault.id)) {
        return [...prev, common_fault.id];
      }
      return prev;
    });

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
    let errorMsg = '';

    switch (tabValue) {
      case 0: // Βασικά Στοιχεία
        if (!repair.customer?.name) {
          newErrors['customer.name'] = 'Το πεδίο Πελάτης είναι υποχρεωτικό';
          errorMsg = 'Ξέχασες να συμπληρώσεις το πεδίο Πελάτης';
          isValid = false;
        }
        if (!repair.motor?.manufacturer) {
          newErrors['motor.manufacturer'] = 'Η επιλογή Μάρκας είναι υποχρεωτική';
          errorMsg = errorMsg || 'Ξέχασες να επιλέξεις Μάρκα';
          isValid = false;
        }
        if (!repair.customer?.phone) {
          newErrors['customer.phone'] = 'Το πεδίο Τηλέφωνο είναι υποχρεωτικό';
          errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο';
          isValid = false;
        }
        break;
      case 2: // Περιγραφή Βλάβης
        if (!repair.description) {
          newErrors.description = 'Η περιγραφή βλάβης είναι υποχρεωτική';
          errorMsg = 'Ξέχασες να συμπληρώσεις την περιγραφή βλάβης';
          isValid = false;
        }
        break;
      case 3: // Κόστος & Παράδοση
        if (!repair.cost) {
          newErrors.cost = 'Το εκτιμώμενο κόστος είναι υποχρεωτικό';
          errorMsg = 'Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος';
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
    let errorMsg = '';

    // Έλεγχος Βασικών Στοιχείων
    if (!repair.customer?.name) {
      allErrors['customer.name'] = 'Το πεδίο Πελάτης είναι υποχρεωτικό';
      errorMsg = 'Ξέχασες να συμπληρώσεις το πεδίο Πελάτης';
      isValid = false;
    }
    if (!repair.motor?.manufacturer) {
      allErrors['motor.manufacturer'] = 'Η επιλογή Μάρκας είναι υποχρεωτική';
      errorMsg = errorMsg || 'Ξέχασες να επιλέξεις Μάρκα';
      isValid = false;
    }
    if (!repair.customer?.phone) {
      allErrors['customer.phone'] = 'Το πεδίο Τηλέφωνο είναι υποχρεωτικό';
      errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο';
      isValid = false;
    }

    // Έλεγχος Περιγραφής Βλάβης
    if (!repair.description) {
      allErrors.description = 'Η περιγραφή βλάβης είναι υποχρεωτική';
      errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις την περιγραφή βλάβης';
      isValid = false;
    }

    // Έλεγχος Κόστους
    if (!repair.cost) {
      allErrors.cost = 'Το εκτιμώμενο κόστος είναι υποχρεωτικό';
      errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος';
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
      const dataApi = new Repair(repair);

      createNewRepair(dataApi);
      setSuccessAlert(true);
      props.onSubmitSuccess();
    } else {
      setErrorAlert(true);
    }
  };

  // Φόρτωση πελατών από το repository
  const createNewRepair = async (dataApi) => {
    try {
      const response = await RepairRepository.createNewRepair({
        repair: dataApi.toApiFormat(),
        customer: dataApi.customer.toApiFormat(),
        motor: dataApi.motor.toApiFormat(),
        common_faults: selectedCommonFault,
      });
      setRepair(response || []);
    } catch (err) {
      console.error('Σφάλμα Δημιουργίας Επισκευής:', err);
      setRepair([]);
    }
  };

  // Τίτλος κουμπιού ανάλογα με την καρτέλα
  const buttonText = tabValue === 3 ? 'Αποθήκευση' : 'Επόμενο Βήμα';
  const buttonIcon = tabValue === 3 ? <SaveIcon /> : <NavigateNextIcon />;

  // Έλεγχος σφαλμάτων για κάθε πεδίο
  const hasError = (fieldName) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName) => errors[fieldName] || '';

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 3, color: '#1976d2' }}>
        Καταχώρηση Νέας Επισκευής
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="repair form tabs">
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
                options={customers.map((customer) => customer.name) || []}
                value={repair.customer?.name || ''}
                onChange={handleCustomerChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Πελάτης"
                    name="customer.name"
                    variant="outlined"
                    onChange={(e) => handleInputChange(e)}
                    error={hasError('customer.name')}
                    helperText={getErrorMessage('customer.name')}
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
                  value={repair.customer?.type || ''}
                  label="Τύπος"
                  onChange={handleInputChange}
                >
                  <MenuItem value="individual">Ιδιώτης</MenuItem>
                  <MenuItem value="factory">Εργοστάσιο</MenuItem>
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
                value={repair.customer?.phone || ''}
                onChange={handleInputChange}
                error={hasError('customer.phone')}
                helperText={getErrorMessage('customer.phone')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="customer.email"
                variant="outlined"
                value={repair.customer?.email || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={motorBrands || []}
                value={repair.motor?.manufacturer || ''}
                onChange={handleManufacturerChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Μάρκα"
                    name="motor.manufacturer"
                    variant="outlined"
                    onChange={(e) => handleInputChange(e)}
                    error={hasError('motor.manufacturer')}
                    helperText={getErrorMessage('motor.manufacturer')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Τύπος Κινητήρα</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  name="motor.typeOfMotor"
                  value={repair.motor?.typeOfMotor || ''}
                  label="Τύπος Κινητήρα"
                  onChange={handleInputChange}
                >
                  {typeOfMotor.map((value, index) => {
                    return (
                      <MenuItem key={value} value={value}>
                        {typeOfMotor_translated[index]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ημερομηνία Παραλαβής"
                name="isArrived"
                type="date"
                value={repair?.isArrived || ''}
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
                name="motor.serialNumber"
                variant="outlined"
                value={repair.motor?.serialNumber || ''}
                onChange={handleInputChange}
                placeholder="π.χ. 3568"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Φάσεις Κινητήρα</InputLabel>
                <Select
                  name="motor.typeOfVolt"
                  value={repair.motor?.typeOfVolt || ''}
                  label="Φάσεις Κινητήρα"
                  onChange={handleInputChange}
                >
                  {typeOfVolt.map((type, index) => {
                    // * ενα converter για translated
                    return (
                      <MenuItem key={type} value={type}>
                        {typeOfVolt_translated[index]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {/* template motor fields (step, spiral, crossSection) */}
            <Grid item xs={12} sm={3}>
              <TypeOfStepField repair={repair} handleInputChange={handleInputChange} />
            </Grid>

            {/* parts: Βοηθητικο component γαι μισο-μισο/ολ, Κ, Β */}
            <Grid item xs={12} sm={12} fullWidth>
              <WindingsContentFields repair={repair} handleInputChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Σύνδεση</InputLabel>
                <Select
                  name="motor.connectionism"
                  value={repair.motor?.connectionism || ''}
                  label="Σύνδεση"
                  onChange={handleInputChange}
                >
                  {connectionism_types.map((type, index) => {
                    // * ενα converter για translated
                    return (
                      <MenuItem key={type} value={type.toLowerCase()}>
                        {connectionism_types_translated[index]}
                      </MenuItem>
                    );
                  })}
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
                value={repair.motor?.kw || ''}
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
                value={repair.motor?.hp || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Τάση (volt)</InputLabel>
                <Select
                  name="motor.volt"
                  value={repair.motor?.volt || ''}
                  label="Τάση (volt)"
                  onChange={handleInputChange}
                >
                  {volt_types.map((type, index) => {
                    // * ενα converter για translated
                    return (
                      <MenuItem key={type} value={type}>
                        {volt_types_translated[index]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Στροφές (rpm)</InputLabel>
                <Select
                  name="motor.rpm"
                  value={repair.motor?.rpm || ''}
                  label="Στροφές (rpm)"
                  onChange={handleInputChange}
                >
                  {rpm_types.map((type, index) => {
                    // * ενα converter για translated
                    return (
                      <MenuItem key={type} value={type}>
                        {rpm_types_translated[index]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Πόλοι</InputLabel>
                <Select
                  name="motor.poles"
                  value={repair.motor?.poles || ''}
                  label="Πόλοι"
                  onChange={handleInputChange}
                >
                  {poles_types.map((type, index) => {
                    // * ενα converter για translated
                    return (
                      <MenuItem key={type} value={type}>
                        {poles_types_translated[index]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
                {common_faults.map((common_fault) => (
                  <Button
                    key={common_fault.id}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                    onClick={() => handleAddCommonIssue(common_fault)}
                  >
                    {common_faults_translated[common_fault?.id - 1]?.name}
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
                value={repair.description || ''}
                onChange={handleInputChange}
                error={hasError('description')}
                helperText={getErrorMessage('description')}
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
                value={repair.cost || ''}
                onChange={handleInputChange}
                error={hasError('cost')}
                helperText={getErrorMessage('cost')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Εκτιμώμενη Ημερομηνία Παράδοσης"
                name="estimatedIsComplete"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={repair?.estimatedIsComplete || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Form Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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

      {/* Success Alert */}
      <Snackbar open={successAlert} autoHideDuration={6000} onClose={() => setSuccessAlert(false)}>
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          Η επισκευή καταχωρήθηκε με επιτυχία!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar open={errorAlert} autoHideDuration={6000} onClose={() => setErrorAlert(false)}>
        <Alert onClose={() => setErrorAlert(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateRepairForm;

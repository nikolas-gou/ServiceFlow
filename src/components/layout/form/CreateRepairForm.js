import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Snackbar, Alert } from '@mui/material';
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@mui/icons-material';
import { Repair } from '../../Models/Repair';
import { RepairRepository } from '../../Repositories/RepairRepository';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { BasicInfo } from './parts/BasicInfo';
import { TechnicalCharacteristics } from './parts/TechnicalCharacteristics';
import { DetailsWinding } from './parts/DetailsWinding';
import { Issues } from './parts/Issues';
import { CostAndDelivery } from './parts/CostAndDelivery';
import { useRepairs } from '../../../context/RepairsContext';

function CreateRepairForm(props) {
  const [tabValue, setTabValue] = useState(0);
  const [repair, setRepair] = useState(new Repair());
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  // context
  const { addRepair } = useRepairs();

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
        // if (!repair.customer?.phone) {
        //   newErrors['customer.phone'] = 'Το πεδίο Τηλέφωνο είναι υποχρεωτικό';
        //   errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο';
        //   isValid = false;
        // }
        break;
      // case 3: // Περιγραφή Βλάβης
      //   if (!repair.description) {
      //     newErrors.description = 'Η περιγραφή βλάβης είναι υποχρεωτική';
      //     errorMsg = 'Ξέχασες να συμπληρώσεις την περιγραφή βλάβης';
      //     isValid = false;
      //   }
      //   break;
      // case 4: // Κόστος & Παράδοση
      //   if (!repair.cost) {
      //     newErrors.cost = 'Το εκτιμώμενο κόστος είναι υποχρεωτικό';
      //     errorMsg = 'Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος';
      //     isValid = false;
      //   }
      //   break;
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
    // if (!repair.customer?.phone) {
    //   allErrors['customer.phone'] = 'Το πεδίο Τηλέφωνο είναι υποχρεωτικό';
    //   errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το πεδίο Τηλέφωνο';
    //   isValid = false;
    // }

    // // Έλεγχος Περιγραφής Βλάβης
    // if (!repair.description) {
    //   allErrors.description = 'Η περιγραφή βλάβης είναι υποχρεωτική';
    //   errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις την περιγραφή βλάβης';
    //   isValid = false;
    // }

    // // Έλεγχος Κόστους
    // if (!repair.cost) {
    //   allErrors.cost = 'Το εκτιμώμενο κόστος είναι υποχρεωτικό';
    //   errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το εκτιμώμενο κόστος';
    //   isValid = false;
    // }

    setErrors(allErrors);
    setErrorMessage(errorMsg);

    return isValid;
  };

  const handleNextStep = () => {
    if (validateCurrentTab()) {
      if (tabValue < 4) {
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
        repair: dataApi,
        customer: dataApi.customer,
        motor: dataApi.motor,
      });

      setRepair(response.data || []);
      addRepair(response.data || {});
    } catch (err) {
      console.error('Σφάλμα Δημιουργίας Επισκευής:', err);
      setRepair([]);
    }
  };

  // Τίτλος κουμπιού ανάλογα με την καρτέλα
  const buttonText = tabValue === 4 ? 'Αποθήκευση' : 'Επόμενο Βήμα';
  const buttonIcon = tabValue === 4 ? <SaveIcon /> : <NavigateNextIcon />;

  // Έλεγχος σφαλμάτων για κάθε πεδίο
  const hasError = (fieldName) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName) => errors[fieldName] || '';

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 3, color: '#1976d2' }}>
        Καταχώρηση Νέας Επισκευής
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Stepper activeStep={tabValue} onChange={handleTabChange} alternativeLabel>
          {[
            'Βασικά Στοιχεία',
            'Τεχνικά Χαρακτηριστικά',
            'Στοιχεία Κινητήρα',
            'Περιγραφή Βλάβης',
            'Κόστος & Παράδοση',
          ].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Tab 1: Βασικά Στοιχεία */}
        <Box hidden={tabValue !== 0} sx={{ pb: 3 }}>
          <BasicInfo
            repair={repair}
            setRepair={setRepair}
            handleInputChange={handleInputChange}
            hasError={hasError}
            errors={errors}
            setErrors={setErrors}
            getErrorMessage={getErrorMessage}
          />
        </Box>

        {/* Tab 2: Τεχνικά Χαρακτηριστικά */}
        <Box hidden={tabValue !== 1} sx={{ pb: 3 }}>
          <TechnicalCharacteristics
            repair={repair}
            setRepair={setRepair}
            handleInputChange={handleInputChange}
          />
        </Box>

        {/* Tab 3: Στοιχεια Πειρελιξης */}
        <Box hidden={tabValue !== 2} sx={{ pb: 3 }}>
          <DetailsWinding
            repair={repair}
            setRepair={setRepair}
            handleInputChange={handleInputChange}
          />
        </Box>

        {/* Tab 4: Περιγραφή Βλάβης */}
        <Box hidden={tabValue !== 3} sx={{ pb: 3 }}>
          <Issues
            repair={repair}
            setRepair={setRepair}
            handleInputChange={handleInputChange}
            hasError={hasError}
            errors={errors}
            setErrors={setErrors}
            getErrorMessage={getErrorMessage}
          />
        </Box>

        {/* Tab 4: Κόστος & Παράδοση */}
        <Box hidden={tabValue !== 4} sx={{ pb: 3 }}>
          <CostAndDelivery
            repair={repair}
            handleInputChange={handleInputChange}
            hasError={hasError}
            getErrorMessage={getErrorMessage}
          />
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
              endIcon={buttonIcon}
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

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  CircleOutlined as CircleOutlinedIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ElectricBolt as ElectricBoltIcon,
  BugReport as BugReportIcon,
  Euro as EuroIcon,
  Image as ImageIcon,
  Cable as CableIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Repair } from '../../Models/Repair';
import { RepairRepository } from '../../Repositories/RepairRepository';
import StepLabel from '@mui/material/StepLabel';
import { BasicInfo } from './parts/BasicInfo';
import { TechnicalCharacteristics } from './parts/TechnicalCharacteristics';
import { DetailsWinding } from './parts/DetailsWinding';
import { Issues } from './parts/Issues';
import { CostAndDelivery } from './parts/CostAndDelivery';
import { useRepairs } from '../../../context/RepairsContext';
import StyledSnackbar from '../../common/StyledSnackbar';
import StyledButton from '../../common/StyledButton';
import LoadingSave from '../../common/LoadingSave';

import { StyledStepper, StyledStep, StyledTabContent } from '../../common/styled/CommonStepper';
import { Connection } from '../../Models/Connection';
import { useConnections } from '../../../context/ConnectionsContext';
import { BasicInfoConnection } from './parts/connection/BasicInfoConnection';

// Styled Components
const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2),
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2.5, 0),
  marginTop: theme.spacing(1.5),
  borderTop: '1px solid rgba(30, 60, 114, 0.1)',
  background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)',
  borderRadius: '0 0 12px 12px',
  margin: theme.spacing(0, -2.5, -2.5, -2.5),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2, 0),
    margin: theme.spacing(0, -2, -2, -2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function CreateConnectionForm(props) {
  const [tabValue, setTabValue] = useState(0);

  const [repair, setRepair] = useState(new Repair());
  const [connection, setConnection] = useState(new Connection());

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // context
  const { addRepair } = useRepairs();

  // Γενική διαχείριση αλλαγών για τα απλά πεδία
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value }, 'connection: ', connection);

    if (name.includes('.')) {
      // Διαχείριση ένθετων πεδίων (π.χ. customer.name, motor.manufacturer)
      const [parent, child] = name.split('.');

      setConnection((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      // Διαχείριση απλών πεδίων
      setConnection((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Καθαρισμός τυχόν σφαλμάτων
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (validateAllTabs()) {
      setIsSubmitting(true);
      try {
        const dataApi = new Repair(repair);
        await createNewRepair(dataApi);
        setSuccessAlert(true);

        // Κλείσιμο του modal μετά από μικρή καθυστέρηση για να δει ο χρήστης την επιτυχία
        setTimeout(() => {
          props.onSubmitSuccess();
        }, 1500);
      } catch (error) {
        setErrorMessage('Σφάλμα κατά την αποθήκευση. Παρακαλώ δοκιμάστε ξανά.');
        setErrorAlert(true);
      } finally {
        setIsSubmitting(false);
      }
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

      // Βεβαιώνουμε ότι το response είναι object και όχι array
      if (Array.isArray(response)) {
        setRepair(response[0] || {});
        addRepair(response[0] || {});
      } else {
        setRepair(response || {});
        addRepair(response || {});
      }
    } catch (err) {
      console.error('Σφάλμα Δημιουργίας Επισκευής:', err);
      throw err; // Re-throw για τη διαχείριση στο handleSubmit
    }
  };

  // Τίτλος κουμπιού ανάλογα με την καρτέλα
  const buttonText = tabValue === 4 ? 'Αποθήκευση' : 'Επόμενο Βήμα';
  const buttonIcon = tabValue === 4 ? <SaveIcon /> : <NavigateNextIcon />;

  // Έλεγχος σφαλμάτων για κάθε πεδίο
  const hasError = (fieldName) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName) => errors[fieldName] || '';

  const stepLabels = ['Βασικά Στοιχεία', 'Μετάδοση Φωτογραφίας'];

  // Εικονίδια για κάθε βήμα
  const stepIcons = [
    CableIcon, // Βασικά Στοιχεία
    ImageIcon, // Τεχνικά Χαρακτηριστικά
  ];

  // Συνάρτηση που επιστρέφει το σωστό εικονίδιο ανάλογα με την κατάσταση
  const getStepIcon = (stepIndex, activeStep) => {
    const IconComponent = stepIcons[stepIndex];

    if (stepIndex < activeStep) {
      // Συμπληρωμένο βήμα - Check icon με πράσινο χρώμα
      return <CheckCircleIcon sx={{ fontSize: 'inherit' }} />;
    } else if (stepIndex === activeStep) {
      // Τρέχον βήμα - Το θεματικό εικονίδιο με PlayArrow στυλ
      return <IconComponent sx={{ fontSize: 'inherit' }} />;
    } else {
      // Επόμενο βήμα - Το θεματικό εικονίδιο με μειωμένη διαφάνεια
      return <IconComponent sx={{ fontSize: 'inherit', opacity: 0.7 }} />;
    }
  };

  return (
    <FormContainer>
      {/* Loading Save Overlay */}
      <LoadingSave show={isSubmitting} message="Αποθήκευση Σύνδεσης..." />

      <StyledStepper activeStep={tabValue} alternativeLabel>
        {stepLabels.map((label, index) => (
          <StyledStep key={label}>
            <StepLabel
              icon={getStepIcon(index, tabValue)}
              sx={{
                cursor: 'default',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {label}
            </StepLabel>
          </StyledStep>
        ))}
      </StyledStepper>

      <form onSubmit={handleSubmit}>
        {/* Tab Contents με Animation */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Tab 1: Βασικά Στοιχεία */}
          <StyledTabContent
            hidden={tabValue !== 0}
            sx={{
              transform:
                tabValue === 0
                  ? 'translateX(0)'
                  : tabValue > 0
                  ? 'translateX(-20px)'
                  : 'translateX(20px)',
              opacity: tabValue === 0 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 0 && (
              <BasicInfoConnection
                connection={connection}
                setConnection={setConnection}
                handleInputChange={handleInputChange}
                hasError={hasError}
                errors={errors}
                setErrors={setErrors}
                getErrorMessage={getErrorMessage}
              />
            )}
          </StyledTabContent>

          {/* Tab 2: Τεχνικά Χαρακτηριστικά */}
          <StyledTabContent
            hidden={tabValue !== 1}
            sx={{
              transform:
                tabValue === 1
                  ? 'translateX(0)'
                  : tabValue > 1
                  ? 'translateX(-20px)'
                  : 'translateX(20px)',
              opacity: tabValue === 1 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 1 && (
              <TechnicalCharacteristics
                repair={repair}
                setRepair={setRepair}
                handleInputChange={handleInputChange}
              />
            )}
          </StyledTabContent>

          {/* Tab 3: Στοιχεια Πειρελιξης */}
          <StyledTabContent
            hidden={tabValue !== 2}
            sx={{
              transform:
                tabValue === 2
                  ? 'translateX(0)'
                  : tabValue > 2
                  ? 'translateX(-20px)'
                  : 'translateX(20px)',
              opacity: tabValue === 2 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 2 && (
              <DetailsWinding
                repair={repair}
                setRepair={setRepair}
                handleInputChange={handleInputChange}
              />
            )}
          </StyledTabContent>

          {/* Tab 4: Περιγραφή Βλάβης */}
          <StyledTabContent
            hidden={tabValue !== 3}
            sx={{
              transform:
                tabValue === 3
                  ? 'translateX(0)'
                  : tabValue > 3
                  ? 'translateX(-20px)'
                  : 'translateX(20px)',
              opacity: tabValue === 3 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 3 && (
              <Issues
                repair={repair}
                setRepair={setRepair}
                handleInputChange={handleInputChange}
                hasError={hasError}
                errors={errors}
                setErrors={setErrors}
                getErrorMessage={getErrorMessage}
              />
            )}
          </StyledTabContent>

          {/* Tab 5: Κόστος & Παράδοση */}
          <StyledTabContent
            hidden={tabValue !== 4}
            sx={{
              transform: tabValue === 4 ? 'translateX(0)' : 'translateX(20px)',
              opacity: tabValue === 4 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 4 && (
              <CostAndDelivery
                repair={repair}
                handleInputChange={handleInputChange}
                hasError={hasError}
                getErrorMessage={getErrorMessage}
              />
            )}
          </StyledTabContent>
        </Box>

        {/* Form Actions */}
        <NavigationContainer>
          {tabValue > 0 ? (
            <StyledButton
              variant="outlined"
              text="Προηγούμενο Βήμα"
              startIcon={<NavigateBeforeIcon />}
              onClick={handlePreviousStep}
              disabled={isSubmitting}
            />
          ) : (
            <Box />
          )}

          <StyledButton
            variant="contained"
            color="primary"
            text={buttonText}
            endIcon={buttonIcon}
            loading={isSubmitting && tabValue === 4}
            loadingText="Αποθήκευση..."
            onClick={handleNextStep}
            disabled={isSubmitting}
            sx={{
              position: 'relative',
              '&.Mui-disabled': {
                background: 'linear-gradient(135deg, #90a4ae 0%, #b0bec5 100%)',
                color: 'white',
                opacity: 0.7,
              },
            }}
          />
        </NavigationContainer>
      </form>

      {/* Enhanced Success Alert */}
      <StyledSnackbar
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        severity="success"
        title="Επιτυχής Καταχώρηση!"
        message="Η επισκευή καταχωρήθηκε με επιτυχία στο σύστημα"
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Enhanced Error Alert */}
      <StyledSnackbar
        open={errorAlert}
        onClose={() => setErrorAlert(false)}
        severity="error"
        title="Σφάλμα Καταχώρησης"
        message={errorMessage}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </FormContainer>
  );
}

export default CreateConnectionForm;

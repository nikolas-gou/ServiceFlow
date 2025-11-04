import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ElectricBolt as ElectricBoltIcon,
  BugReport as BugReportIcon,
  Euro as EuroIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
import Photos from './parts/Photos';
import { useRepairs } from '../../../context/RepairsContext';
import StyledSnackbar from '../../common/StyledSnackbar';
import StyledButton from '../../common/StyledButton';
import LoadingSave from '../../common/LoadingSave';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ImageRepository } from '../../Repositories/ImageRepository';
import { uploadSize } from '../../Models/Image';

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

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2, 1.5),
  background: 'linear-gradient(135deg, #f8fafb 0%, #ffffff 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(30, 60, 114, 0.08)',
  boxShadow: '0 2px 8px rgba(30, 60, 114, 0.06)',
  [theme.breakpoints.down('lg')]: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5, 1),
  },
  '& .MuiStepConnector-root': {
    top: '20px',
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    [theme.breakpoints.down('lg')]: {
      top: '18px',
      left: 'calc(-50% + 18px)',
      right: 'calc(50% + 18px)',
    },
    '& .MuiStepConnector-line': {
      height: '3px',
      border: 0,
      background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
      borderRadius: '2px',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.3), transparent)',
        animation: 'shimmer 2s infinite',
      },
    },
  },
  '& .MuiStepConnector-active .MuiStepConnector-line': {
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
  },
  '& .MuiStepConnector-completed .MuiStepConnector-line': {
    background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 50%, #4caf50 100%)',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const StyledStep = styled(Step)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  '& .MuiStepLabel-iconContainer': {
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '& .MuiStepIcon-root': {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid #e3f2fd',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
      color: '#90a4ae',
      fontSize: '20px',
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiStepIcon-text': {
        fill: '#90a4ae',
        fontWeight: 600,
      },
      // Styling για custom εικονίδια
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
        color: 'inherit',
      },
      [theme.breakpoints.down('lg')]: {
        width: '36px',
        height: '36px',
        fontSize: '16px',
        border: '2px solid #e3f2fd',
        '& .MuiSvgIcon-root': {
          fontSize: '16px',
        },
      },
    },
  },
  '& .MuiStepLabel-active .MuiStepIcon-root': {
    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    borderColor: '#1976d2',
    color: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.4)',
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
    [theme.breakpoints.down('lg')]: {
      transform: 'scale(1.05)',
      boxShadow: '0 3px 12px rgba(25, 118, 210, 0.3)',
    },
  },
  '& .MuiStepLabel-completed .MuiStepIcon-root': {
    background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
    borderColor: '#4caf50',
    color: 'white',
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  '& .MuiStepLabel-label': {
    marginTop: theme.spacing(0.8),
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#546e7a',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    '&.Mui-active': {
      color: '#1976d2',
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: '#4caf50',
      fontWeight: 600,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.75rem',
      marginTop: theme.spacing(0.6),
    },
  },
}));

const TabContent = styled(Box)(({ theme }) => ({
  minHeight: '320px',
  padding: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(30, 60, 114, 0.08)',
  boxShadow: '0 2px 8px rgba(30, 60, 114, 0.06)',
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
    borderRadius: '12px 12px 0 0',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: '280px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
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

function CreateRepairForm(props) {
  const { onSubmitSuccess, onDirtyChange } = props;
  const [tabValue, setTabValue] = useState(0);
  const [repair, setRepair] = useState(new Repair());
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const hasAnnouncedDirtyRef = useRef(false);
  // Θα οριστεί μετά το mount ώστε να ταιριάζει με το αρχικό state
  const initialSnapshotRef = useRef('');

  const MB_TO_BYTES = 1000000;
  const MAX_UPLOAD_SIZE_MB = 10;

  // context
  const { addRepair } = useRepairs();

  // Καταγραφή του αρχικού snapshot μετά το αρχικό render,
  // ώστε να μην θεωρηθεί "dirty" χωρίς αλλαγές από τον χρήστη
  useEffect(() => {
    try {
      initialSnapshotRef.current = JSON.stringify(repair);
    } catch (_) {}
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Γενική διαχείριση αλλαγών για τα απλά πεδία
  const handleInputChange = (e) => {
    if (!isDirty) {
      setIsDirty(true);
      if (onDirtyChange && !hasAnnouncedDirtyRef.current) {
        hasAnnouncedDirtyRef.current = true;
        onDirtyChange(true);
      }
    }
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
            kw: processedValue > 0 ? (parseFloat(processedValue) * 0.745699872).toFixed(2) : null, // Μετατροπή hp σε kw
          },
        }));
      } else if (child === 'kw') {
        // Όταν αλλάζει η τιμή kw, θέτουμε το kw και υπολογίζουμε το hp
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            kw: processedValue,
            hp: processedValue > 0 ? (parseFloat(processedValue) / 0.745699872).toFixed(2) : null, // Μετατροπή kw σε hp
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

        break;
      case 4: // Φωτογραφίες
        if (!validateImageSize(repair.images)) {
          newErrors['images'] = 'Το μέγεθος των φωτογραφιών δεν πρέπει να υπερβαίνει τα 10MB';
          errorMsg = 'Το μέγεθος των φωτογραφιών δεν πρέπει να υπερβαίνει τα 10MB';
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
    if (!validateImageSize(repair.images)) {
      allErrors['images'] = 'Το μέγεθος των φωτογραφιών δεν πρέπει να υπερβαίνει τα 10MB';
      errorMsg = 'Το μέγεθος των φωτογραφιών δεν πρέπει να υπερβαίνει τα 10MB';
      isValid = false;
    }
    setErrors(allErrors);
    setErrorMessage(errorMsg);

    return isValid;
  };

  const handleNextStep = () => {
    if (validateCurrentTab()) {
      if (tabValue < 5) {
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
          setIsDirty(false);
          hasAnnouncedDirtyRef.current = false;
          if (onDirtyChange) onDirtyChange(false);
          onSubmitSuccess();
        }, 1500);
      } catch (error) {
        // Χρήση του error message από το backend αν υπάρχει
        const errorMessage =
          error.message || 'Σφάλμα κατά την αποθήκευση. Παρακαλώ δοκιμάστε ξανά.';
        setErrorMessage(errorMessage);
        setErrorAlert(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrorAlert(true);
    }
  };

  // Αυτόματος εντοπισμός αλλαγών (πιάνει και Autocomplete/custom handlers)
  useEffect(() => {
    try {
      const current = JSON.stringify(repair);
      if (!isDirty && current !== initialSnapshotRef.current) {
        setIsDirty(true);
        if (onDirtyChange && !hasAnnouncedDirtyRef.current) {
          hasAnnouncedDirtyRef.current = true;
          onDirtyChange(true);
        }
      }
    } catch (_) {
      // αν υπάρξουν κυκλικές αναφορές, αγνόησέ το
    }
  }, [repair, isDirty, onDirtyChange]);

  const createNewRepair = async (dataApi) => {
    try {
      // Δημιουργία Repair
      const response = await RepairRepository.createNewRepair({ repair: dataApi });

      // Upload φωτογραφιών - Αν υπάρχουν
      if (dataApi.images?.length > 0) {
        const filesToUpload = dataApi.images.map((image) => image.file);

        await ImageRepository.uploadImages(filesToUpload, response.id);
      }
      // 3. Fetch το repair ΞΑΝΑ για να πάρουμε τις φωτογραφίες
      const updatedRepair = await RepairRepository.getRepairById(response.id);

      // Προσθήκη στο state και context με τις φωτογραφίες
      setRepair(updatedRepair);
      addRepair(updatedRepair);
    } catch (err) {
      throw err; // Re-throw για τη διαχείριση στο handleSubmit
    }
  };

  // Τίτλος κουμπιού ανάλογα με την καρτέλα
  const buttonText = tabValue === 5 ? 'Αποθήκευση' : 'Επόμενο Βήμα';
  const buttonIcon = tabValue === 5 ? <SaveIcon /> : <NavigateNextIcon />;

  // Έλεγχος σφαλμάτων για κάθε πεδίο
  const hasError = (fieldName) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName) => errors[fieldName] || '';

  const stepLabels = [
    'Βασικά Στοιχεία',
    'Τεχνικά Χαρακτηριστικά',
    'Στοιχεία Κινητήρα',
    'Περιγραφή Βλάβης',
    'Φωτογραφίες',
    'Κόστος & Παράδοση',
  ];

  // Εικονίδια για κάθε βήμα
  const stepIcons = [
    PersonIcon, // Βασικά Στοιχεία
    SettingsIcon, // Τεχνικά Χαρακτηριστικά
    ElectricBoltIcon, // Στοιχεία Κινητήρα
    BugReportIcon, // Περιγραφή Βλάβης
    AddAPhotoIcon, // Φωτογραφίες
    EuroIcon, // Κόστος & Παράδοση
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

  const validateImageSize = (images) => {
    const size = uploadSize(images) / MB_TO_BYTES;
    return size <= MAX_UPLOAD_SIZE_MB;
  };

  return (
    <FormContainer>
      {/* Loading Save Overlay */}
      <LoadingSave show={isSubmitting} message="Αποθήκευση επισκευής..." />

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
          <TabContent
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
              <BasicInfo
                repair={repair}
                setRepair={setRepair}
                handleInputChange={handleInputChange}
                hasError={hasError}
                errors={errors}
                setErrors={setErrors}
                getErrorMessage={getErrorMessage}
              />
            )}
          </TabContent>

          {/* Tab 2: Τεχνικά Χαρακτηριστικά */}
          <TabContent
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
          </TabContent>

          {/* Tab 3: Στοιχεια Πειρελιξης */}
          <TabContent
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
          </TabContent>

          {/* Tab 4: Περιγραφή Βλάβης */}
          <TabContent
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
          </TabContent>

          {/* Tab 5: Φωτογραφίες */}
          <TabContent
            hidden={tabValue !== 4}
            sx={{
              transform: tabValue === 4 ? 'translateX(0)' : 'translateX(20px)',
              opacity: tabValue === 4 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 4 && (
              <Photos
                repair={repair}
                setRepair={setRepair}
                onError={(errorMsg) => {
                  setErrorMessage(errorMsg);
                  setErrorAlert(true);
                }}
              />
            )}
          </TabContent>

          {/* Tab 6: Κόστος & Παράδοση */}
          <TabContent
            hidden={tabValue !== 5}
            sx={{
              transform: tabValue === 5 ? 'translateX(0)' : 'translateX(20px)',
              opacity: tabValue === 5 ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          >
            {tabValue === 5 && (
              <CostAndDelivery
                repair={repair}
                handleInputChange={handleInputChange}
                hasError={hasError}
                getErrorMessage={getErrorMessage}
              />
            )}
          </TabContent>
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
        autoHideDuration={6000}
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

export default CreateRepairForm;

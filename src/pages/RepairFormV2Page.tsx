import { useState, type ReactNode, type ComponentType, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Chip, StepLabel, type SxProps, type Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Speed as SpeedIcon,
  Bolt as BoltIcon,
  ElectricalServices as ElectricalServicesIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  ElectricBolt as ElectricBoltIcon,
  BugReport as BugReportIcon,
  Euro as EuroIcon,
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Repair } from '../components/Models/Repair';
import { RepairRepository } from '../components/Repositories/RepairRepository';
import { ImageRepository } from '../components/Repositories/ImageRepository';
import { uploadSize, type UploadCandidate } from '../components/Models/Image';
import { rpm_types_mapping_to_poles, poles_types_mapping_to_rpm } from '../components/Models/Motor';
import { BasicInfo } from '../components/layout/form/parts/BasicInfo';
import { TechnicalCharacteristics } from '../components/layout/form/parts/TechnicalCharacteristics';
import WindingsContentFieldsV2 from '../components/layout/form/parts/WindingsContentFieldsV2';
import { Issues } from '../components/layout/form/parts/Issues';
import { CostAndDelivery } from '../components/layout/form/parts/CostAndDelivery';
import Photos from '../components/layout/form/parts/Photos';
import { StyledStepper, StyledStep } from '../components/common/styled/CommonStepper';
import {
  DesignCard,
  CardAccentBar,
  CardSection,
  Hairline,
  SectionLabel,
  StatusPill,
  formTokens,
} from '../components/common/styled/FormDesignSystem';
import StyledSnackbar from '../components/common/StyledSnackbar';
import StyledButton from '../components/common/StyledButton';
import LoadingSave from '../components/common/LoadingSave';
import { useWindingFieldReset } from '../hooks/useWindingFieldReset';
import type { RepairFormState, FormErrors, FormFieldEvent } from '../types/repairForm';

const MB_TO_BYTES = 1000000;
const MAX_UPLOAD_SIZE_MB = 10;

// Στυλ κάρτας επιλογής, στη γλώσσα του design: ουδέτερη λευκή κάρτα, το selected
// state δηλώνεται με accent border + απαλό tint + focus ring (όχι με σκιές/μετακίνηση).
// Μέσω sx (όχι styled props) ώστε να επανυπολογίζεται σε κάθε render.
const choiceCardSx = (theme: Theme, selected: boolean, locked?: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  p: theme.spacing(1.75, 2),
  borderRadius: theme.custom.radius.md,
  border: `1.5px solid ${selected ? theme.palette.primary.main : formTokens.border}`,
  background: selected ? alpha(theme.palette.primary.main, 0.05) : formTokens.cardBg,
  boxShadow: selected ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}` : 'none',
  cursor: locked ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  opacity: locked ? 0.6 : 1,
  transition: 'all 0.18s ease',
  '&:hover': locked
    ? {}
    : { borderColor: selected ? theme.palette.primary.main : formTokens.borderHover },
});

interface ChoiceOption {
  value: string;
  label: string;
  icon: ReactNode;
  locked?: boolean;
}

interface ChoiceGroupProps {
  title: string;
  options: ChoiceOption[];
  value: string;
  onSelect: (value: string) => void;
}

/**
 * Ομάδα επιλογών με κάρτες (π.χ. Μονοφασικός / Τριφασικός).
 */
function ChoiceGroup({ title, options, value, onSelect }: ChoiceGroupProps) {
  return (
    <Box sx={{ mb: 3.5, '&:last-of-type': { mb: 0 } }}>
      <SectionLabel>{title}</SectionLabel>
      <Grid container spacing={1.75}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Grid item xs={12} sm={6} md={4} key={option.value}>
              <Box
                onClick={() => {
                  if (!option.locked) onSelect(option.value);
                }}
                sx={(theme) => choiceCardSx(theme, selected, option.locked)}
              >
                <Box
                  sx={(theme) => ({
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alpha(theme.palette.primary.main, selected ? 0.14 : 0.08),
                    color: theme.palette.primary.main,
                    transition: 'background-color 0.18s ease',
                    '& .MuiSvgIcon-root': { fontSize: 19 },
                  })}
                >
                  {option.icon}
                </Box>
                <Typography
                  sx={{
                    flexGrow: 1,
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: selected ? 'primary.main' : formTokens.textPrimary,
                  }}
                >
                  {option.label}
                </Typography>
                {option.locked && (
                  <Chip
                    icon={<LockIcon sx={{ fontSize: 13 }} />}
                    label="Σύντομα"
                    size="small"
                    sx={{ height: 22, fontSize: '0.7rem' }}
                  />
                )}
                {selected && !option.locked && (
                  <CheckCircleIcon sx={{ fontSize: 19, color: 'primary.main' }} />
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

const stepLabels = [
  'Τύπος Κινητήρα',
  'Βασικά Στοιχεία',
  'Τεχνικά Χαρακτηριστικά',
  'Στοιχεία Περιέλιξης',
  'Περιγραφή Βλάβης',
  'Φωτογραφίες',
  'Κόστος & Παράδοση',
];

// Βήματα (index) όπου γίνονται οι επιλογές που θυμίζει το recap bar του header.
const MOTOR_TYPE_STEP = 0; // Φάσεις + Ταχύτητες
const WINDINGS_STEP = 3; // Τύπος Βήματος

const PHASES_LABELS: Record<string, string> = { '1-phase': 'Μονοφασικός', '3-phase': 'Τριφασικός' };
const SPEED_LABELS: Record<string, string> = { '1': '1 Ταχύτητα', '2': '2 Ταχύτητες' };
const STEP_TYPE_LABELS: Record<string, string> = { standard: 'Ολόκληρο', half: 'Μισό-Μισό', combined: 'Συνδυασμός' };

interface RecapPillProps {
  label: string;
  value: ReactNode;
  onClick: () => void;
}

/**
 * Pill-υπενθύμιση επιλογών από προηγούμενο βήμα (π.χ. "Τριφασικός · 1 Ταχύτητα").
 * Δεν είναι πεδίο - μόνο info. Κλικ πάει στο βήμα όπου γίνεται η επιλογή, ώστε να διορθωθεί
 * αν χρειάζεται, χωρίς ο χρήστης να χρειάζεται να θυμάται τι είχε βάλει.
 */
function RecapPill({ label, value, onClick }: RecapPillProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        border: `1.5px solid ${formTokens.border}`,
        background: formTokens.cardBg,
        borderRadius: theme.custom.radius.pill,
        padding: theme.spacing(0.55, 1.25),
        fontSize: '0.78rem',
        fontFamily: 'inherit',
        cursor: 'pointer',
        color: formTokens.textSecondary,
        transition: 'all .15s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          background: alpha(theme.palette.primary.main, 0.05),
          color: theme.palette.primary.main,
        },
        '&:hover .recap-pill-icon': { opacity: 1 },
      })}
    >
      <Box component="span" sx={{ color: formTokens.textMuted }}>
        {label}:
      </Box>
      <Box component="span" sx={{ fontWeight: 700, color: 'inherit' }}>
        {value}
      </Box>
      <EditIcon
        className="recap-pill-icon"
        sx={{ fontSize: 13, opacity: 0.5, transition: 'opacity .15s ease' }}
      />
    </Box>
  );
}

// Σύντομη επεξήγηση κάτω από τον τίτλο κάθε βήματος (subtitle της κάρτας)
const stepSubtitles = [
  'Επιλέξτε φάσεις και ταχύτητες.',
  'Ποιος έφερε τον κινητήρα και τι μηχάνημα είναι.',
  'Ισχύς, στροφές και λοιπά στοιχεία ταυτότητας.',
  'Ορίστε τον τύπο βήματος, τις σπείρες και τις διατομές.',
  'Τι πρόβλημα έχει ο κινητήρας.',
  'Προαιρετικές φωτογραφίες πριν την επισκευή.',
  'Κόστος και προβλεπόμενη παράδοση.',
];

const stepIcons: ComponentType<{ sx?: SxProps<Theme> }>[] = [
  CategoryIcon, // Τύπος Κινητήρα
  PersonIcon, // Βασικά Στοιχεία
  SettingsIcon, // Τεχνικά Χαρακτηριστικά
  ElectricBoltIcon, // Στοιχεία Περιέλιξης
  BugReportIcon, // Περιγραφή Βλάβης
  AddAPhotoIcon, // Φωτογραφίες
  EuroIcon, // Κόστος & Παράδοση
];

const LAST_STEP = stepLabels.length - 1;

const normalizeRepair = (): RepairFormState => new Repair();

/**
 * Φόρμα καταχώρησης νέας επισκευής (v2) με stepper - μοναδικός τρόπος δημιουργίας πλέον.
 * Πρώτο βήμα: επιλογή τύπου κινητήρα (ταχύτητες, φάσεις) με κλικαριστές κάρτες.
 * Στο βήμα περιέλιξης εμφανίζονται μόνο τα πεδία που ταιριάζουν στην επιλογή.
 * Η επεξεργασία (edit) υπάρχουσας επισκευής χρησιμοποιεί ακόμα ξεχωριστό flow
 * (EditRepairForm, modal) - βλ. MIGRATION_V2.md για το γιατί και το TODO.
 */
function RepairFormV2Page() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [repair, setRepair] = useState<RepairFormState>(normalizeRepair);
  // Ξεχωριστό state επιλογών ώστε να μην φαίνεται τίποτα προεπιλεγμένο από τα defaults του μοντέλου
  const [speeds, setSpeeds] = useState('1');
  const [phases, setPhases] = useState('3-phase');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ίδια σημασιολογία με το EditRepairForm (uppercase, hp<->kw, rpm<->poles)
  const handleInputChange = (e: FormFieldEvent) => {
    const { name, value } = e.target;

    const processedValue: unknown =
      name === 'customer.name' || name === 'motor.manufacturer' || name === 'motor.description'
        ? String(value).toUpperCase()
        : value;

    if (name.includes('.')) {
      const [parent, child] = name.split('.') as ['customer' | 'motor', string];

      if (child === 'hp') {
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            hp: processedValue,
            kw: Number(processedValue) > 0 ? (parseFloat(String(processedValue)) * 0.745699872).toFixed(2) : null,
          },
        }));
      } else if (child === 'kw') {
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            kw: processedValue,
            hp: Number(processedValue) > 0 ? (parseFloat(String(processedValue)) / 0.745699872).toFixed(2) : null,
          },
        }));
      } else if (child === 'rpm') {
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            rpm: processedValue,
            poles: rpm_types_mapping_to_poles[String(processedValue)],
          },
        }));
      } else if (child === 'poles') {
        setRepair((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            poles: processedValue,
            rpm: poles_types_mapping_to_rpm[String(processedValue)],
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

      if (errors[`${parent}.${child}`]) {
        setErrors((prev) => ({ ...prev, [`${parent}.${child}`]: null }));
      }
    } else {
      setRepair((prev) => ({ ...prev, [name]: processedValue }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }
  };

  const { resetWindingFields } = useWindingFieldReset(handleInputChange);

  const handleSelectPhases = (value: string) => {
    if (value === phases) return;
    // Καθαρισμός πεδίων περιέλιξης όταν αλλάζει η επιλογή (όπως στην παλιά φόρμα)
    resetWindingFields(repair.motor);
    handleInputChange({ target: { name: 'motor.typeOfVolt', value } });
    setPhases(value);
  };

  const validateImageSize = (images: UploadCandidate[] | undefined): boolean => {
    const size = uploadSize(images) / MB_TO_BYTES;
    return size <= MAX_UPLOAD_SIZE_MB;
  };

  // Επικύρωση τρέχοντος βήματος
  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    let errorMsg = '';

    switch (activeStep) {
      case 0: // Τύπος Κινητήρα
        if (!phases) {
          errorMsg = 'Επίλεξε φάσεις για να συνεχίσεις';
          isValid = false;
        }
        break;
      case 1: // Βασικά Στοιχεία
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
      case 5: // Φωτογραφίες
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

  // Επικύρωση όλων των βημάτων πριν την αποθήκευση
  const validateAllSteps = (): boolean => {
    const allErrors: FormErrors = {};
    let isValid = true;
    let errorMsg = '';

    if (!phases) {
      errorMsg = 'Επίλεξε φάσεις στον Τύπο Κινητήρα';
      isValid = false;
    }
    if (!repair.customer?.name) {
      allErrors['customer.name'] = 'Το πεδίο Πελάτης είναι υποχρεωτικό';
      errorMsg = errorMsg || 'Ξέχασες να συμπληρώσεις το πεδίο Πελάτης';
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
    if (validateCurrentStep()) {
      if (activeStep < LAST_STEP) {
        setActiveStep(activeStep + 1);
      } else {
        handleSubmit();
      }
    } else {
      setErrorAlert(true);
    }
  };

  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };

  // Κλικ πάνω στο stepper: επιτρέπεται μόνο προς τα πίσω, σε βήματα που έχουν ήδη περάσει
  // (χωρίς validation, όπως και το "Προηγούμενο Βήμα"). Τα επόμενα βήματα δεν είναι
  // κλικαριστά ώστε να μη γίνεται παράκαμψη της επικύρωσης.
  const handleStepClick = (index: number) => {
    if (index < activeStep) {
      setActiveStep(index);
    }
  };

  const createNewRepair = async (dataApi: Repair) => {
    // Δημιουργία Repair
    const response = await RepairRepository.createNewRepair({ repair: dataApi });

    // Upload φωτογραφιών - Αν υπάρχουν
    if (dataApi.images.length > 0) {
      const filesToUpload = dataApi.images
        .filter((image) => image.file !== null)
        .map((image) => image.file as File);
      await ImageRepository.uploadImages(filesToUpload, response.id as number | string);
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (validateAllSteps()) {
      setIsSubmitting(true);
      try {
        const dataApi = new Repair(repair);
        await createNewRepair(dataApi);
        setSuccessAlert(true);

        // Επιστροφή στη λίστα επισκευών μετά από μικρή καθυστέρηση
        setTimeout(() => {
          navigate('/dashboard/services');
        }, 1500);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Σφάλμα κατά την αποθήκευση. Παρακαλώ δοκιμάστε ξανά.';
        setErrorMessage(message);
        setErrorAlert(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrorAlert(true);
    }
  };

  const hasError = (fieldName: string) => Boolean(errors[fieldName]);
  const getErrorMessage = (fieldName: string) => errors[fieldName] || '';

  // Εικονίδιο βήματος ανάλογα με την κατάσταση (ολοκληρωμένο/τρέχον/επόμενο)
  const getStepIcon = (stepIndex: number) => {
    const IconComponent = stepIcons[stepIndex];
    if (stepIndex < activeStep) {
      return <CheckCircleIcon sx={{ fontSize: 'inherit' }} />;
    } else if (stepIndex === activeStep) {
      return <IconComponent sx={{ fontSize: 'inherit' }} />;
    }
    return <IconComponent sx={{ fontSize: 'inherit', opacity: 0.7 }} />;
  };

  const buttonText = activeStep === LAST_STEP ? 'Αποθήκευση' : 'Επόμενο Βήμα';
  const buttonIcon = activeStep === LAST_STEP ? <SaveIcon /> : <NavigateNextIcon />;

  // Recap pills: υπενθυμίζουν επιλογές προηγούμενων βημάτων όσο ο χρήστης είναι αλλού.
  // Κρύβονται στο ίδιο το βήμα όπου γίνεται η επιλογή (θα ήταν περιττά εκεί).
  const recapItems: ReactNode[] = [];
  if (phases && activeStep !== MOTOR_TYPE_STEP) {
    recapItems.push(
      <RecapPill
        key="motor-type"
        label="Κινητήρας"
        value={`${PHASES_LABELS[phases]} · ${SPEED_LABELS[speeds]}`}
        onClick={() => setActiveStep(MOTOR_TYPE_STEP)}
      />,
    );
  }
  if (repair.motor?.typeOfStep && activeStep > MOTOR_TYPE_STEP && activeStep !== WINDINGS_STEP) {
    recapItems.push(
      <RecapPill
        key="step-type"
        label="Τύπος Βήματος"
        value={STEP_TYPE_LABELS[repair.motor.typeOfStep]}
        onClick={() => setActiveStep(WINDINGS_STEP)}
      />,
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: { xs: 2, md: 3 } }}>
      {/* Loading Save Overlay */}
      <LoadingSave show={isSubmitting} message="Αποθήκευση επισκευής..." />

      {/* Header - σταθερό, δεν κάνει scroll */}
      <Box sx={{ flexShrink: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: recapItems.length > 0 ? 1.25 : 3,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Καταχώρηση Νέας Επισκευής
          </Typography>
        </Box>

        {/* Υπενθύμιση επιλογών από προηγούμενα βήματα (όχι πεδία - μόνο info, κλικ για διόρθωση) */}
        {recapItems.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>{recapItems}</Box>
        )}

        <StyledStepper activeStep={activeStep} alternativeLabel>
          {stepLabels.map((label, index) => {
            const isClickable = index < activeStep;
            return (
              <StyledStep key={label}>
                <StepLabel
                  icon={getStepIcon(index)}
                  onClick={() => handleStepClick(index)}
                  sx={{
                    // Το CommonStepper (κοινόχρηστο με την παλιά φόρμα) ορίζει ήδη
                    // cursor:default στο .MuiStepLabel-root με ίδια ή μεγαλύτερη specificity -
                    // χρειάζεται !important για να υπερισχύσει εδώ, χωρίς να πειράξουμε το κοινό αρχείο.
                    cursor: `${isClickable ? 'pointer' : 'default'} !important`,
                    ...(isClickable && {
                      '&:hover .MuiStepLabel-label': { color: 'primary.main' },
                      '&:hover .MuiStepLabel-iconContainer': { opacity: 0.8 },
                    }),
                  }}
                >
                  {label}
                </StepLabel>
              </StyledStep>
            );
          })}
        </StyledStepper>
      </Box>

      {/* Κάρτα βήματος + πλοήγηση: η κάρτα κάνει scroll εσωτερικά, τα κουμπιά μένουν σταθερά κάτω,
          ανεξάρτητα από το ύψος του περιεχομένου του κάθε βήματος. */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pb: 1 }}>
          <DesignCard>
            <CardAccentBar />

            {/* Header κάρτας: τίτλος τρέχοντος βήματος + πρόοδος */}
            <CardSection sx={{ pb: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: '1.19rem', fontWeight: 700, letterSpacing: '-0.01em' }}
                  >
                    {stepLabels[activeStep]}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.84rem', color: formTokens.textSecondary, mt: '3px' }}
                  >
                    {stepSubtitles[activeStep]}
                  </Typography>
                </Box>
                <StatusPill>
                  Βήμα {activeStep + 1} από {stepLabels.length}
                </StatusPill>
              </Box>
            </CardSection>
            <Hairline sx={{ mt: 2.5 }} />

            <CardSection sx={{ minHeight: 300 }}>
              {/* Βήμα 1: Τύπος Κινητήρα */}
              {activeStep === 0 && (
                <>
                  <ChoiceGroup
                    title="Φάσεις"
                    value={phases}
                    onSelect={handleSelectPhases}
                    options={[
                      { value: '1-phase', label: 'Μονοφασικός', icon: <ElectricalServicesIcon /> },
                      { value: '3-phase', label: 'Τριφασικός', icon: <BoltIcon /> },
                    ]}
                  />

                  <ChoiceGroup
                    title="Ταχύτητες"
                    value={speeds}
                    onSelect={setSpeeds}
                    options={[
                      { value: '1', label: '1 Ταχύτητα', icon: <SpeedIcon /> },
                      {
                        value: '2',
                        label: '2 Ταχύτητες',
                        icon: <SpeedIcon />,
                        locked: true, // Δεν υποστηρίζεται ακόμα στη βάση - μόνο ενδεικτικά στο UI
                      },
                    ]}
                  />
                </>
              )}

              {/* Βήμα 2: Βασικά Στοιχεία */}
              {activeStep === 1 && (
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

              {/* Βήμα 3: Τεχνικά Χαρακτηριστικά */}
              {activeStep === 2 && (
                <TechnicalCharacteristics
                  repair={repair}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Βήμα 4: Στοιχεία Περιέλιξης - μόνο τα πεδία που ταιριάζουν στην επιλογή του βήματος 1 */}
              {activeStep === 3 && (
                <WindingsContentFieldsV2
                  repair={repair}
                  setRepair={setRepair}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Βήμα 5: Περιγραφή Βλάβης */}
              {activeStep === 4 && (
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

              {/* Βήμα 6: Φωτογραφίες */}
              {activeStep === 5 && (
                <Photos
                  repair={repair}
                  setRepair={setRepair}
                  setFilesToDelete={() => {}}
                  onError={(errorMsg) => {
                    setErrorMessage(errorMsg);
                    setErrorAlert(true);
                  }}
                />
              )}

              {/* Βήμα 7: Κόστος & Παράδοση */}
              {activeStep === 6 && (
                <CostAndDelivery
                  repair={repair}
                  handleInputChange={handleInputChange}
                  hasError={hasError}
                  getErrorMessage={getErrorMessage}
                />
              )}
            </CardSection>
          </DesignCard>
        </Box>

        {/* Πλοήγηση - σταθερή στο κάτω μέρος, εκτός της περιοχής που κάνει scroll η κάρτα.
            Δεν μετακινείται ποτέ ανάλογα με το ύψος του περιεχομένου του κάθε βήματος. */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 2,
            background: formTokens.panelBg,
            borderTop: `1px solid ${formTokens.border}`,
          }}
        >
          {activeStep > 0 ? (
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
            loading={isSubmitting}
            loadingText="Αποθήκευση..."
            onClick={handleNextStep}
            disabled={isSubmitting}
          />
        </Box>
      </Box>

      {/* Success Alert */}
      <StyledSnackbar
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        severity="success"
        title="Επιτυχής Καταχώρηση!"
        message="Η επισκευή καταχωρήθηκε με επιτυχία στο σύστημα"
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Error Alert */}
      <StyledSnackbar
        open={errorAlert}
        onClose={() => setErrorAlert(false)}
        severity="error"
        title="Σφάλμα Καταχώρησης"
        message={errorMessage}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default RepairFormV2Page;

import { useState, type FormEvent } from 'react';
import { Box } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Connection, type ConnectionInput } from '../../Models/Connection';
import type { ConnectionJSON } from '../../Models/Connection';
import { poles_types_mapping_to_rpm, rpm_types_mapping_to_poles } from '../../Models/Motor';
import { useConnections } from '../../../context/ConnectionsContext';
import StyledSnackbar from '../../common/StyledSnackbar';
import StyledButton from '../../common/StyledButton';
import LoadingSave from '../../common/LoadingSave';
import { BasicInfoConnection } from './parts/connection/BasicInfoConnection';
import type { FormErrors, FormFieldEvent } from '../../../types/repairForm';

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
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(2.5, 0),
  marginTop: theme.spacing(1.5),
  borderTop: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
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

interface CreateConnectionFormProps {
  onSubmitSuccess: () => void;
}

function CreateConnectionForm({ onSubmitSuccess }: CreateConnectionFormProps) {
  const [connection, setConnection] = useState<ConnectionInput>(new Connection());
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addConnection } = useConnections();

  const handleInputChange = (e: FormFieldEvent) => {
    const { name, value } = e.target;

    if (name === 'poles') {
      setConnection((prev) => ({
        ...prev,
        poles: value as string,
        rpm: poles_types_mapping_to_rpm[value as string] || prev.rpm,
      }));
    } else if (name === 'rpm') {
      setConnection((prev) => ({
        ...prev,
        rpm: value as string,
        poles: rpm_types_mapping_to_poles[value as string] || prev.poles,
      }));
    } else {
      setConnection((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    let errorMsg = '';

    if (!connection.connectionType) {
      newErrors.connectionType = 'Ο τύπος σύνδεσης είναι υποχρεωτικός';
      errorMsg = 'Επιλέξτε τύπο σύνδεσης';
      isValid = false;
    }
    if (!connection.poles) {
      newErrors.poles = 'Οι πόλοι είναι υποχρεωτικοί';
      errorMsg = errorMsg || 'Επιλέξτε αριθμό πόλων';
      isValid = false;
    }

    setErrors(newErrors);
    setErrorMessage(errorMsg);
    return isValid;
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!validate()) {
      setErrorAlert(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const data: Partial<ConnectionJSON> = {
        id: connection.id,
        caves: connection.caves,
        poles: connection.poles,
        coils: connection.coils,
        rpm: connection.rpm,
        step: connection.step,
        halfStep: connection.halfStep,
        typeOfStep: connection.typeOfStep,
        typeOfVolt: connection.typeOfVolt,
        connectionType: connection.connectionType,
        description: connection.description,
        createdAt: connection.createdAt,
      };
      await addConnection(data);
      setSuccessAlert(true);
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error) {
      setErrorMessage('Σφάλμα κατά την αποθήκευση. Παρακαλώ δοκιμάστε ξανά.');
      setErrorAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <LoadingSave show={isSubmitting} message="Αποθήκευση Σύνδεσης..." />

      <form onSubmit={handleSubmit}>
        <BasicInfoConnection
          connection={connection}
          handleInputChange={handleInputChange}
        />

        <NavigationContainer>
          <StyledButton
            variant="contained"
            color="primary"
            text="Αποθήκευση"
            endIcon={<SaveIcon />}
            loading={isSubmitting}
            loadingText="Αποθήκευση..."
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          />
        </NavigationContainer>
      </form>

      <StyledSnackbar
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        severity="success"
        title="Επιτυχής Καταχώρηση!"
        message="Η σύνδεση καταχωρήθηκε με επιτυχία"
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

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

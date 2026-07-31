import { Grid, InputAdornment, InputLabel, Select, MenuItem, type SxProps, type Theme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Customer } from '../../../Models/Customer';
import { typeOfMotor, typeOfMotor_translated } from '../../../Models/Motor';
import {
  StyledTextField,
  StyledAutocomplete,
  StyledFormControl,
} from '../../../common/StyledFormComponents';
import { useSuggestedFormValues } from '../../../../context/SuggestedFormValuesContext';
import type { CustomerSuggestion } from '../../../../types/suggested';
import type { RepairFormBagProps } from '../../../../types/repairForm';

export const BasicInfo = (props: RepairFormBagProps) => {
  const { suggested } = useSuggestedFormValues();
  const { customer, motor } = suggested;
  const isExistingCustomer = Boolean(props.repair.customer?.id);

  const successStyle: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2e7d32', // Πράσινο χρώμα
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: '#1b5e20',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#2e7d32',
    },
  };

  // Manage the list of existing customers
  const handleCustomerChange = (event: unknown, newValue: CustomerSuggestion | string | null) => {
    if (newValue && typeof newValue === 'object' && newValue.id) {
      // If clicked on suggested customer
      props.setRepair((prev) => ({
        ...prev,
        customer: newValue,
      }));
    } else {
      // if clicked on "x" icon
      props.setRepair((prev) => ({
        ...prev,
        customer: new Customer(),
      }));
    }

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['customer.name']) {
      props.setErrors((prev) => ({
        ...prev,
        'customer.name': null,
      }));
    }
  };

  const handleDescriptionChange = (event: unknown, newValue: string | null) => {
    const descriptionValue = typeof newValue === 'string' ? newValue : newValue || '';

    props.setRepair((prev) => ({
      ...prev,
      motor: {
        ...prev.motor,
        description: descriptionValue,
      },
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['motor.description']) {
      props.setErrors((prev) => ({
        ...prev,
        'motor.description': null,
      }));
    }
  };

  // Για το Autocomplete του manufacturer
  const handleManufacturerChange = (event: unknown, newValue: string | null) => {
    const manufacturerValue = typeof newValue === 'string' ? newValue : newValue || '';

    props.setRepair((prev) => ({
      ...prev,
      motor: {
        ...prev.motor,
        manufacturer: manufacturerValue,
      },
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['motor.manufacturer']) {
      props.setErrors((prev) => ({
        ...prev,
        'motor.manufacturer': null,
      }));
    }
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <StyledAutocomplete
          freeSolo
          options={customer.data}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name || '')}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(liProps, option, state) => (
            <li {...liProps} key={option.id ?? `${option.name}-${state.index}`}>
              {option.name}
            </li>
          )}
          value={(props.repair.customer as CustomerSuggestion | undefined) || null}
          onChange={handleCustomerChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              required
              sx={isExistingCustomer ? successStyle : undefined}
              label="Πελάτης"
              name="customer.name"
              variant="outlined"
              onChange={(e) => {
                const value = e.target.value.toUpperCase();

                // 1. Βρες αν υπάρχει έστω και ένας πελάτης με αυτό το όνομα
                const foundCustomer = customer.data.find((c) => c.name.toUpperCase() === value);
                if (foundCustomer) {
                  // Αν βρέθηκε, ενημέρωσε τα στοιχεία ΜΙΑ φορά
                  handleCustomerChange(e, foundCustomer);
                } else {
                  // Αν ΔΕΝ βρέθηκε κανείς, τότε μόνο κάνε το reset
                  props.setRepair((prev) => ({
                    ...prev,
                    customer: { ...new Customer(), name: value },
                  }));
                  props.handleInputChange(e);
                }
              }}
              error={props.hasError('customer.name')}
              helperText={
                props.hasError('customer.name')
                  ? props.getErrorMessage('customer.name')
                  : isExistingCustomer
                    ? 'Βρέθηκε υπάρχων πελάτης - τα στοιχεία του συμπληρώθηκαν αυτόματα.'
                    : ''
              }
              FormHelperTextProps={
                !props.hasError('customer.name') && isExistingCustomer
                  ? { sx: { color: '#2e7d32', fontWeight: 600 } }
                  : undefined
              }
              InputProps={{
                ...params.InputProps,
                startAdornment: isExistingCustomer ? (
                  <InputAdornment position="start">
                    <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                  </InputAdornment>
                ) : undefined,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth sx={isExistingCustomer ? successStyle : undefined}>
          <InputLabel id="type-select-label">Τύπος</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            name="customer.type"
            value={props.repair.customer?.type || ''}
            label="Τύπος"
            onChange={props.handleInputChange}
          >
            <MenuItem value="individual">Ιδιώτης</MenuItem>
            <MenuItem value="factory">Εργοστάσιο</MenuItem>
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          sx={isExistingCustomer ? successStyle : undefined}
          label="Τηλέφωνο"
          name="customer.phone"
          variant="outlined"
          value={props.repair.customer?.phone || ''}
          onChange={props.handleInputChange}
          error={props.hasError('customer.phone')}
          helperText={props.getErrorMessage('customer.phone')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          sx={isExistingCustomer ? successStyle : undefined}
          label="Email"
          name="customer.email"
          variant="outlined"
          value={props.repair.customer?.email || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledAutocomplete
          freeSolo
          options={motor.description.data || []}
          value={props.repair.motor?.description || ''}
          onChange={handleDescriptionChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              key="motor.description"
              label="Περιγραφή Κινητήρα"
              placeholder="π.χ. Ανεμιστήρας, Κωνικό 2 Ταχ/των"
              name="motor.description"
              variant="outlined"
              onChange={(e) => props.handleInputChange(e)}
              error={props.hasError('motor.description')}
              helperText={props.getErrorMessage('motor.description')}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledAutocomplete
          freeSolo
          options={motor.manufacturer.data || []}
          value={props.repair.motor?.manufacturer || ''}
          onChange={handleManufacturerChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              required
              label="Μάρκα"
              name="motor.manufacturer"
              variant="outlined"
              onChange={(e) => props.handleInputChange(e)}
              error={props.hasError('motor.manufacturer')}
              helperText={props.getErrorMessage('motor.manufacturer')}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="type-select-label">Τύπος Κινητήρα</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            name="motor.typeOfMotor"
            value={props.repair.motor?.typeOfMotor || ''}
            label="Τύπος Κινητήρα"
            onChange={props.handleInputChange}
          >
            {typeOfMotor.map((value, index) => {
              return (
                <MenuItem key={value} value={value}>
                  {typeOfMotor_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Ημερομηνία Παραλαβής"
          name="isArrived"
          type="date"
          value={props.repair?.isArrived || new Date().toISOString().split('T')[0]}
          onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

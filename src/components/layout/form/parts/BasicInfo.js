import React, { useState, useEffect } from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import { Customer } from '../../../Models/Customer';
import { CustomerRepository } from '../../../Repositories/CustomerRepository';
import { MotorRepository } from '../../../Repositories/MotorRepository';
import { typeOfMotor, typeOfMotor_translated } from '../../../Models/Motor';
import {
  StyledTextField,
  StyledAutocomplete,
  StyledFormControl,
} from '../../../common/StyledFormComponents';

export const BasicInfo = (props) => {
  const [customers, setCustomers] = useState([]);
  const [motorBrands, setMotorBrands] = useState([]);

  const commonTitlesOfMotor = [
    'Ανεμιστήρας',
    'Γερανός',
    'Υπ. Αντλία',
    'Κώνικο',
    'Ρότορας',
    'Στάτης',
    'Κονφλέρ',
    'Χλωοκοπτικό',
  ];

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
      setMotorBrands([]);
    }
  };

  // Για το Autocomplete του πελάτη
  const handleCustomerChange = (event, newValue) => {
    props.setRepair((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        name: newValue,
      },
    }));

    // αν επιλεξει καποιον που υπαρχει παρε ολα τα στοιχεια
    if (customers.map((customer) => customer.name).includes(newValue)) {
      props.setRepair((prev) => ({
        ...prev,
        customer: customers.find((customer) => customer.name == newValue),
      }));
    } else {
      props.setRepair((prev) => ({
        ...prev,
        customer: new Customer(),
      }));
    }

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['customer.name']) {
      props.setErrors((prev) => ({
        ...prev,
        ['customer.name']: null,
      }));
    }
  };

  const handleAutocompleteChange = (event, newValue) => {
    const id = event.target.getAttribute('id') || '';

    if (id && id.includes('motor.description')) {
      props.setRepair((prev) => ({
        ...prev,
        motor: {
          ...prev.motor,
          description: newValue,
        },
      }));
    }

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['motor.description']) {
      props.setErrors((prev) => ({
        ...prev,
        ['motor.description']: null,
      }));
    }
  };

  // Για το Autocomplete του manufacturer
  const handleManufacturerChange = (event, newValue) => {
    props.setRepair((prev) => ({
      ...prev,
      motor: {
        ...prev.motor,
        manufacturer: newValue,
      },
    }));

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors['motor.manufacturer']) {
      props.setErrors((prev) => ({
        ...prev,
        ['motor.manufacturer']: null,
      }));
    }
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <StyledAutocomplete
          freeSolo
          options={customers.map((customer) => customer.name) || []}
          value={props.repair.customer?.name || ''}
          onChange={handleCustomerChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              required
              label="Πελάτης"
              name="customer.name"
              variant="outlined"
              onChange={(e) => props.handleInputChange(e)}
              error={props.hasError('customer.name')}
              helperText={props.getErrorMessage('customer.name')}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
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
          id="motor.description"
          key="motor.description"
          data-field="motor-description"
          options={commonTitlesOfMotor || []}
          value={props.repair.motor?.description || ''}
          onChange={handleAutocompleteChange}
          renderInput={(params, option) => (
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
          options={motorBrands || []}
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
          value={props.repair?.isArrived || ''}
          onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

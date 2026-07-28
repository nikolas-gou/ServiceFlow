import React from 'react';
import { Box } from '@mui/material';
import { Settings, Tune } from '@mui/icons-material';
import SimpleWindingBuilder from './winding/parts/SimpleWindingBuilder';
import CombinedStepBuilder from './winding/parts/CombinedStepBuilder';
import TypeOfStepFieldV2 from './TypeOfStepFieldV2';
import { FullBleedHairline } from '../../../common/styled/FormDesignSystem';

/**
 * Πεδία περιέλιξης της ΝΕΑΣ (v2) φόρμας - όλα χτισμένα με το ίδιο design system, ώστε
 * τριφασικά/μονοφασικά και Ολόκληρο/Μισό/Συνδυασμός να ταιριάζουν οπτικά μεταξύ τους.
 *
 * Η ΠΑΛΙΑ φόρμα εξακολουθεί να χρησιμοποιεί το WindingsContentFields (παλιά components) -
 * μένει άθικτη.
 *
 * Στο μονοφασικό υπάρχουν δύο πηνία (κυρίως + βοηθητικό) που εμφανίζονται δίπλα-δίπλα.
 *
 * Ο Τύπος Βήματος (Ολόκληρο/Μισό-Μισό/Συνδυασμός) επιλέγεται εδώ, μαζί με τα υπόλοιπα
 * στοιχεία περιέλιξης (σπείρες κτλ.), και όχι στο πρώτο βήμα της φόρμας - έτσι ο χρήστης
 * μπορεί να προχωρήσει και να αποθηκεύσει χωρίς να το ξέρει εξαρχής.
 */

const SIDE_BY_SIDE_SX = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
  columnGap: 4,
  rowGap: 4,
  alignItems: 'start',
};

const MAIN_ICON = <Settings sx={{ fontSize: 18, color: 'primary.main' }} />;
const HELPER_ICON = <Tune sx={{ fontSize: 18, color: 'warning.main' }} />;

// Ονόματα πεδίων ανά πηνίο & τύπο βήματος. Το κυρίως γράφει στα βασικά πεδία,
// το βοηθητικό στα helper*. Το "μισό" χρησιμοποιεί τα half*/helperHalf* πεδία.
const FIELDS = {
  main: {
    standard: { step: 'step', coilsCount: 'coilsCount', spiral: 'spiral' },
    half: { step: 'halfStep', coilsCount: 'halfCoilsCount', spiral: 'halfSpiral' },
  },
  helper: {
    standard: { step: 'helperStep', coilsCount: 'helperCoilsCount', spiral: 'helperSpiral' },
    half: {
      step: 'helperHalfStep',
      coilsCount: 'helperHalfCoilsCount',
      spiral: 'helperHalfSpiral',
    },
  },
};

// Τύπος διατομής ανά πηνίο & τύπο βήματος.
const CROSS = {
  main: { standard: 'main_standard', half: 'main_half' },
  helper: { standard: 'helper_standard', half: 'helper_half' },
};

function WindingsContentFieldsV2({ repair, setRepair, handleInputChange }) {
  const motor = repair.motor || {};
  const typeOfVolt = motor.typeOfVolt;
  const typeOfStep = motor.typeOfStep;
  const common = { repair, setRepair, handleInputChange };

  // Δύο πηνία δίπλα-δίπλα (κυρίως + βοηθητικό), με τα δοσμένα components.
  const twoCoils = (left, right) => (
    <Box sx={SIDE_BY_SIDE_SX}>
      {left}
      {right}
    </Box>
  );

  // Επιλογή Τύπου Βήματος μαζί με τα υπόλοιπα δεδομένα περιέλιξης (όχι στο πρώτο βήμα).
  const typeOfStepField = (
    <Box sx={{ mb: 3 }}>
      <TypeOfStepFieldV2 repair={repair} handleInputChange={handleInputChange} />
      <FullBleedHairline sx={{ mt: 3 }} />
    </Box>
  );

  if (typeOfVolt === '3-phase') {
    if (typeOfStep === 'combined') {
      // Ένα πηνίο -> ένα box με στήλες ανά αριθμό βήματος
      return (
        <Box>
          {typeOfStepField}
          <CombinedStepBuilder {...common} />
        </Box>
      );
    }
    if (typeOfStep === 'standard' || typeOfStep === 'half') {
      // Ένα πηνίο, απλό βήμα
      return (
        <Box>
          {typeOfStepField}
          <SimpleWindingBuilder
            {...common}
            fields={FIELDS.main[typeOfStep]}
            crossSectionType={typeOfStep === 'half' ? 'half' : 'standard'}
          />
        </Box>
      );
    }
    return typeOfStepField;
  }

  if (typeOfVolt === '1-phase') {
    if (typeOfStep === 'combined') {
      return (
        <Box>
          {typeOfStepField}
          {twoCoils(
            <CombinedStepBuilder
              key="main"
              half
              title="Κυρίως Περιέλιξη"
              titleIcon={MAIN_ICON}
              crossSectionType="main_standard"
              {...common}
            />,
            <CombinedStepBuilder
              key="helper"
              half
              title="Βοηθητική Περιέλιξη"
              titleIcon={HELPER_ICON}
              fields={{
                step: 'helperStep',
                halfStep: 'helperHalfStep',
                spiral: 'helperSpiral',
                coilsCount: 'helperCoilsCount',
              }}
              crossSectionType="helper_standard"
              {...common}
            />,
          )}
        </Box>
      );
    }
    if (typeOfStep === 'standard' || typeOfStep === 'half') {
      return (
        <Box>
          {typeOfStepField}
          {twoCoils(
            <SimpleWindingBuilder
              key="main"
              half
              title="Κυρίως Περιέλιξη"
              titleIcon={MAIN_ICON}
              fields={FIELDS.main[typeOfStep]}
              crossSectionType={CROSS.main[typeOfStep]}
              {...common}
            />,
            <SimpleWindingBuilder
              key="helper"
              half
              title="Βοηθητική Περιέλιξη"
              titleIcon={HELPER_ICON}
              fields={FIELDS.helper[typeOfStep]}
              crossSectionType={CROSS.helper[typeOfStep]}
              {...common}
            />,
          )}
        </Box>
      );
    }
    return typeOfStepField;
  }

  return null;
}

export default WindingsContentFieldsV2;

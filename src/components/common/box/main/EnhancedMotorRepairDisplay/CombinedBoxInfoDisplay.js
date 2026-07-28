import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ColoredBox } from '../../../styled/CommonBoxes';
import { commonStyles } from '../../../styled/CommonStyles';
import {
  HIGHLIGHT,
  HIGHLIGHT_TEXT,
  HALF_COLUMN_BG,
  MUTED_TEXT,
  DIVIDER_COLOR,
  DASH_COLOR,
  boxTitleSx,
  boxLabelSx,
  boxValueSx,
  boxColumnValueSx,
  typeLabelSx,
} from './windingBoxStyles';

// Κενό ανάμεσα στις γραμμές: μπαίνει ως padding μέσα στα κελιά (όχι rowGap),
// ώστε η επισήμανση της στήλης "ΜΙΣΟ" να είναι μία συνεχόμενη λωρίδα.
const CELL_PY = 0.9;
const GROUP_PX = 0.75;
// Κενό ανάμεσα στις στήλες (columnGap). Η παύλα κεντράρεται ακριβώς μέσα σε αυτό.
const COLUMN_GAP_PX = 12;

const labelCellSx = {
  ...boxLabelSx,
  py: CELL_PY,
  display: 'flex',
  alignItems: 'flex-end',
};

// Παύλα στο κενό ανάμεσα σε δύο στήλες: κάθε box είναι ΕΝΑ πηνίο και οι στήλες είναι
// υποσύνολά του, οπότε οι αριθμοί διαβάζονται σαν ένα βήμα (π.χ. 6-8 και 10-12 -> 6-8-10-12).
const dashBetweenSx = {
  position: 'relative',
  '&::after': {
    content: '"–"',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: `-${COLUMN_GAP_PX}px`, // = columnGap, οπότε πιάνει ακριβώς το κενό
    width: `${COLUMN_GAP_PX}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9em',
    fontWeight: 600,
    color: DASH_COLOR,
  },
};

/** Τετραγωνάκι + κείμενο για το υπόμνημα κάτω από τον τίτλο. */
function LegendItem({ color, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Box sx={{ width: 9, height: 9, borderRadius: '2px', backgroundColor: color }} />
      <Box component="span" sx={{ ...typeLabelSx, color: MUTED_TEXT }}>
        {label}
      </Box>
    </Box>
  );
}

/**
 * Box περιέλιξης με στήλες ανά τύπο (ΜΙΣΟ / ΟΛΟΚΛΗΡΟ).
 *
 * Χρησιμοποιείται:
 *  - στον τριφασικό συνδυασμένο: ΕΝΑ box, μία στήλη ανά αριθμό βήματος (είναι ένα πηνίο),
 *  - στον μονοφασικό συνδυασμένο: ΔΥΟ boxes (κυρίως + βοηθητικό), το καθένα με
 *    στήλη για το μισό και στήλη για το ολόκληρο.
 *
 * Η στήλη του μισού είναι τονισμένη ώστε να ξεχωρίζει με μια ματιά.
 *
 * @param {Array} groups - [{ isHalf, step, spiral, crossSection }]
 * @param {Array} values - γραμμές κοινές για όλο το box (π.χ. Σπείρες/Διατομή/Σύνδεση)
 */
function CombinedBoxInfoDisplay(props) {
  const groups = props.groups || [];
  const values = props.values || [];
  const hasGroups = groups.length > 0;
  const hasHalf = groups.some((group) => group.isHalf);
  const hasWhole = groups.some((group) => !group.isHalf);

  // Οι γραμμές που έχουν διαφορετική τιμή ανά στήλη
  const groupRows = [
    { key: 'step', label: 'Βήμα:', sequence: true, get: (group) => group.step },
    groups.some((group) => group.spiral) && {
      key: 'spiral',
      label: 'Σπείρες:',
      sequence: true,
      get: (group) => group.spiral,
    },
    groups.some((group) => group.crossSection) && {
      key: 'crossSection',
      label: 'Διατομή:',
      get: (group) => group.crossSection,
    },
  ].filter(Boolean);

  return (
    <ColoredBox color={props.color}>
      {/* component="div": ο τίτλος περιέχει Box, που δεν επιτρέπεται μέσα σε <p> */}
      <Typography component="div" sx={{ mb: 1, ...boxTitleSx, ...commonStyles.flexBetween }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {props.icon}
          {props.title || ''}
          {props.titleTooltip && (
            <Tooltip title={props.titleTooltip} arrow placement="top">
              <InfoOutlinedIcon sx={{ fontSize: 15, opacity: 0.85, cursor: 'help' }} />
            </Tooltip>
          )}
        </Box>
      </Typography>

      {hasGroups && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1.25 }}>
          {hasHalf && <LegendItem color={HIGHLIGHT} label="ΜΙΣΟ" />}
          {hasWhole && <LegendItem color="rgba(255, 255, 255, 0.5)" label="ΟΛΟΚΛΗΡΟ" />}
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          // ετικέτα | κενό που σπρώχνει δεξιά | μία στήλη ανά τύπο/αριθμό βήματος.
          // Ελάχιστο πλάτος 80px: αρκετό για την κεφαλίδα "ΟΛΟΚΛΗΡΟ" και ώστε η στήλη
          // "ΜΙΣΟ" να μη βγαίνει μικρότερη, αλλά όχι τόσο πλατύ ώστε οι αριθμοί (και οι
          // παύλες ανάμεσά τους) να απομακρύνονται πολύ.
          gridTemplateColumns: `auto 1fr repeat(${groups.length}, minmax(72px, auto))`,
          columnGap: `${COLUMN_GAP_PX}px`,
          alignItems: 'stretch',
          overflowX: 'auto',
        }}
      >
        {hasGroups && (
          <>
            {/* Κεφαλίδες στηλών: ο τύπος πάνω από κάθε αριθμό βήματος */}
            <Box sx={{ gridColumn: '1 / 3' }} />
            {groups.map((group, index) => (
              <Box
                key={`head-${index}`}
                sx={{
                  ...typeLabelSx,
                  px: GROUP_PX,
                  py: 0.5,
                  textAlign: 'center',
                  borderRadius: '6px 6px 0 0',
                  backgroundColor: group.isHalf ? HIGHLIGHT : 'transparent',
                  color: group.isHalf ? HIGHLIGHT_TEXT : MUTED_TEXT,
                }}
              >
                {group.isHalf ? 'ΜΙΣΟ' : 'ΟΛΟΚΛΗΡΟ'}
              </Box>
            ))}

            {groupRows.map((row, rowIndex) => (
              <React.Fragment key={row.key}>
                <Typography variant="body2" sx={labelCellSx}>
                  {row.label}
                </Typography>
                {/* κενό κελί: σπρώχνει τις στήλες δεξιά, όπως και οι απλές γραμμές */}
                <Box />
                {groups.map((group, index) => (
                  <Box
                    key={`${row.key}-${index}`}
                    sx={{
                      ...boxColumnValueSx,
                      ...row.sx,
                      // Παύλα ανάμεσα στις στήλες, ώστε οι αριθμοί να διαβάζονται σαν ένα βήμα
                      ...(row.sequence && index < groups.length - 1 ? dashBetweenSx : null),
                      px: GROUP_PX,
                      py: CELL_PY,
                      minWidth: 0,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      backgroundColor: group.isHalf ? HALF_COLUMN_BG : 'transparent',
                      borderRadius:
                        group.isHalf && rowIndex === groupRows.length - 1 ? '0 0 6px 6px' : 0,
                    }}
                  >
                    {row.get(group) || '-'}
                  </Box>
                ))}
              </React.Fragment>
            ))}

            {values.length > 0 && (
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  height: '1px',
                  my: 1,
                  backgroundColor: DIVIDER_COLOR,
                }}
              />
            )}
          </>
        )}

        {/* Κοινά στοιχεία όλου του πηνίου - μία τιμή σε όλο το πλάτος */}
        {values.map(({ label, value }) => (
          <React.Fragment key={label}>
            <Typography variant="body2" sx={labelCellSx}>
              {label}
            </Typography>
            <Box
              sx={{
                ...boxValueSx,
                gridColumn: '2 / -1',
                py: CELL_PY,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              {value || '-'}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </ColoredBox>
  );
}

export default CombinedBoxInfoDisplay;

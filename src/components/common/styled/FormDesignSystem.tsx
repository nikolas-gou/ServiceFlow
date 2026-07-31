import { Box, Typography, TextField, type SxProps, type Theme } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import type { ReactNode } from 'react';

/**
 * Design system της νέας (v2) φόρμας - βασισμένο στο handoff "Steps & Cross-Sections (Option 1a)".
 * Λευκή κάρτα με λεπτό accent bar, ενότητες χωρισμένες με hairlines, uppercase labels,
 * monospace για αριθμούς και segmented toggles.
 *
 * Το accent χρώμα ΔΕΝ είναι hardcoded: αντλείται από το theme.palette.primary ώστε η νέα
 * φόρμα να ταιριάζει με την υπόλοιπη εφαρμογή (βλ. src/styles/colors.js).
 * Τα ουδέτερα (γκρι/borders) είναι του design και ζουν μόνο εδώ.
 */
export const formTokens = {
  cardBg: '#ffffff',
  fieldBg: '#fafbfc',
  panelBg: '#f8f9fb',
  border: '#e5e7eb',
  borderHover: '#c3c9d4',
  hairline: '#eef0f2',
  hintBorder: '#e0e3e8',
  segmentTrack: '#f2f3f5',
  textPrimary: '#1b1f27',
  textSecondary: '#667085',
  textLabel: '#7a828e',
  textMuted: '#98a1ae',
  // Το site δεν φορτώνει δικό του mono font - χρησιμοποιούμε system stack (χωρίς εξωτερικό request)
  mono: "'Roboto Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  cardShadow: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.05)',
  segmentShadow: '0 1px 2px rgba(16,24,40,.12)',
};

/** Η βασική λευκή κάρτα της φόρμας. */
export const DesignCard = styled(Box)(({ theme }) => ({
  background: formTokens.cardBg,
  border: `1px solid ${formTokens.border}`,
  borderRadius: theme.custom.radius.lg,
  boxShadow: formTokens.cardShadow,
  overflow: 'hidden',
}));

/** Λεπτή gradient γραμμή στην κορυφή της κάρτας. */
export const CardAccentBar = styled(Box)(({ theme }) => ({
  height: 4,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
}));

/** Ενότητα μέσα στην κάρτα (σταθερό οριζόντιο padding σε όλες). */
export const CardSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 2),
  },
}));

/** Λεπτή διαχωριστική γραμμή μεταξύ ενοτήτων. */
export const Hairline = styled(Box)({
  height: 1,
  background: formTokens.hairline,
});

/**
 * Hairline που "σπάει" το padding του CardSection ώστε να φτάνει άκρη-άκρη στην κάρτα.
 * Τα negative margins πρέπει να ταιριάζουν με το padding του CardSection παραπάνω.
 */
export const FullBleedHairline = styled(Hairline)(({ theme }) => ({
  marginLeft: theme.spacing(-4),
  marginRight: theme.spacing(-4),
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
  },
}));

interface SectionLabelProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Uppercase label ενότητας/πεδίου.
 * Το lang="el" είναι απαραίτητο: χωρίς αυτό το text-transform: uppercase κρατάει τους
 * τόνους ("ΦΆΣΕΙΣ") ενώ στα ελληνικά τα κεφαλαία γράφονται άτονα ("ΦΑΣΕΙΣ").
 */
export function SectionLabel({ children, sx }: SectionLabelProps) {
  return (
    <Typography
      component="div"
      lang="el"
      sx={{
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: formTokens.textLabel,
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

interface HelperTextProps {
  children: ReactNode;
  error?: boolean;
  sx?: SxProps<Theme>;
}

/** Βοηθητικό κείμενο κάτω από πεδίο. */
export function HelperText({ children, error, sx }: HelperTextProps) {
  return (
    <Typography
      component="div"
      sx={[
        (theme: Theme) => ({
          fontSize: '0.78rem',
          color: error ? theme.palette.error.main : formTokens.textMuted,
          mt: 0.9,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Typography>
  );
}

interface StatusPillProps {
  children: ReactNode;
  color?: string;
}

/** Pill με τελίτσα (π.χ. "3 βήματα ενεργά"). */
export function StatusPill({ children, color }: StatusPillProps) {
  return (
    <Box
      sx={(theme) => {
        const accent = color || theme.palette.primary.main;
        return {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.9,
          background: alpha(accent, 0.09),
          color: accent,
          fontSize: '0.78rem',
          fontWeight: 600,
          padding: theme.spacing(0.75, 1.5),
          borderRadius: theme.custom.radius.pill,
          whiteSpace: 'nowrap',
        };
      }}
    >
      <Box
        component="span"
        sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'currentColor' }}
      />
      {children}
    </Box>
  );
}

interface NumberBadgeProps {
  children: ReactNode;
  color?: string;
}

/** Τετράγωνο badge με αριθμό (mono), σε tint του accent. */
export function NumberBadge({ children, color }: NumberBadgeProps) {
  return (
    <Box
      sx={(theme) => {
        const accent = color || theme.palette.primary.main;
        return {
          width: 26,
          height: 26,
          flexShrink: 0,
          borderRadius: '7px',
          background: alpha(accent, 0.1),
          color: accent,
          fontFamily: formTokens.mono,
          fontSize: '0.8rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color .2s ease, color .2s ease',
        };
      }}
    >
      {children}
    </Box>
  );
}

interface DesignTextFieldProps {
  mono?: boolean;
}

/**
 * Πεδίο κειμένου του design: απαλό φόντο, 1.5px border, focus ring.
 * Με `mono` οι αριθμητικές τιμές γράφονται σε monospace (βήμα, σπείρες, διατομές).
 */
export const DesignTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'mono',
})<DesignTextFieldProps>(({ theme, mono, size }) => {
  const small = size === 'small';
  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: formTokens.fieldBg,
      borderRadius: small ? '9px' : '10px',
      fontFamily: mono ? formTokens.mono : 'inherit',
      fontSize: small ? '0.9375rem' : '1rem',
      fontWeight: 500,
      color: formTokens.textPrimary,
      transition: 'border-color .15s ease, box-shadow .15s ease',
      '& fieldset': {
        borderColor: formTokens.border,
        borderWidth: '1.5px',
        transition: 'border-color .15s ease',
      },
      '&:hover fieldset': { borderColor: formTokens.borderHover },
      '&.Mui-focused': { boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}` },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '1.5px',
      },
      '&.Mui-error fieldset': { borderColor: theme.palette.error.main },
      '&.Mui-error.Mui-focused': {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.15)}`,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: small ? '10px 12px' : '13px 15px',
      letterSpacing: mono ? '0.03em' : 'normal',
      '&::placeholder': {
        fontFamily: theme.typography.fontFamily,
        letterSpacing: 'normal',
        color: formTokens.textMuted,
        opacity: 1,
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: 7,
      fontSize: '0.78rem',
      color: formTokens.textMuted,
      '&.Mui-error': { color: theme.palette.error.main },
    },
  };
});

export interface SegmentedToggleOption {
  value: string;
  label: ReactNode;
  color?: string;
}

interface SegmentedToggleProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedToggleOption[];
  sx?: SxProps<Theme>;
}

/**
 * Segmented control (π.χ. ΜΙΣΟ / ΟΛΟΚΛΗΡΟ): γκρι track, το επιλεγμένο γίνεται λευκό "pill".
 * Κάθε option: { value, label, color } - το `color` βάφει το κείμενο όταν είναι επιλεγμένο.
 */
export function SegmentedToggle({ value, onChange, options, sx }: SegmentedToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        background: formTokens.segmentTrack,
        borderRadius: '9px',
        padding: '3px',
        ...sx,
      }}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Box
            component="button"
            type="button"
            key={option.value}
            onClick={() => {
              if (!selected) onChange(option.value);
            }}
            sx={{
              flex: 1,
              border: 0,
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: 'inherit',
              fontSize: '0.78rem',
              letterSpacing: '0.02em',
              padding: '7px 4px',
              borderRadius: '7px',
              transition: 'all .15s ease',
              backgroundColor: selected ? '#ffffff' : 'transparent',
              color: selected ? option.color || formTokens.textPrimary : formTokens.textSecondary,
              fontWeight: selected ? 600 : 500,
              boxShadow: selected ? formTokens.segmentShadow : 'none',
              '&:hover': selected ? {} : { color: formTokens.textPrimary },
            }}
          >
            {option.label}
          </Box>
        );
      })}
    </Box>
  );
}

/** Γκρι πάνελ (π.χ. "Επιλεγμένες διατομές"). */
export const SelectedPanel = styled(Box)(({ theme }) => ({
  background: formTokens.panelBg,
  border: `1px solid ${formTokens.hairline}`,
  borderRadius: theme.custom.radius.md,
  padding: theme.spacing(2, 2.25),
}));

interface DesignChipProps {
  label: ReactNode;
  onDelete?: () => void;
}

/** Chip σε mono γραμματοσειρά με στρογγυλό κουμπί διαγραφής. */
export function DesignChip({ label, onDelete }: DesignChipProps) {
  return (
    <Box
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        background: formTokens.cardBg,
        border: `1.5px solid ${alpha(theme.palette.primary.main, 0.28)}`,
        color: theme.palette.primary.main,
        fontFamily: formTokens.mono,
        fontSize: '0.84rem',
        fontWeight: 500,
        padding: theme.spacing(0.9, 1, 0.9, 1.6),
        borderRadius: theme.custom.radius.pill,
      })}
    >
      {label}
      {onDelete && (
        <Box
          component="button"
          type="button"
          aria-label={`Αφαίρεση ${label}`}
          onClick={onDelete}
          sx={(theme) => ({
            width: 17,
            height: 17,
            border: 0,
            padding: 0,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.7rem',
            fontWeight: 700,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color .15s ease',
            '&:hover': { background: alpha(theme.palette.primary.main, 0.2) },
          })}
        >
          ×
        </Box>
      )}
    </Box>
  );
}

interface MonoValueProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/** Τιμή σε monospace (σύνολα, αριθμοί). */
export function MonoValue({ children, sx }: MonoValueProps) {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: formTokens.mono,
        fontSize: '0.9rem',
        fontWeight: 500,
        color: formTokens.textPrimary,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

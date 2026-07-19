import React from 'react';
import { Box, Typography, Chip, Stack, Divider } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { formatDateForDisplay } from '../../../../utils/dateUtils';
import {
  Close as CloseIcon,
  Person,
  Business,
  Email,
  Phone,
  CalendarMonth,
  Tag,
  CheckCircle,
} from '@mui/icons-material';
import {
  StyledModal,
  ModalHeader,
  HeaderIcon,
  HeaderTitle,
  HeaderSubtitle,
  StyledCloseButton,
  ModalContent,
} from '../../../common/styled/CommonModals';
import { StyledPaper } from '../../../common/styled/CommonPapers';
import { customerType_colors, customerType_mapping } from '../../../Models/Customer';

const SectionLabel = ({ children }) => (
  <Typography
    variant="overline"
    sx={{
      color: 'text.secondary',
      fontWeight: 700,
      letterSpacing: '0.06em',
      display: 'block',
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const InfoTile = ({ icon, label, value, accent }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2.5,
      borderRadius: '14px',
      border: '1px solid rgba(0,0,0,0.06)',
      backgroundColor: '#fff',
      height: '100%',
    }}
  >
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha(accent, 0.12),
        color: accent,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ overflow: 'hidden' }}>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontSize: '0.78rem' }}
      >
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }} noWrap>
        {value}
      </Typography>
    </Box>
  </Box>
);

export const CustomerDetailModal = ({ open, customer, onClose }) => {
  const theme = useTheme();
  if (!customer) return null;

  const typeAccent = customerType_colors[customer.type] || customerType_colors.individual;
  const typeLabel = customerType_mapping[customer.type] || customer.type;
  const TypeIcon = customer.type === 'factory' ? Business : Person;

  return (
    <StyledModal open={open} onClose={onClose} closeAfterTransition>
      <StyledPaper className={open ? 'modal-enter' : ''} sx={{ maxWidth: '900px' }}>
        <ModalHeader>
          <HeaderIcon
            sx={{ '& .MuiSvgIcon-root': { color: `${typeAccent.base} !important`, filter: 'none' } }}
          >
            <TypeIcon />
          </HeaderIcon>
          <Box flex={1}>
            <HeaderTitle id="customer-modal-title">
              {customer.name || 'Άγνωστος Πελάτης'}
            </HeaderTitle>
            <HeaderSubtitle>
              Πελάτης #{customer.id} • {typeLabel}
            </HeaderSubtitle>
          </Box>
          <StyledCloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </StyledCloseButton>
        </ModalHeader>

        <ModalContent>
          <Box sx={{ p: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3.5 }}>
              <Chip
                label={typeLabel}
                sx={{
                  backgroundColor: alpha(typeAccent.base, 0.2),
                  color: typeAccent.dark,
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<CheckCircle sx={{ fontSize: 18 }} />}
                label="Ενεργός"
                sx={{
                  backgroundColor: alpha('#4caf50', 0.12),
                  color: '#2e7d32',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: '#2e7d32' },
                }}
              />
            </Stack>

            <SectionLabel>Στοιχεία Επικοινωνίας</SectionLabel>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2.5,
                mb: 4,
              }}
            >
              <InfoTile
                icon={<Email />}
                label="Email"
                value={customer.email || 'Δεν έχει οριστεί'}
                accent={theme.palette.primary.main}
              />
              <InfoTile
                icon={<Phone />}
                label="Τηλέφωνο"
                value={customer.phone || 'Δεν έχει οριστεί'}
                accent="#00796b"
              />
            </Box>

            <Divider sx={{ mb: 4 }} />

            <SectionLabel>Πληροφορίες Λογαριασμού</SectionLabel>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2.5,
              }}
            >
              <InfoTile
                icon={<CalendarMonth />}
                label="Ημ/νία Εγγραφής"
                value={customer.createdAt ? formatDateForDisplay(customer.createdAt) : 'Δεν έχει οριστεί'}
                accent="#e65100"
              />
              <InfoTile
                icon={<Tag />}
                label="ID Πελάτη"
                value={`#${customer.id}`}
                accent="#5e35b1"
              />
            </Box>
          </Box>
        </ModalContent>
      </StyledPaper>
    </StyledModal>
  );
};

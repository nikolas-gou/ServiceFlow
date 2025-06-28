import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  styled,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person,
  Business,
  Email,
  Phone,
  CalendarToday,
  AccountCircle,
} from '@mui/icons-material';

// Modal styling
const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '1200px',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  minHeight: '60px',
}));

const ModalContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
  padding: '0',
});

// Styled Components
const HeaderCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: 'white',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
  elevation: 6,
}));

const HeaderAvatar = styled(Avatar)({
  width: 50,
  height: 50,
  backgroundColor: 'rgba(255,255,255,0.15)',
  border: '2px solid rgba(255,255,255,0.25)',
});

const HeaderChip = styled(Chip)({
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  height: 20,
});

const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  elevation: 4,
}));

const CategoryIcon = styled(Box)(({ theme, bgcolor }) => ({
  position: 'absolute',
  top: -16,
  left: 16,
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette[bgcolor]?.main || bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `0 4px 12px ${theme.palette[bgcolor]?.main}40` || `0 4px 12px ${bgcolor}40`,
}));

const ColoredBox = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette[color]?.light || color,
  borderRadius: theme.spacing(2),
  height: '100%',
}));

// Common styles object
const commonStyles = {
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWrap: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    variant: 'h6',
    fontWeight: 'bold',
    mb: 2,
  },
  whiteText: {
    color: 'white',
  },
  whiteTextSemi: {
    color: 'white',
    opacity: 0.9,
  },
  cardContent: {
    pt: 3,
    pb: 3,
  },
  fullHeight: {
    height: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
};

export const CustomerDetailModal = ({ open, customer, onClose }) => {
  if (!customer) return null;

  const getTypeChip = (type) => {
    const typeConfig = {
      individual: { label: 'Ιδιώτης', color: 'primary' },
      factory: { label: 'Εργοστάσιο', color: 'warning' },
    };

    const config = typeConfig[type] || { label: type, color: 'default' };

    return (
      <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 'bold' }} />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Δεν έχει οριστεί';
    return new Date(dateString).toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderHeader = () => (
    <HeaderCard>
      <Box sx={commonStyles.headerContainer}>
        <HeaderAvatar>{customer.type === 'individual' ? <Person /> : <Business />}</HeaderAvatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ ...commonStyles.whiteText, fontWeight: 'bold', mb: 0.5 }}>
            {customer.name || 'Άγνωστος Πελάτης'}
          </Typography>
          <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
            ID: #{customer.id} • {customer.type === 'individual' ? 'Ιδιώτης' : 'Εργοστάσιο'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <HeaderChip label={`ID: ${customer.id}`} />
          {getTypeChip(customer.type)}
        </Stack>
      </Box>
    </HeaderCard>
  );

  const renderBasicInfo = () => (
    <Grid item xs={12} md={6}>
      <MainCard>
        <CategoryIcon bgcolor="primary">
          <AccountCircle />
        </CategoryIcon>
        <CardContent sx={commonStyles.cardContent}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Βασικές Πληροφορίες
          </Typography>
          <Stack spacing={2}>
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" color="text.secondary">
                Όνομα
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {customer.name || 'Δεν έχει οριστεί'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" color="text.secondary">
                Τύπος
              </Typography>
              {getTypeChip(customer.type)}
            </Box>
            <Divider />
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" color="text.secondary">
                ID Πελάτη
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                #{customer.id}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </MainCard>
    </Grid>
  );

  const renderContactInfo = () => (
    <Grid item xs={12} md={6}>
      <MainCard>
        <CategoryIcon bgcolor="secondary">
          <Email />
        </CategoryIcon>
        <CardContent sx={commonStyles.cardContent}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Επικοινωνία
          </Typography>
          <Stack spacing={2}>
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {customer.email || 'Δεν έχει οριστεί'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" color="text.secondary">
                Τηλέφωνο
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {customer.phone || 'Δεν έχει οριστεί'}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </MainCard>
    </Grid>
  );

  const renderSystemInfo = () => (
    <Grid item xs={12}>
      <MainCard>
        <CategoryIcon bgcolor="info">
          <CalendarToday />
        </CategoryIcon>
        <CardContent sx={commonStyles.cardContent}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Πληροφορίες Συστήματος
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ColoredBox color="info">
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Ημ/νία Δημιουργίας
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatDate(customer.createdAt)}
                </Typography>
              </ColoredBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <ColoredBox color="success">
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Κατάσταση
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Ενεργός
                </Typography>
              </ColoredBox>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </Grid>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box sx={ModalStyle}>
          <ModalHeader>
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Λεπτομέρειες Πελάτη
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {customer.id}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {getTypeChip(customer.type)}
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </ModalHeader>

          <ModalContent>
            <Box sx={{ p: 3 }}>
              {renderHeader()}
              <Grid container spacing={3}>
                {renderBasicInfo()}
                {renderContactInfo()}
                {renderSystemInfo()}
              </Grid>
            </Box>
          </ModalContent>
        </Box>
      </Fade>
    </Modal>
  );
};

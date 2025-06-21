import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Engineering,
  ElectricBolt,
  Cable,
  Memory,
  Settings,
  Info,
  Person,
  Tune,
} from '@mui/icons-material';

const connectionismTranslated = {
  simple: 'Απλή',
  '1-parallel': '1 φορά παράλληλη',
  '2-parallel': '2 φορές παράλληλη',
  '3-parallel': '3 φορές παράλληλη',
  '4-parallel': '4 φορές παράλληλη',
};

const volt_types_mapping = {
  '380VY': '380V Y',
  '220VΔ': '220V Δ',
  '400VY': '400V Y',
  '230VΔ': '230V Δ',
};

function CombinedCollapsedContent2({ repair }) {
  const motor = repair.motor || {};
  const customer = repair.customer || {};

  const techSpecs = [
    { label: 'Βήμα', value: motor.step },
    { label: 'Μισό Βήμα', value: motor.halfStep },
    { label: 'Βοηθητικό Βήμα', value: motor.helperStep },
    { label: 'Σπείρες', value: motor.spiral },
    { label: 'Μισές Σπείρες', value: motor.halfSpiral },
    { label: 'Βοηθητικές Σπείρες', value: motor.helperSpiral },
    { label: 'Διατομή', value: motor.crossSection },
    { label: 'Μισή Διατομή', value: motor.halfCrossSection },
    { label: 'Βοηθητική Διατομή', value: motor.helperCrossSection },
    { label: 'Σύνδεση', value: connectionismTranslated[motor.connectionism] },
  ].filter((spec) => spec.value);

  return (
    <Box sx={{ m: 3 }}>
      {/* Floating header */}
      <Card
        elevation={8}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          color: 'white',
          borderRadius: 4,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            <Engineering sx={{ fontSize: 30 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {motor.manufacturer}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {motor.serialNumber} • {motor.typeOfMotor} • {motor.typeOfVolt}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight="bold">
              {motor.kw}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              kW
            </Typography>
          </Box>
        </Box>

        {/* Floating badges */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: 20,
            display: 'flex',
            gap: 1,
          }}
        >
          <Chip
            label={`${motor.hp}HP`}
            sx={{ bgcolor: 'warning.main', color: 'white', fontWeight: 'bold' }}
          />
          <Chip
            label={`${motor.rpm || '1490'}RPM`}
            sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 'bold' }}
          />
        </Box>
      </Card>

      {/* Info Chips */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip label={`Τάση: ${volt_types_mapping[motor.volt] || '-'}`} icon={<ElectricBolt />} />
        <Chip label={`Πόλοι: ${motor.poles || '-'}`} icon={<Cable />} />
        <Chip
          label={`Σύνδεση: ${connectionismTranslated[motor.connectionism] || '-'}`}
          icon={<Tune />}
        />
      </Stack>

      {/* Technical Specs Card */}
      {techSpecs.length > 0 && (
        <Card elevation={2} sx={{ borderRadius: 3, mb: 3, p: 2, backgroundColor: '#f9fafb' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Τεχνικά Χαρακτηριστικά
            </Typography>
            <Grid container spacing={2}>
              {techSpecs.map((spec, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {spec.label}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {spec.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Repair and Customer Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Πληροφορίες Επισκευής
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Κατάσταση:</strong> {repair.repairStatus}
                </Typography>
                <Typography variant="body2">
                  <strong>Κόστος:</strong> {repair.cost || '-'}
                </Typography>
                <Typography variant="body2">
                  <strong>Ημ. Δημιουργίας:</strong> {repair.createdAt?.toString().split('T')[0]}
                </Typography>
                <Typography variant="body2">
                  <strong>Εκτιμώμενη Ολοκλήρωση:</strong> {repair.estimatedIsComplete}
                </Typography>
                <Typography variant="body2">
                  <strong>Περιγραφή:</strong> {repair.description || '-'}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {customer.name && (
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Στοιχεία Πελάτη
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Όνομα:</strong> {customer.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {customer.email || '-'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Τηλέφωνο:</strong> {customer.phone || '-'}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default CombinedCollapsedContent2;

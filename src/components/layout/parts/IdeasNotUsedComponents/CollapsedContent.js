import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
  Badge,
} from '@mui/material';
import {
  ElectricBolt,
  Speed,
  Settings,
  Info,
  Engineering,
  Cable,
  Memory,
  Tune,
  Person,
} from '@mui/icons-material';

import { typeOfMotor_mapping, typeOfVolt_mapping, typeOfVolt_translated } from '../../Models/Motor';

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

// Ιδέα 1: Card-based Layout με Icons
function CollapsedContentV1({ repair }) {
  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Engineering color="primary" />
        Λεπτομέρειες Κινητήρα
      </Typography>

      <Grid container spacing={2}>
        {/* Βασικά Χαρακτηριστικά */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <ElectricBolt color="warning" />
                Ηλεκτρικά Χαρακτηριστικά
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {repair.motor.kw || '-'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      kW
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">
                      {repair.motor.hp || '-'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      HP
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">
                      {repair.motor.rpm || '1490'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      RPM
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Chip
                      label={volt_types_mapping[repair.motor.volt] || repair.motor.volt}
                      color="info"
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Τεχνικά Χαρακτηριστικά */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Settings color="action" />
                Τεχνικά Στοιχεία
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Βήμα:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {repair.motor.step || '-'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Σπείρες:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {repair.motor.spiral || '-'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Διατομή:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {repair.motor.crossSection || '-'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Σύνδεση:
                  </Typography>
                  <Chip
                    size="small"
                    label={connectionismTranslated[repair.motor.connectionism] || '-'}
                    color="default"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Πόλοι:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {repair.motor.poles || '-'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Επιπλέον Στοιχεία αν υπάρχουν */}
        {(repair.motor.halfStep || repair.motor.helperStep || repair.motor.halfSpiral) && (
          <Grid item xs={12}>
            <Card elevation={1} sx={{ bgcolor: 'grey.50' }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <Tune color="info" />
                  Επιπλέον Στοιχεία
                </Typography>
                <Grid container spacing={2}>
                  {repair.motor.halfStep && (
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Μισό Βήμα:
                      </Typography>
                      <Typography variant="body1">{repair.motor.halfStep}</Typography>
                    </Grid>
                  )}
                  {repair.motor.helperStep && (
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Βοηθητικό Βήμα:
                      </Typography>
                      <Typography variant="body1">{repair.motor.helperStep}</Typography>
                    </Grid>
                  )}
                  {repair.motor.halfSpiral && (
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Μισές Σπείρες:
                      </Typography>
                      <Typography variant="body1">{repair.motor.halfSpiral}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Περιγραφή Επισκευής */}
        {repair.description && (
          <Grid item xs={12}>
            <Card elevation={1} sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <Info />
                  Περιγραφή Επισκευής
                </Typography>
                <Typography variant="body1">{repair.description}</Typography>
                {repair.notes && (
                  <>
                    <Divider sx={{ my: 1, borderColor: 'info.dark' }} />
                    <Typography variant="body2">
                      <strong>Σημειώσεις:</strong> {repair.notes}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

// Ιδέα 2: Compact με Badges και Metrics
function CollapsedContentV2({ repair }) {
  return (
    <Box sx={{ margin: 2 }}>
      {/* Header με βασικά στοιχεία */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <Engineering />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            {repair.motor.manufacturer} - {repair.motor.serialNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {repair.motor.typeOfMotor} • {repair.motor.typeOfVolt}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h5" color="primary">
            {repair.motor.kw}kW
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {repair.motor.hp}HP
          </Typography>
        </Box>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" color="primary">
              {repair.motor.step || '-'}
            </Typography>
            <Typography variant="caption">Βήμα</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" color="secondary">
              {repair.motor.spiral || '-'}
            </Typography>
            <Typography variant="caption">Σπείρες</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" color="success.main">
              {repair.motor.crossSection || '-'}
            </Typography>
            <Typography variant="caption">Διατομή</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" color="warning.main">
              {repair.motor.poles || '-'}
            </Typography>
            <Typography variant="caption">Πόλοι</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Badges για επιπλέον πληροφορίες */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip
          icon={<Cable />}
          label={connectionismTranslated[repair.motor.connectionism]}
          color="primary"
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<ElectricBolt />}
          label={volt_types_mapping[repair.motor.volt]}
          color="warning"
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<Speed />}
          label={`${repair.motor.rpm || '1490'} RPM`}
          color="info"
          variant="outlined"
          size="small"
        />
        {repair.motor.howManyCoilsWith && (
          <Chip
            label={`${repair.motor.howManyCoilsWith} Πηνία`}
            color="default"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      {/* Περιγραφή σε compact format */}
      {repair.description && (
        <Card elevation={0} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <CardContent sx={{ py: 1 }}>
            <Typography variant="body2">
              <strong>Περιγραφή:</strong> {repair.description}
            </Typography>
            {repair.notes && (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                <strong>Σημειώσεις:</strong> {repair.notes}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

// Ιδέα 3: Timeline/Progress Style
function CollapsedContentV3({ repair }) {
  const specs = [
    {
      label: 'Ισχύς',
      value: `${repair.motor.kw}kW / ${repair.motor.hp}HP`,
      icon: <ElectricBolt />,
    },
    {
      label: 'Βήμα/Σπείρες',
      value: `${repair.motor.step} / ${repair.motor.spiral}`,
      icon: <Memory />,
    },
    { label: 'Διατομή', value: repair.motor.crossSection, icon: <Cable /> },
    {
      label: 'Σύνδεση',
      value: connectionismTranslated[repair.motor.connectionism],
      icon: <Tune />,
    },
    {
      label: 'Τάση/Πόλοι',
      value: `${volt_types_mapping[repair.motor.volt]} / ${repair.motor.poles}P`,
      icon: <Settings />,
    },
  ];

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Τεχνικά Χαρακτηριστικά - {repair.motor.manufacturer}
      </Typography>

      <Grid container spacing={1}>
        {specs.map((spec, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ color: 'primary.main' }}>{spec.icon}</Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {spec.label}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {spec.value || '-'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Επιπλέον στοιχεία αν υπάρχουν */}
      {(repair.motor.halfStep || repair.motor.helperStep) && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Επιπλέον Στοιχεία:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {repair.motor.halfStep && (
              <Chip label={`Μισό Βήμα: ${repair.motor.halfStep}`} size="small" />
            )}
            {repair.motor.helperStep && (
              <Chip label={`Βοηθητικό: ${repair.motor.helperStep}`} size="small" />
            )}
          </Box>
        </Box>
      )}

      {repair.description && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Περιγραφή Επισκευής:</strong> {repair.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// Ιδέα 4: Dashboard Style με Progress Indicators
function CollapsedContentV4({ repair }) {
  const powerPercentage = Math.min((repair.motor.kw / 100) * 100, 100); // Assuming max 100kW
  const rpmPercentage = Math.min(((repair.motor.rpm || 1490) / 3000) * 100, 100);

  return (
    <Box sx={{ margin: 2 }}>
      {/* Header με status badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Engineering color="primary" />
          Προφίλ Κινητήρα
        </Typography>
        <Chip
          label={repair.isArrived ? 'Παραληφθέν' : 'Αναμονή'}
          color={repair.isArrived ? 'success' : 'warning'}
          variant="filled"
        />
      </Box>

      {/* Main specs σε dashboard style */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Typography variant="h4" fontWeight="bold">
                {repair.motor.manufacturer}
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  S/N
                </Typography>
                <Typography variant="h6">{repair.motor.serialNumber}</Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold">
                    {repair.motor.kw || '0'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Kilowatts
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold">
                    {repair.motor.hp || '0'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Horsepower
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold">
                    {repair.motor.rpm || '1490'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    RPM
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
              <ElectricBolt sx={{ fontSize: 40, color: 'success.dark', mb: 1 }} />
              <Typography variant="h6" color="success.dark">
                {volt_types_mapping[repair.motor.volt]}
              </Typography>
              <Typography variant="body2" color="success.dark">
                Τάση
              </Typography>
            </Card>
            <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
              <Settings sx={{ fontSize: 40, color: 'info.dark', mb: 1 }} />
              <Typography variant="h6" color="info.dark">
                {repair.motor.poles}P
              </Typography>
              <Typography variant="body2" color="info.dark">
                Πόλοι
              </Typography>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Technical specs table */}
      <Card sx={{ mt: 3, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
          <Typography variant="h6">Τεχνικές Προδιαγραφές</Typography>
        </Box>
        <Grid container>
          {[
            { label: 'Βήμα', value: repair.motor.step, color: 'primary.light' },
            { label: 'Σπείρες', value: repair.motor.spiral, color: 'secondary.light' },
            { label: 'Διατομή', value: repair.motor.crossSection, color: 'success.light' },
            {
              label: 'Σύνδεση',
              value: connectionismTranslated[repair.motor.connectionism],
              color: 'warning.light',
            },
          ].map((spec, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: spec.color,
                  minHeight: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="white">
                  {spec.value || '-'}
                </Typography>
                <Typography variant="caption" color="white" sx={{ opacity: 0.9 }}>
                  {spec.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      {repair.description && (
        <Card sx={{ mt: 2, p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="body1">{repair.description}</Typography>
        </Card>
      )}
    </Box>
  );
}

// Ιδέα 5: Material Design με Floating Elements
function CollapsedContentV5({ repair }) {
  return (
    <Box sx={{ margin: 2 }}>
      {/* Floating header card */}
      <Card
        elevation={8}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.3)',
            }}
          >
            <Engineering sx={{ fontSize: 30 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {repair.motor.manufacturer}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {repair.motor.serialNumber} • {repair.motor.typeOfMotor}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight="bold">
              {repair.motor.kw}
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
            label={`${repair.motor.hp}HP`}
            sx={{ bgcolor: 'warning.main', color: 'white', fontWeight: 'bold' }}
          />
          <Chip
            label={`${repair.motor.rpm || '1490'}RPM`}
            sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 'bold' }}
          />
        </Box>
      </Card>
      {/* Floating spec cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: 'Τεχνικα Χαρακτηριστικά',
            specs: [
              { label: 'Βήμα', value: repair.motor.step },
              { label: 'Σπείρες', value: repair.motor.spiral },
              { label: 'Διατομή', value: repair.motor.crossSection },
            ],
            icon: <Memory />,
            color: 'primary',
          },
          {
            title: 'Ηλεκτρικά',
            specs: [
              { label: 'Τάση', value: volt_types_mapping[repair.motor.volt] },
              { label: 'Σύνδεση', value: connectionismTranslated[repair.motor.connectionism] },
              { label: 'Πόλοι', value: repair.motor.poles },
            ],
            icon: <ElectricBolt />,
            color: 'secondary',
          },
        ].map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'visible',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              {/* Category icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: `${category.color}.main`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                {category.icon}
              </Box>

              <CardContent sx={{ pt: 4 }}>
                <Typography variant="h6" gutterBottom color={`${category.color}.main`}>
                  {category.title}
                </Typography>
                <Stack spacing={1}>
                  {category.specs.map((spec, specIndex) => (
                    <Box
                      key={specIndex}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {spec.label}:
                      </Typography>
                      <Chip
                        label={spec.value || '-'}
                        size="small"
                        variant="outlined"
                        color={category.color}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Description με modern styling */}
      {repair.description && (
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(145deg, #f5f5f5 0%, #e0e0e0 100%)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Info color="info" />
              <Typography variant="h6" color="info.main">
                Περιγραφή Επισκευής
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {repair.description}
            </Typography>
            {repair.notes && (
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Σημειώσεις:</strong> {repair.notes}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

// Ιδέα 6: Minimal & Clean με Typography Focus
function CollapsedContentV6({ repair }) {
  const mainSpecs = [
    { value: repair.motor.kw, unit: 'kW', label: 'Ισχύς' },
    { value: repair.motor.hp, unit: 'HP', label: 'Άλογα' },
    { value: repair.motor.rpm || '1490', unit: 'RPM', label: 'Στροφές' },
  ];

  const technicalSpecs = [
    { label: 'Βήμα', value: repair.motor.step },
    { label: 'Σπείρες', value: repair.motor.spiral },
    { label: 'Διατομή', value: repair.motor.crossSection },
    { label: 'Σύνδεση', value: connectionismTranslated[repair.motor.connectionism] },
    { label: 'Τάση', value: volt_types_mapping[repair.motor.volt] },
    { label: 'Πόλοι', value: repair.motor.poles },
  ];

  return (
    <Box sx={{ margin: 3 }}>
      {/* Clean header */}
      <Box sx={{ mb: 4, pb: 2, borderBottom: 2, borderColor: 'primary.main' }}>
        <Typography variant="h4" fontWeight="300" color="primary.main" gutterBottom>
          {repair.motor.manufacturer}
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight="300">
          {repair.motor.serialNumber} • {repair.motor.typeOfMotor}
        </Typography>
      </Box>

      {/* Main metrics με clean design */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {mainSpecs.map((spec, index) => (
          <Grid item xs={4} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                fontWeight="100"
                color="primary.main"
                sx={{ lineHeight: 1, mb: 0.5 }}
              >
                {spec.value || '0'}
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight="300">
                {spec.unit}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {spec.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Technical specs σε minimal table */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="300" color="text.primary" gutterBottom>
          Τεχνικές Προδιαγραφές
        </Typography>
        <Grid container spacing={2}>
          {technicalSpecs.map((spec, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box
                sx={{
                  py: 2,
                  px: 3,
                  border: 1,
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                  },
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block">
                  {spec.label}
                </Typography>
                <Typography variant="h6" fontWeight="400" color="text.primary">
                  {spec.value || '-'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Description με minimal styling */}
      {repair.description && (
        <Box
          sx={{
            p: 3,
            bgcolor: 'grey.50',
            borderLeft: 4,
            borderColor: 'info.main',
            borderRadius: '0 4px 4px 0',
          }}
        >
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7 }}>
            "{repair.description}"
          </Typography>
          {repair.notes && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
              {repair.notes}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// Ιδέα 7: Tech/Industrial με Data Visualization Style
function CollapsedContentV7({ repair }) {
  const specs = [
    {
      category: 'POWER',
      items: [
        { label: 'kW', value: repair.motor.kw, max: 100, color: 'error' },
        { label: 'HP', value: repair.motor.hp, max: 150, color: 'warning' },
        { label: 'RPM', value: repair.motor.rpm || 1490, max: 3000, color: 'success' },
      ],
    },
    {
      category: 'WINDING',
      items: [
        { label: 'Step', value: repair.motor.step, isText: true },
        { label: 'Turns', value: repair.motor.spiral, isText: true },
        { label: 'Cross Section', value: repair.motor.crossSection, isText: true },
      ],
    },
  ];

  return (
    <Box sx={{ margin: 2, bgcolor: '#0a0a0a', color: 'white', p: 3, borderRadius: 2 }}>
      {/* Terminal-style header */}
      <Box sx={{ mb: 3, fontFamily: 'monospace' }}>
        <Typography variant="caption" color="success.main">
          SYSTEM@MOTOR-REPAIR:~$
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
          cat {repair.motor.manufacturer}_{repair.motor.serialNumber}.spec
        </Typography>
      </Box>

      {/* Data visualization style */}
      <Grid container spacing={3}>
        {specs.map((category, catIndex) => (
          <Grid item xs={12} md={6} key={catIndex}>
            <Box sx={{ border: 1, borderColor: 'grey.700', borderRadius: 1, p: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                {category.category}
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {category.items.map((item, itemIndex) => (
                  <Box key={itemIndex}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" color={`${item.color || 'white'}.main`}>
                        {item.value || 'NULL'}
                      </Typography>
                    </Box>
                    {!item.isText && item.value && (
                      <Box
                        sx={{
                          height: 4,
                          bgcolor: 'grey.800',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                            bgcolor: `${item.color}.main`,
                            transition: 'width 1s ease-in-out',
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* System info */}
      <Box sx={{ mt: 3, p: 2, border: 1, borderColor: 'grey.700', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'grey.400' }}>
          ELECTRICAL: {volt_types_mapping[repair.motor.volt]} | CONNECTION:{' '}
          {connectionismTranslated[repair.motor.connectionism]} | POLES: {repair.motor.poles}
        </Typography>
        {repair.description && (
          <Typography variant="body2" sx={{ mt: 1, color: 'info.main' }}>
            REPAIR_DESC: "{repair.description}"
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// Βελτιωμένη Ιδέα 5: Material Design με Floating Elements
function CollapsedContentV8({ repair }) {
  return (
    <Box sx={{ margin: 2 }}>
      {/* Compact floating header card */}
      <Card
        elevation={6}
        sx={{
          p: 2.5,
          mb: 3,
          background: 'linear-gradient(45deg, #607D8B 30%, #78909C 90%)', // Πιο διακριτικό γκρι-μπλε
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 50, // Μικρότερο από 60
              height: 50,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            <Engineering sx={{ fontSize: 24 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {' '}
              {/* Μικρότερο από h5 */}
              {repair.motor.manufacturer} {' - '} {repair.customer.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {'S/N: '}
              {repair.motor.serialNumber} • {typeOfMotor_mapping[repair.motor.typeOfMotor]}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" fontWeight="bold">
              {' '}
              {/* Μικρότερο από h4 */}
              {repair.motor.volt}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {typeOfVolt_mapping[repair.motor.typeOfVolt]}
            </Typography>
          </Box>
        </Box>

        {/* Floating badges */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: 20,
            display: 'flex',
            gap: 1,
          }}
        >
          <Chip
            label={`${repair.motor.kw}KW`}
            size="small"
            sx={{ bgcolor: 'info.main', color: 'white', fontWeight: 'bold' }}
          />
          <Chip
            label={`${repair.motor.hp}HP`}
            size="small"
            sx={{ bgcolor: 'warning.main', color: 'white', fontWeight: 'bold' }}
          />
          <Chip
            label={`${repair.motor.rpm || '1490'}RPM`}
            size="small"
            sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 'bold' }}
          />
        </Box>
      </Card>

      {/* Client Info Card */}
      {repair.client && (
        <Card
          elevation={3}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'primary.light',
            background: 'linear-gradient(145deg, #E3F2FD 0%, #BBDEFB 100%)',
          }}
        >
          <CardContent sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                }}
              >
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h6" color="primary.main">
                  {repair.client.name || 'Πελάτης'}
                </Typography>
                {repair.client.phone && (
                  <Typography variant="body2" color="text.secondary">
                    📞 {repair.client.phone}
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Spec cards - Αναδιοργανωμένα */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: 'Τυλίγματα',
            specs: [
              { label: 'Βήμα', value: repair.motor.step },
              {
                label: 'Σπείρες',
                value: repair.motor.spiral
                  ? `${repair.motor.spiral} ${
                      repair.motor.typeOfStep === 'half'
                        ? '(μισές)'
                        : repair.motor.typeOfStep === 'combined'
                        ? '(ολοκληρες)'
                        : ''
                    }`
                  : '-',
              },

              { label: 'Διατομή', value: repair.motor.crossSection },
            ],
            icon: <Memory />,
            color: 'primary',
          },
          {
            title: 'Γενικά Χαρακτηριστικά',
            specs: [
              { label: 'Τάση', value: volt_types_mapping[repair.motor.volt] },
              { label: 'Σύνδεση', value: connectionismTranslated[repair.motor.connectionism] },
              { label: 'Πόλοι', value: repair.motor.poles },
            ],
            icon: <ElectricBolt />,
            color: 'secondary',
          },
        ].map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'visible',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              {/* Category icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: `${category.color}.main`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                {category.icon}
              </Box>

              <CardContent sx={{ pt: 4 }}>
                <Typography variant="h6" gutterBottom color={`${category.color}.main`}>
                  {category.title}
                </Typography>
                <Stack spacing={1}>
                  {category.specs.map((spec, specIndex) => (
                    <Box
                      key={specIndex}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {spec.label}:
                      </Typography>
                      <Chip
                        label={spec.value || '-'}
                        size="small"
                        variant="outlined"
                        color={category.color}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Description με modern styling */}
      {repair.description && (
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(145deg, #f5f5f5 0%, #e0e0e0 100%)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Info color="info" />
              <Typography variant="h6" color="info.main">
                Περιγραφή Επισκευής
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {repair.description}
            </Typography>
            {repair.notes && (
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Σημειώσεις:</strong> {repair.notes}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export {
  CollapsedContentV1,
  CollapsedContentV2,
  CollapsedContentV3,
  CollapsedContentV4,
  CollapsedContentV5,
  CollapsedContentV6,
  CollapsedContentV7,
  CollapsedContentV8,
};

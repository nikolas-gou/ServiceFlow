import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Paper,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import {
  ArrowBack,
  Settings,
  Bolt,
  Speed,
  ElectricalServices,
  Build,
  CalendarMonth,
  Tag,
  Person,
  AttachMoney,
  Description,
  Inbox,
  Power,
  CheckCircleRounded,
  HistoryToggleOffRounded,
} from '@mui/icons-material';
import { formatDateForDisplay, formatDateNumeric } from '../../../utils/dateUtils';
import {
  volt_types_mapping,
  typeOfMotor_mapping,
  rpm_types_mapping,
  typeOfVolt_mapping,
  typeOfStep_mapping,
  repairStatus_mapping,
  repairStatus_colors,
  getMotorTypeString,
} from '../../Models/Motor';
import { getWindingConfigMapByType } from '../../../configs/motor';
import BoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/BoxInfoDisplay';
import CombinedBoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/CombinedBoxInfoDisplay';
import { CardConnectionism } from '../parts/CardConnectionism';
import { useMotorById, useMotorRepairs } from '../../../hooks/useMotors';
import LoadingCard from '../../common/LoadingCard';

const SectionLabel = ({ children }: { children: ReactNode }) => (
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

interface InfoTileProps {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  accent: string;
}

const InfoTile = ({ icon, label, value, accent }: InfoTileProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      borderRadius: '12px',
      border: '1px solid rgba(0,0,0,0.06)',
      backgroundColor: '#fff',
      height: '100%',
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: '10px',
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
        sx={{ color: 'text.secondary', display: 'block', mb: 0.3, fontSize: '0.72rem' }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }} noWrap>
        {value}
      </Typography>
    </Box>
  </Box>
);

const RepairStatusBadge = ({ status }: { status: string }) => {
  const label = repairStatus_mapping[status] || status;
  const color = repairStatus_colors[status] || '#757575';
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        height: '24px',
        backgroundColor: alpha(color, 0.12),
        color: color,
      }}
    />
  );
};

interface HistoryStatTileProps {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  accent: string;
}

const HistoryStatTile = ({ icon, label, value, accent }: HistoryStatTileProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      p: 2,
      borderRadius: '14px',
      border: '1px solid rgba(0,0,0,0.06)',
      backgroundColor: alpha(accent, 0.05),
      height: '100%',
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha(accent, 0.15),
        color: accent,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ overflow: 'hidden' }}>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', fontSize: '0.72rem' }}
        noWrap
      >
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.15rem' }} noWrap>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function MotorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: motor, isLoading: loadingMotor } = useMotorById(id);
  const { data: repairs = [], isLoading: loadingRepairs } = useMotorRepairs(id);

  if (loadingMotor || loadingRepairs) {
    return (
      <Box sx={{ mt: 2 }}>
        <LoadingCard />
      </Box>
    );
  }

  if (!motor) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Ο κινητήρας δεν βρέθηκε
        </Typography>
      </Box>
    );
  }

  const voltLabel = volt_types_mapping[motor.volt] || motor.volt || '-';
  const typeOfMotorLabel = typeOfMotor_mapping[motor.typeOfMotor] || motor.typeOfMotor || '-';
  const rpmLabel = rpm_types_mapping[motor.rpm] || motor.rpm || '-';
  const typeOfVoltLabel = typeOfVolt_mapping[motor.typeOfVolt] || motor.typeOfVolt || '-';
  const typeOfStepLabel = typeOfStep_mapping[motor.typeOfStep] || motor.typeOfStep || '-';

  const typeString = getMotorTypeString(motor);
  const windingConfig = getWindingConfigMapByType(motor, typeString);

  const latestRepairDate = repairs.reduce<string | Date | null>(
    (latest, r) =>
      !latest || (r.createdAt && new Date(r.createdAt) > new Date(latest)) ? r.createdAt ?? latest : latest,
    null,
  );

  return (
    <Box sx={{ mt: 2 }}>
      {/* Page Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Πίσω στους κινητήρες">
            <IconButton
              onClick={() => navigate('/dashboard/motors')}
              sx={{
                width: 38,
                height: 38,
                borderRadius: '999px',
                border: '1.5px solid #e2e5ea',
                '&:hover': { backgroundColor: '#f5f7fa' },
              }}
            >
              <ArrowBack fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              width: 4,
              height: 24,
              backgroundColor: 'primary.main',
              borderRadius: 4,
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Κινητήρας #{motor.id}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {motor.manufacturer || 'Άγνωστος'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Chips */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1 }}>
        {motor.serialNumber && (
          <Chip
            icon={<Tag sx={{ fontSize: 16, color: 'inherit !important' }} />}
            label={motor.serialNumber}
            sx={{
              backgroundColor: alpha('#5e35b1', 0.12),
              color: '#5e35b1',
              fontWeight: 700,
            }}
          />
        )}
        <Chip
          label={typeOfMotorLabel}
          sx={{
            backgroundColor: alpha('#2a5298', 0.12),
            color: '#1e3c72',
            fontWeight: 600,
          }}
        />
        <Chip
          label={typeOfVoltLabel}
          sx={{
            backgroundColor: alpha('#e65100', 0.12),
            color: '#e65100',
            fontWeight: 600,
          }}
        />
        <Chip
          label={typeOfStepLabel}
          sx={{
            backgroundColor: alpha('#00796b', 0.12),
            color: '#00796b',
            fontWeight: 600,
          }}
        />
        <Chip
          label={`${repairs.length} επισκευές`}
          sx={{
            backgroundColor: alpha('#ff9800', 0.12),
            color: '#e65100',
            fontWeight: 600,
          }}
        />
      </Stack>

      {/* Πληροφορίες Περιέλιξης */}
      {windingConfig && (
        <>
          <SectionLabel>Πληροφορίες Περιέλιξης</SectionLabel>
          {'splitCombined' in windingConfig ? (
            // Μονοφασικός συνδυασμένος: δύο boxes με στήλες ΜΙΣΟ/ΟΛΟΚΛΗΡΟ
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <CombinedBoxInfoDisplay {...windingConfig.left} />
              <CombinedBoxInfoDisplay {...windingConfig.right} />
            </Box>
          ) : 'combined' in windingConfig ? (
            // Τριφασικός συνδυασμένος: ένα box με στήλες ανά αριθμό βήματος
            <Box>
              <CombinedBoxInfoDisplay {...windingConfig} />
            </Box>
          ) : 'split' in windingConfig ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <BoxInfoDisplay {...windingConfig.left} />
              <BoxInfoDisplay {...windingConfig.right} />
            </Box>
          ) : (
            <Box>
              <BoxInfoDisplay {...windingConfig} />
            </Box>
          )}
          <CardConnectionism connectionism={motor.connectionism} />
          <Box sx={{ mb: 4 }} />
        </>
      )}

      {/* Τεχνικά Χαρακτηριστικά — σειρά προτεραιότητας: Τάση, Φάσεις, RPM, kW, Πόλοι, μετά τα υπόλοιπα */}
      <SectionLabel>Τεχνικά Χαρακτηριστικά</SectionLabel>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        <InfoTile
          icon={<ElectricalServices />}
          label="Τάση"
          value={voltLabel}
          accent="#7b1fa2"
        />
        <InfoTile
          icon={<Power />}
          label="Φάσεις"
          value={typeOfVoltLabel}
          accent="#e65100"
        />
        <InfoTile
          icon={<Speed />}
          label="Ταχύτητα"
          value={`${rpmLabel} RPM`}
          accent="#0277bd"
        />
        <InfoTile
          icon={<Bolt />}
          label="Ισχύς"
          value={`${motor.kw || '-'} kW / ${motor.hp || '-'} HP`}
          accent="#c62828"
        />
        <InfoTile
          icon={<Settings />}
          label="Πόλοι"
          value={motor.poles || '-'}
          accent="#5e35b1"
        />
        <InfoTile
          icon={<Bolt />}
          label="Ρεύμα"
          value={`${motor.amps || '-'} A`}
          accent="#ff9800"
        />
        <InfoTile
          icon={<CalendarMonth />}
          label="Ημ/νία Δημιουργίας"
          value={formatDateForDisplay(motor.createdAt)}
          accent="#2e7d32"
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Ιστορικό Επισκευών */}
      <SectionLabel>Ιστορικό Επισκευών</SectionLabel>

      {repairs.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Inbox sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Δεν υπάρχουν επισκευές για αυτόν τον κινητήρα
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Συνοπτικά στατιστικά ιστορικού */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
              gap: 2,
              mb: 3,
            }}
          >
            <HistoryStatTile
              icon={<Build fontSize="small" />}
              label="Σύνολο Επισκευών"
              value={repairs.length}
              accent="#2a5298"
            />
            <HistoryStatTile
              icon={<AttachMoney fontSize="small" />}
              label="Συνολικό Κόστος"
              value={`${repairs.reduce((sum, r) => sum + (Number(r.cost) || 0), 0)}€`}
              accent="#2e7d32"
            />
            <HistoryStatTile
              icon={<CheckCircleRounded fontSize="small" />}
              label="Ολοκληρωμένες"
              value={
                repairs.filter((r) => r.repairStatus === 'completed' || r.repairStatus === 'delivered')
                  .length
              }
              accent="#00796b"
            />
            <HistoryStatTile
              icon={<HistoryToggleOffRounded fontSize="small" />}
              label="Τελευταία Επισκευή"
              value={formatDateForDisplay(latestRepairDate)}
              accent="#e65100"
            />
          </Box>

          {/* Timeline επισκευών */}
          <Stack sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: { xs: 9, sm: 17 },
                top: 10,
                bottom: 10,
                width: '2px',
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
              }}
            />
            <Stack spacing={2}>
              {repairs.map((repair) => {
                const faultNames = (repair.repairFaultLinks || []).map((f) => f.name).join(', ');
                const statusColor = repairStatus_colors[repair.repairStatus] || '#757575';

                return (
                  <Box key={repair.id} sx={{ position: 'relative', pl: { xs: 4, sm: 6 } }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: 3, sm: 11 },
                        top: 22,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: statusColor,
                        border: '3px solid #fff',
                        boxShadow: `0 0 0 3px ${alpha(statusColor, 0.18)}`,
                        zIndex: 1,
                      }}
                    />
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: '14px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
                          borderColor: alpha(theme.palette.primary.main, 0.15),
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                        {/* Top: Repair ID + Status + Faults + Date */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                              label={`#${repair.id}`}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                height: '24px',
                                backgroundColor: alpha('#2a5298', 0.1),
                                color: '#1e3c72',
                              }}
                            />
                            <RepairStatusBadge status={repair.repairStatus} />
                            {faultNames && (
                              <Chip
                                label={faultNames}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: '22px',
                                  borderColor: alpha('#ff9800', 0.3),
                                  color: '#e65100',
                                }}
                              />
                            )}
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {formatDateForDisplay(repair.createdAt)}
                          </Typography>
                        </Box>

                        {/* Middle: Customer + Dates + Cost */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            mb: repair.description ? 1.5 : 0,
                            flexWrap: 'wrap',
                          }}
                        >
                          {/* Customer */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" fontWeight={600}>
                              {repair.customer?.name || 'Άγνωστος'}
                            </Typography>
                            {repair.customer?.phone && (
                              <Typography variant="caption" color="text.secondary">
                                {repair.customer.phone}
                              </Typography>
                            )}
                          </Box>

                          <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto' }} />

                          {/* Dates */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarMonth sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {formatDateNumeric(repair.isArrived)}
                            </Typography>
                            {repair.estimatedIsComplete && (
                              <>
                                <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
                                  →
                                </Typography>
                                <CalendarMonth sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {formatDateNumeric(repair.estimatedIsComplete)}
                                </Typography>
                              </>
                            )}
                          </Box>

                          {repair.cost && (
                            <>
                              <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto' }} />
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AttachMoney sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" fontWeight={700}>
                                  {repair.cost}€
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>

                        {/* Description */}
                        {repair.description && (
                          <Box
                            sx={{
                              mt: 1.5,
                              p: 1.5,
                              borderRadius: '10px',
                              backgroundColor: alpha(theme.palette.primary.main, 0.03),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                              <Description sx={{ fontSize: 13, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                                Περιγραφή
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
                              {repair.description}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
}

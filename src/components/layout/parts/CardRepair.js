import React from 'react';
import { Build } from '@mui/icons-material';
import BoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/BoxInfoDisplay';

export const CardRepair = (props) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('el-GR');
  };

  const repairData = [
    { label: 'Κόστος:', value: `€${props.repair.cost || '0.00'}` },
    {
      label: 'Παραλαβή:',
      value: props.repair.isArrived ? formatDate(props.repair.isArrived) : '-',
    },
    {
      label: 'Εκτίμηση:',
      value: props.repair.estimatedIsComplete ? formatDate(props.repair.estimatedIsComplete) : '-',
    },
  ];

  return (
    <BoxInfoDisplay
      color="success"
      title=""
      icon={<Build sx={{ fontSize: 16 }} />}
      values={repairData}
    />
  );
};

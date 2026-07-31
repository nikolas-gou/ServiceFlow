import { Build } from '@mui/icons-material';
import BoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/BoxInfoDisplay';
import { formatDateNumeric } from '../../../utils/dateUtils';
import type { RepairDetailData } from '../../../types/repairCards';

interface CardRepairProps {
  repair: RepairDetailData;
}

export const CardRepair = (props: CardRepairProps) => {
  const repairData = [
    { label: 'Κόστος:', value: `€${props.repair.cost || '0.00'}` },
    {
      label: 'Παραλαβή:',
      value: formatDateNumeric(props.repair.isArrived),
    },
    {
      label: 'Εκτίμηση:',
      value: formatDateNumeric(props.repair.estimatedIsComplete),
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

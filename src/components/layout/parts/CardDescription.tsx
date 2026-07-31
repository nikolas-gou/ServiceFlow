import { Typography, Divider } from '@mui/material';
import type { RepairDetailData } from '../../../types/repairCards';

interface CardDescriptionProps {
  repair: RepairDetailData;
}

export const CardDescription = (props: CardDescriptionProps) => {
  return (
    <>
      <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
        {props.repair.description}
      </Typography>
      {props.repair.notes && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            <strong>Σημειώσεις:</strong> {props.repair.notes}
          </Typography>
        </>
      )}
    </>
  );
};

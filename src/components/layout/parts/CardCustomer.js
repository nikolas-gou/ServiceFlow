import React from 'react';
import { Person } from '@mui/icons-material';
import BoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/BoxInfoDisplay';

export const CardCustomer = (props) => {
  const customerData = [
    { label: 'Όνομα:', value: props.repair.customer.name },
    { label: 'Τηλέφωνο:', value: props.repair.customer.phone },
    {
      label: 'Τύπος:',
      value: props.repair.customer.type === 'individual' ? 'Ιδιώτης' : 'Εργοστάσιο',
    },
  ];

  return (
    <BoxInfoDisplay
      color="info"
      title=""
      icon={<Person sx={{ fontSize: 16 }} />}
      values={customerData}
    />
  );
};

import React from 'react';
import StatisticsCardsCustomer from '../components/stats/StatisticsCardsCustomer';
import Customers from '../components/layout/customers/Customers';

const CustomersPage = () => {
  return (
    <>
      <StatisticsCardsCustomer />
      <Customers />
    </>
  );
};

export default CustomersPage;

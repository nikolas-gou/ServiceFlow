import React from 'react';
import StatisticsCardConnectionism from '../components/stats/StatisticsCardConnectionism';
import { Connections } from '../components/layout/connections/Connections';

export const ConnectionismPage = (props) => {
  return (
    <>
      <StatisticsCardConnectionism />
      <Connections />
    </>
  );
};

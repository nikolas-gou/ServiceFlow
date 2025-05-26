// import React from "react";
// import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

// export default function StatisticsCards() {
//   const stats = [
//     { title: "Συνολικοί Χρήστες", value: "14k", trend: "+25%", color: "green" },
//     { title: "Μετατροπές", value: "325", trend: "-25%", color: "red" },
//     { title: "Συμβάντα", value: "200k", trend: "+5%", color: "blue" },
//     { title: "Συνολικά Έσοδα", value: "€50k", trend: "+10%", color: "purple" },
//   ];

//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={2}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card sx={{ boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="subtitle2" color="textSecondary">
//                   {stat.title}
//                 </Typography>
//                 <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ color: stat.color, fontWeight: "bold" }}
//                 >
//                   {stat.trend}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { RepairRepository } from "../Repositories/RepairRepository";
import { CustomerRepository } from "../Repositories/CustomerRepository";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: { point: { radius: 0 } },
};

export default function StatisticsCards() {
  const [countRepairs, setCountRepairs] = useState("");
  const [countCustomers, setCountCustomers] = useState("");
  const stats = [
    {
      title: "Συνολικές Επισκευές",
      value: countRepairs,
      trend: "+25%",
      color: "green",
      data: [5, 6, 7, 8, 7, 8, 10],
    },
    {
      title: "Πελάτες",
      value: countCustomers,
      trend: "-25%",
      color: "red",
      data: [8, 7, 6, 5, 4, 3, 2],
    },
    {
      title: "Αντικαταστάσεις",
      value: "200k",
      trend: "+5%",
      color: "blue",
      data: [20, 19, 18, 18, 19, 20, 21],
    },
    {
      title: "Πωλήσεις",
      value: "€50k",
      trend: "+10%",
      color: "purple",
      data: [10, 11, 12, 13, 14, 15, 16],
    },
  ];

  useEffect(() => {
    // Get All Repairs, customers,
    loadStatsRepair();
    loadStatsCustomer();
  }, []);

  // Φόρτωση αριθμό επισευών από το repository
  const loadStatsRepair = async () => {
    try {
      const data = await RepairRepository.getStats();
      setCountRepairs(data || []);
    } catch (err) {
      console.error("Σφάλμα φόρτωσης επισκευών:", err);
      setCountRepairs([]);
    }
  };
  // Φόρτωση πελατών από το repository
  const loadStatsCustomer = async () => {
    try {
      const data = await CustomerRepository.getStats();
      setCountCustomers(data || []);
    } catch (err) {
      console.error("Σφάλμα φόρτωσης επισκευών:", err);
      setCountCustomers([]);
    }
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: stat.color, fontWeight: "bold" }}
                >
                  {stat.trend}
                </Typography>
                <Box sx={{ height: 40, mt: 1 }}>
                  <Line
                    data={{
                      labels: stat.data.map((_, i) => i),
                      datasets: [
                        {
                          data: stat.data,
                          borderColor: stat.color,
                          fill: true,
                          backgroundColor: `${stat.color}20`,
                        },
                      ],
                    }}
                    options={chartOptions}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

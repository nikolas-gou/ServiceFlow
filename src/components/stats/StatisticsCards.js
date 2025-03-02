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

import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

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
  const stats = [
    {
      title: "Συνολικες Επισκευές",
      value: "1056",
      trend: "+25%",
      color: "green",
      data: [5, 6, 7, 8, 7, 8, 10],
    },
    {
      title: "Πελάτες",
      value: "325",
      trend: "-25%",
      color: "red",
      data: [8, 7, 6, 5, 4, 3, 2],
    },
    {
      title: "Αντικαταστήσεις",
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

  const repairs = [
    {
      title: "Μηχανή Αυτοκινήτου",
      status: "Ολοκληρώθηκε",
      users: 120,
      eventCount: 30,
      avgTime: "2 ώρες",
      data: [5, 10, 15, 20, 15, 10, 5],
    },
    {
      title: "Αντικατάσταση Μπαταρίας",
      status: "Σε εξέλιξη",
      users: 90,
      eventCount: 20,
      avgTime: "1.5 ώρες",
      data: [3, 5, 10, 15, 10, 5, 3],
    },
    {
      title: "Έλεγχος Κλιματισμού",
      status: "Αναμονή",
      users: 75,
      eventCount: 10,
      avgTime: "1 ώρα",
      data: [2, 3, 5, 7, 5, 3, 2],
    },
  ];

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

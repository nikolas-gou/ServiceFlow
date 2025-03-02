import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
};

const repairs = [
  { title: "Μηχανή Αυτοκινήτου", status: "Ολοκληρώθηκε", users: 120, eventCount: 30, avgTime: "2 ώρες", data: [5, 10, 15, 20, 15, 10, 5] },
  { title: "Αντικατάσταση Μπαταρίας", status: "Σε εξέλιξη", users: 90, eventCount: 20, avgTime: "1.5 ώρες", data: [3, 5, 10, 15, 10, 5, 3] },
  { title: "Έλεγχος Κλιματισμού", status: "Αναμονή", users: 75, eventCount: 10, avgTime: "1 ώρα", data: [2, 3, 5, 7, 5, 3, 2] },
];

export default function RepairsTable() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Λεπτομέρειες Επισκευών</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Τίτλος</TableCell>
              <TableCell>Κατάσταση</TableCell>
              <TableCell>Χρήστες</TableCell>
              <TableCell>Μετρήσεις</TableCell>
              <TableCell>Μέσος Χρόνος</TableCell>
              <TableCell>Καθημερινές Επισκευές</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <TableRow key={index}>
                <TableCell>{repair.title}</TableCell>
                <TableCell>
                  <Chip label={repair.status} color={repair.status === "Ολοκληρώθηκε" ? "success" : repair.status === "Σε εξέλιξη" ? "warning" : "default"} />
                </TableCell>
                <TableCell>{repair.users}</TableCell>
                <TableCell>{repair.eventCount}</TableCell>
                <TableCell>{repair.avgTime}</TableCell>
                <TableCell style={{ width: 100 }}>
                  <Box sx={{ height: 40 }}>
                    <Line
                      data={{
                        labels: repair.data.map((_, i) => i),
                        datasets: [
                          {
                            data: repair.data,
                            borderColor: "blue",
                            fill: true,
                            backgroundColor: "rgba(0, 0, 255, 0.2)",
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

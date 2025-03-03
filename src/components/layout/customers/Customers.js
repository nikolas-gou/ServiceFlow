import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
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
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
};

const customers = [
  {
    id: "1",
    phone: "6971945467",
    name: "ΑΓΕΤ ΗΡΑΚΛΗΣ",
    email: "info@aget.gr",
    type: "Εργοστάσιο",
    createdAt: "12-05-2023",
  },
  {
    id: "2",
    phone: "6987456123",
    name: "Χαλυβουργία Ελλάδος",
    email: "contact@steel.gr",
    type: "Εργοστάσιο",
    createdAt: "08-11-2022",
  },
  {
    id: "3",
    phone: "6932154789",
    name: "Μαρίνος Παπαδόπουλος",
    email: "marinos.p@gmail.com",
    type: "Ιδιώτης",
    createdAt: "25-07-2021",
  },
  {
    id: "4",
    phone: "6945879632",
    name: "Βιομηχανία Μετάλλων",
    email: "sales@metal.gr",
    type: "Εργοστάσιο",
    createdAt: "30-09-2020",
  },
  {
    id: "5",
    phone: "6901234567",
    name: "Γιάννης Καλογήρου",
    email: "johnkal@yahoo.com",
    type: "Ιδιώτης",
    createdAt: "18-03-2024",
  },
];

export default function Customers() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Λεπτομέρειες Επισκευών
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>A/A</TableCell>
              <TableCell>Πελάτης</TableCell>
              <TableCell>Τύπος</TableCell>
              <TableCell>Τηλέφωνο</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Δημιουργήθηκε</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.type}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

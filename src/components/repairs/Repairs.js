import React from "react";
import { useState, useEffect } from "react";
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

const repairs = [
  {
    id: "1",
    phone: "6971945467",
    serialNumber: "4589",
    customer: "ΑΓΕΤ ΗΡΑΚΛΗΣ",
    manufacturer: "Valiadis",
    step: "8-10-12",
    spiral: "58",
    crossSection: "5.6/10",
    connectionism: "Απλή",
    kw: "0.75kw",
    hp: "1hp",
    status: "Ολοκληρώθηκε",
  },
  {
    id: "2",
    phone: "6971945467",
    serialNumber: "5647",
    customer: "Χαλυβουργία Ελλάδος",
    manufacturer: "ΚΗΜ",
    step: "1-11(4 μαζί)",
    spiral: "88",
    crossSection: "2 Χ 11 / 10",
    connectionism: "2 φορές παράλληλη",
    kw: "75kw",
    hp: "100hp",
    status: "Ολοκληρώθηκε",
  },
  {
    id: "3",
    phone: "6971945467",
    serialNumber: "-",
    customer: "Μαιμάρης",
    manufacturer: "Seipe",
    step: "8-10-12",
    spiral: "66",
    crossSection: "6/10",
    connectionism: "Απλή",
    kw: "1.75kw",
    hp: "3hp",
    status: "Ολοκληρώθηκε",
  },
  {
    id: "4",
    phone: "6971945467",
    serialNumber: "4589",
    customer: "ΑΓΕΤ ΗΡΑΚΛΗΣ",
    manufacturer: "Valiadis",
    step: "8-10-12",
    spiral: "58",
    crossSection: "5.6/10",
    connectionism: "Απλή",
    kw: "0.75kw",
    hp: "1hp",
    status: "Ολοκληρώθηκε",
  },
  {
    id: "1",
    serialNumber: "4589",
    customer: "ΑΓΕΤ ΗΡΑΚΛΗΣ",
    manufacturer: "Valiadis",
    step: "8-10-12",
    spiral: "58",
    crossSection: "5.6/10",
    connectionism: "simple",
    kw: "0.75kw",
    hp: "1hp",
    status: "Ολοκληρώθηκε",
  },
];

export default function Repairs() {
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
              <TableCell>S/N</TableCell>
              <TableCell>Πελάτης</TableCell>
              <TableCell>Τηλέφωνο</TableCell>
              <TableCell>Μάρκα</TableCell>
              <TableCell>Βήμα</TableCell>
              <TableCell>Σπείρες</TableCell>
              <TableCell>Διατομή</TableCell>
              <TableCell>Σύνδεση</TableCell>
              <TableCell>kw</TableCell>
              <TableCell>hp</TableCell>
              <TableCell>Κατάσταση</TableCell>

              {/* <TableCell>Κατάσταση</TableCell>
              <TableCell>Χρήστες</TableCell>
              <TableCell>Μετρήσεις</TableCell>
              <TableCell>Μέσος Χρόνος</TableCell>
              <TableCell>Καθημερινές Επισκευές</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <TableRow key={index}>
                <TableCell>{repair.id}</TableCell>
                <TableCell>{repair.serialNumber}</TableCell>
                <TableCell>{repair.customer}</TableCell>
                <TableCell>{repair.phone}</TableCell>
                <TableCell>{repair.manufacturer}</TableCell>
                <TableCell>{repair.step}</TableCell>
                <TableCell>{repair.spiral}</TableCell>
                <TableCell>{repair.crossSection}</TableCell>
                <TableCell>{repair.connectionism}</TableCell>
                <TableCell>{repair.kw}</TableCell>
                <TableCell>{repair.hp}</TableCell>
                <TableCell>
                  <Chip
                    label={repair.status}
                    color={
                      repair.status === "Ολοκληρώθηκε"
                        ? "success"
                        : repair.status === "Σε εξέλιξη"
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

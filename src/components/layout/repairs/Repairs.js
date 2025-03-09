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
import { RepairRepository } from "../../Repositories/RepairRepository";

const statusLabels = {
  Completed: "Ολοκληρώθηκε",
  "In-progress": "Σε εξέλιξη",
  Delivered: "Παραδόθηκε",
};

export default function Repairs() {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    getRepairs();
  }, []);

  const getRepairs = async () => {
    try {
      const data = await RepairRepository.getAll();
      setRepairs(data);
    } catch (err) {
      console.error(err);
    }
  };

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
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <TableRow key={index}>
                <TableCell>{repair.id}</TableCell>
                <TableCell>{repair.motor.serial_number}</TableCell>
                <TableCell>{repair.customer.name}</TableCell>
                <TableCell>{repair.customer.phone}</TableCell>
                <TableCell>{repair.motor.manufacturer}</TableCell>
                <TableCell>{repair.motor.step}</TableCell>
                <TableCell>{repair.motor.spiral}</TableCell>
                <TableCell>{repair.motor.cross_section}</TableCell>
                <TableCell>{repair.motor.connectionism}</TableCell>
                <TableCell>{repair.motor.kw}</TableCell>
                <TableCell>{repair.motor.hp}</TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[repair.repair_status]}
                    color={
                      repair.repair_status === "Completed"
                        ? "success"
                        : repair.repair_status === "In-progress"
                        ? "warning"
                        : repair.repair_status === "Delivered"
                        ? "info"
                        : "default"
                    }
                    sx={{ width: "100%" }}
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

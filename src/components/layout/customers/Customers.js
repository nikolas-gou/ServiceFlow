import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { CustomerRepository } from "../../Repositories/CustomerRepository";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  // Φόρτωση πελατών από το repository
  const getCustomers = async () => {
    try {
      const data = await CustomerRepository.getAll();
      setCustomers(data);
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
                <TableCell>{customer.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

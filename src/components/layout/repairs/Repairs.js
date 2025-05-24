import React, { useState, useEffect } from "react";
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
  Collapse,
  Grid,
  Divider,
  Tooltip,
} from "@mui/material";
import { RepairRepository } from "../../Repositories/RepairRepository";
import { useSearch } from "../../../context/SearchContext";
import { volt_types_mapping } from "../../Models/Motor";

const connectionismTranslated = {
  simple: "Απλή",
  "1-parallel": "1 φορά παράλληλη",
  "2-parallel": "2 φορές παράλληλη",
  "3-parallel": "3 φορές παράλληλη",
  "4-parallel": "4 φορές παράλληλη",
};

// Row component for collapsible functionality
function RepairRow(props) {
  const { repair, index } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleRowClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip
        title="Πατήστε για περισσότερες λεπτομέρειες"
        arrow
        placement="top-start"
      >
        <TableRow
          className="main-row"
          onClick={handleRowClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            "& > *": { borderBottom: open ? "none" : "inherit" },
            backgroundColor: open ? "#e0e0e0" : hover ? "#f0f0f0" : "inherit",
            transition: "background-color 0.3s",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* <TableCell><strong>{repair.id}</strong></TableCell> */}
          <TableCell>{repair.motor.serial_number || "-"}</TableCell>
          <TableCell>{repair.customer.name || "-"}</TableCell>
          <TableCell>{repair.customer.phone || "-"}</TableCell>
          <TableCell>{repair.motor.manufacturer || "-"}</TableCell>
          <TableCell>{repair.motor.step || "-"}</TableCell>
          <TableCell>{repair.motor.spiral || "-"}</TableCell>
          <TableCell>{repair.motor.cross_section || "-"}</TableCell>
          <TableCell>
            {connectionismTranslated[repair.motor.connectionism] || "-"}
          </TableCell>
          <TableCell>{repair.motor.kw ? `${repair.motor.kw}kw` : "-"}</TableCell>
          <TableCell>{repair.motor.hp ? `${repair.motor.hp}hp` : "-"}</TableCell>
          <TableCell>{volt_types_mapping[repair.motor.volt] || "-"}</TableCell>
          <TableCell>{repair.isArrived || "-"}</TableCell>
        </TableRow>
      </Tooltip>
      <TableRow sx={{ backgroundColor: open ? "#f5f5f5" : "inherit" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Λεπτομέρειες Κινητήρα
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">
                    Τεχνικά Χαρακτηριστικά
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Βήμα:
                      </Typography>
                      <Typography variant="body1">
                        {repair.motor.step}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Σπείρες:
                      </Typography>
                      <Typography variant="body1">
                        {repair.motor.spiral}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Διατομή:
                      </Typography>
                      <Typography variant="body1">
                        {repair.motor.cross_section}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Σύνδεση:
                      </Typography>
                      <Typography variant="body1">
                        {connectionismTranslated[repair.motor.connectionism]}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        kw:
                      </Typography>
                      <Typography variant="body1">{repair.motor.kw}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        hp:
                      </Typography>
                      <Typography variant="body1">{repair.motor.hp}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">
                    Στοιχεία Επισκευής
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  {repair.description && (
                    <Typography variant="body1">
                      {repair.description}
                    </Typography>
                  )}
                  {!repair.description && (
                    <Typography variant="body2" color="text.secondary">
                      Δεν υπάρχει περιγραφή.
                    </Typography>
                  )}
                  {repair.notes && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 2 }}>
                        Σημειώσεις:
                      </Typography>
                      <Typography variant="body2">{repair.notes}</Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Repairs() {
  const [repairs, setRepairs] = useState([]);
  // context search
  const { searchQuery } = useSearch();

  useEffect(() => {
    getRepairs();
  }, []);

  // Αναζήτηση - Φιλτράρισμα
  const filteredRepairs = searchQuery
    ? repairs.filter(
        (repair) =>
          repair.motor.manufacturer
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          repair.motor.kw?.toString().includes(searchQuery) ||
          repair.motor.hp?.toString().includes(searchQuery) ||
          repair.customer.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : repairs;

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
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)' }}>
        <Table 
          stickyHeader  
           sx={{
            // Κεντράρισμα για headers και main rows μόνο
            '& .MuiTableHead-root .MuiTableCell-root, & .main-row .MuiTableCell-root': {
              textAlign: 'center'
            }
          }}
        >
          <TableHead>
            <TableRow className="main-row">
              {/* <TableCell>A/A</TableCell> */}
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
              <TableCell>volt</TableCell>
              <TableCell>Ημ/νία Παραλαβής</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepairs.map((repair, index) => (
              <RepairRow key={repair.id} repair={repair} index={index} />
            ))}
            {filteredRepairs.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    Δεν βρέθηκαν αποτελέσματα για "{searchQuery}"
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

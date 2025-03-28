// src/pages/PremilitaresPage.jsx

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Button,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CustomizedTable from '../components/premilitares/CustomizedTable';
import RegionesTable from '../components/premilitares/RegionesTable';
import CentrosTable from '../components/premilitares/CentrosTable';
import StepIconPremilitares from '../components/premilitares/StepIconPremilitares';
import ModalNuevoRegistro from '../components/premilitares/ModalNuevoRegistro';
import ModalCuposRegiones from '../components/premilitares/ModalCuposRegiones';
import ModalCuposCentros from '../components/premilitares/ModalCuposCentros';

const steps = [
  'Formulario de Apertura',
  'Asignación de Cupos a Regiones',
  'Asignacion de Cupos a Centros de Reclutamiento',
];

export default function DistribucionCuposPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [modalStep, setModalStep] = useState(null);

  const [formData, setFormData] = useState({
    edadMin: 16,
    edadMax: 19,
    gestion: '2025',
    cantidadEstudiantes: 50000,
    fechaLimiteEdad: '',
    fechaLimiteApertura: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const isLastStep = activeStep === steps.length - 1;

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CustomizedTable />;
      case 1:
        return <RegionesTable formData={formData} />;
      case 2:
        return <CentrosTable />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box mb={4}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={StepIconPremilitares}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {steps[activeStep]}
          </Typography>
          <Fab color="primary" aria-label="add" onClick={() => setModalStep(activeStep)}>
            <AddIcon />
          </Fab>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {renderStepContent(activeStep)}

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            color="secondary"
          >
            ← Atrás
          </Button>

          {!isLastStep ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Siguiente →
            </Button>
          ) : (
            <Button variant="contained" color="success" disabled>
              Finalizado
            </Button>
          )}
        </Box>
      </Paper>

      {/* Modales por paso */}
      {modalStep === 0 && (
        <ModalNuevoRegistro open={true} onClose={() => setModalStep(null)} />
      )}
      {modalStep === 1 && (
        <ModalCuposRegiones open={true} onClose={() => setModalStep(null)} />
      )}
      {modalStep === 2 && (
        <ModalCuposCentros open={true} onClose={() => setModalStep(null)} />
      )}
    </Container>
  );
}
import React from 'react';
import { Assignment, Description, CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active ? theme.palette.primary.main : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function StepIconPremilitares(props) {
  const { active, completed, icon } = props;

  const icons = {
    1: <Assignment />,
    2: <Description />,
    3: <CheckCircle />,
  };

  return (
    <CustomStepIconRoot ownerState={{ active, completed }}>
      {icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

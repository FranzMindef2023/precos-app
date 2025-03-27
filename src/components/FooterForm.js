import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const FooterForm = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 2, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Ministerio de Defensa de Bolivia
      </Typography>
      <Typography variant="caption">
        <Link href="" target="_blank" rel="noopener">
          www.mindef.gob.bo
        </Link>
      </Typography>
    </Box>
  );
};

export default FooterForm;

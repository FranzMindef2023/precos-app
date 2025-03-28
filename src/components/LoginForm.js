import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import api from '../services/axiosConfig';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

export default function LoginForm({ onLoginSuccess }) {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      email: 'juan@example.com',
      password: 'password123',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post('/auth/login', values);
        const token = response.data.access_token;
        Cookies.set('token', token, { expires: 7 });
        setError('');
        if (onLoginSuccess) onLoginSuccess();
      } catch (err) {
        console.error(err);
        setError('Credenciales inválidas o error de servidor');
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: 'linear-gradient(#000, #181818)' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          bgcolor: '#121212',
          p: 5,
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          color: 'white',
        }}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <img src="https://www.mindef.gob.bo/sites/default/files/minlogo.png" alt="Logo" width={500} />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Inicia sesión en Premil
        </Typography>

        {[{
          icon: <GoogleIcon />, label: 'CONTINUE WITH GOOGLE'
        }, {
          icon: <FacebookIcon />, label: 'CONTINUE WITH FACEBOOK'
        }, {
          icon: <AppleIcon />, label: 'CONTINUE WITH APPLE'
        }].map((btn, i) => (
          <Button
            key={i}
            fullWidth
            startIcon={btn.icon}
            variant="outlined"
            sx={{
              mb: 1.5,
              color: 'white',
              borderColor: 'white',
              borderRadius: '30px',
              fontWeight: 'bold',
              py: 1.2,
              fontSize: '0.8rem',
            }}
          >
            {btn.label}
          </Button>
        ))}

        <Divider sx={{ backgroundColor: '#2a2a2a', my: 3 }} />

        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body2" fontWeight="bold" mb={0.5}>Email or username</Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              sx: {
                backgroundColor: '#000',
                color: 'white',
                borderRadius: 0,
                border: '1px solid white'
              },
            }}
            sx={{ input: { color: 'white' }, mb: 2 }}
          />

          <Typography variant="body2" fontWeight="bold" mb={0.5}>Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#000',
                color: 'white',
                borderRadius: 0,
                border: '1px solid white'
              },
            }}
            sx={{ input: { color: 'white' }, mb: 2 }}
          />

          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 1,
              borderRadius: 999,
              bgcolor: '#1db954',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#1ed760' }
            }}
          >
            Log In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ color: '#b3b3b3', mt: 2 }}>
          <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Forgot your password?</a>
        </Typography>

        <Typography variant="body2" align="center" sx={{ color: '#b3b3b3', mt: 2 }}>
          Don’t have an account? <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Sign up for Spotify</a>
        </Typography>
      </Box>
    </Box>
  );
}
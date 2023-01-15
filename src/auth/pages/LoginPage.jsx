import { useDispatch } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuth, startGoogleSignIn } from '../../store/auth';

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'manuel@google.com',
    password: '123456'
  });

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( checkingAuth() );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }>
          <Grid container>
            
            <Grid item 
              xs={ 12 } 
              sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>
            
            <Grid item 
              xs={ 12 } 
              sx={{ mt: 2 }}
            >
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid container 
              spacing={ 2 } 
              sx={{ mt: 1 }}
            >
              
              <Grid item 
                xs={ 12 } 
                sm={ 6 }
              >
                <Button variant="contained" fullWidth type='submit'>
                  Login
                </Button>
              </Grid>
              
              <Grid item 
                xs={ 12 } 
                sm={ 6 }
              >
                <Button variant="contained" fullWidth onClick={ onGoogleSignIn }>
                  <Google />
                  <Typography sx={{ ml: 1 }}>
                    Google
                  </Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container 
              direction='row' 
              justifyContent='end'
            >
              <Link 
                component={ LinkRouter } 
                color='inherit' 
                to="/auth/register"
              >
                Crear una cuenta
              </Link>

            </Grid>

          </Grid>
        </form>
    </AuthLayout>

  )
}

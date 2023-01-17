import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, savedMessage, isSaving } = useSelector( ( state ) => state.journal );

    const { body, title, date, onInputChange, formState } =  useForm( activeNote );

    const fileInputRef = useRef();

    const dateString = useMemo( () => {
        const newDate = new Date( date ); 
        return newDate.toUTCString();
    }, [ date ]);

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [ formState ]);

    useEffect(() => {
        
        if( savedMessage.length > 0 ) {
            Swal.fire( 'Nota actualizada', savedMessage, 'success' );
        }
    
    }, [ savedMessage ]);
    

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }
    

    return (
        <Grid 
            className="animate__animated animate__fadeIn"
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>
            <Grid item>

                <input 
                    type="file" 
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }} 
                />
                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button 
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote } 
                    disabled={ isSaving }   
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                    minRows={ 5 }
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />

        </Grid>
    )
}

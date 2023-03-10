import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';

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

    const onDelete = () => {
        dispatch( startDeletingNote() );
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
                    placeholder="Ingrese un t??tulo"
                    label="T??tulo"
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
                    placeholder="??Qu?? sucedi?? en el d??a de hoy?"
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                    minRows={ 5 }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button 
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error' 
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={ activeNote.imageUrls }/>

        </Grid>
    )
}

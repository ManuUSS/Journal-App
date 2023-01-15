import { useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    
    const [formValidations, setFormValidations] = useState({});

    useEffect(() => {
      
    
    }, [ formState ])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for ( const formField of  Object.keys( formValidations ) ) {
            const [ functionValidate, errorMessage = 'Este campo es requerido.' ] = formValidations[ formField ];

            formCheckedValues[`${ formField }Valid`] = functionValidate( formState[ formField ] ) ? null : errorMessage;

        }

        console.log( formCheckedValues );
        setFormValidations( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidations,
    }
}
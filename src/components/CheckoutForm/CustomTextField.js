import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const FormInput = ({name,label,required}) => {
    const {control} = useFormContext();
  return (
      <Grid item xs={12} sm={6}>
      <Controller defaultValue=""
       control = {control}
       name={name}
       
        render = {({ field})=> (
                <TextField
                    fullWidth
                    label={label}
                    required
                    />
                
            )}/>
     </Grid>
    
  );
}

export default FormInput
import { TextField, MenuItem, Select } from '@mui/material'
import { useField, useFormikContext } from 'formik'
function SelectField({ name, options }) {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)
  const handleChange = (event) => {
    const { value } = event.target
    setFieldValue(name, value)
  }
  const configSelect = {
    ...field,
    select: true,
    variant: 'outlined',
    fullWidth: true
  }


  if (meta && meta.touched && meta.error) {
    configSelect.error = true
    configSelect.helperText = meta.error
  }
  return (
    <Select
      sx={{
        '& .MuiOutlinedInput-root': {
          '& > fieldset': {
            border: 'none'
          }
        }
      }}
      {...configSelect}
    >
      {options?.map((item, index) => {
        return (
          <MenuItem className='selectNation' key={index} value={item?.name}>
            {item?.name}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default SelectField

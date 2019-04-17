import { useState } from 'react'
import PropTypes from 'prop-types'

const useInput = ({ defaultValue = '', type = 'text', name, placeholder }) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = e => {
    const { value } = e.target
    setValue(value)
  }

  const reset = () => {
    setValue(defaultValue)
  }

  return { type, name, placeholder, value, onChange, reset }
}

useInput.propTypes = {
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default useInput

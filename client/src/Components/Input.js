import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
	border: ${props => props.theme.preset.boxBorder};
	border-radius: ${props => props.theme.size.borderRadius};
	background-color: ${props => props.theme.color.grey};
	height: 3.5rem;
	padding: 1rem 2rem;
	display: block;
	width: 100%;
	margin-bottom: 1rem;
	font-size: 1.2rem;
	color: ${({ theme }) => theme.color.darkGrey};
`

const Input = ({
	type = 'text',
	name,
	value,
	placeholder,
	onChange,
	required = true,
	...props
}) => (
	<StyledInput
		type={type}
		name={name}
		id={name}
		value={value}
		placeholder={placeholder}
		onChange={onChange}
		required={required}
		{...props}
	/>
)

Input.propTypes = {
	type: PropTypes.string,
	required: PropTypes.bool,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Input

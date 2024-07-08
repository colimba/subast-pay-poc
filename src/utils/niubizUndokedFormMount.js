export const stylesForForm = () => {
  return {
    base: {
      color: '#666666',
      fontWeight: 700,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      placeholder: {
        color: '#999999',
      },
      autofill: {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  }
}

export default stylesForForm

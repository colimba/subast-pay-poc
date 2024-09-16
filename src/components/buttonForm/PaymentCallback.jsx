import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const PaymentCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const id = query.get('id')

    const handleFormData = async () => {
      try {
        const response = await fetch(location.pathname + location.search, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const { transactionToken, customerEmail, channel } = data

        const backendResponse = await fetch('/v1/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            transactionToken,
            customerEmail,
            channel,
          }),
        })

        if (backendResponse.ok) {
          navigate('/success')
        } else {
          console.error('Error al procesar el pago')
        }
      } catch (error) {
        console.error('Error al impactar el pago', error)
      }
    }

    handleFormData()
  }, [navigate, location])

  return <div>Procesando el pago...</div>
}

export default PaymentCallback

import { useEffect, useRef, useState } from 'react'
import { stylesForForm } from '../utils/niubizUndokedFormMount'

const NiubizUndockedForm = () => {
  const [robertito, setRobertito] = useState('')

  const cardNumberRef = useRef(null)
  const cardExpiryRef = useRef(null)
  const cardCvcRef = useRef(null)

  useEffect(() => {
    const createElements = async () => {
      try {
        const cardNumber = await window.payform.createElement(
          'card-number',
          {
            style: stylesForForm(),
            placeholder: 'Número de tarjeta',
          },
          'txtNumeroTarjeta'
        )

        cardNumber.on('bin', (data) => {
          console.log('BIN: ', data)
        })
        cardNumber.on('change', function (data) {
          console.log('CHANGE: ', data)
        })
        cardNumber.on('dcc', function (data) {
          console.log('DCC: ', data)
        })
        cardNumber.on('installments', function (data) {
          console.log('INSTALLMENTS: ', data)
        })
        cardNumber.on('lastFourDigits', function (data) {
          console.log('LAST 4 DIGITS: ', data)
        })

        const cardExpiry = await window.payform.createElement(
          'card-expiry',
          {
            style: stylesForForm(),
            placeholder: 'MM/YY',
          },
          'txtFechaVencimiento'
        )

        cardExpiry.on('change', function (data) {
          console.log('CHANGE: ', data)
        })

        const cardCvc = await window.payform.createElement(
          'card-cvc',
          {
            style: stylesForForm(),
            placeholder: 'CVC',
          },
          'txtCvv'
        )

        cardCvc.on('change', function (data) {
          console.log('CHANGE: ', data)
        })

        // Asignamos las referencias
        cardNumberRef.current = cardNumber
        cardExpiryRef.current = cardExpiry
        cardCvcRef.current = cardCvc
      } catch (error) {
        console.error('Error creating elements:', error)
      }
    }

    createElements()
  }, [])

  const pay = async () => {
    console.log('pagandinggg')
    const data = {
      name: 'INTEGRACIONES',
      lastName: 'NIUBIZ',
      email: 'integraciones.niubiz@necomplus.com',
      alias: 'NCP',
      recurrence: false
    }

    try {
      // Esperamos a que todas las promesas se resuelvan
      if (
        cardNumberRef.current &&
        cardExpiryRef.current &&
        cardCvcRef.current
      ) {
        await window.payform
          .createToken(
            [cardNumberRef.current, cardExpiryRef.current, cardCvcRef.current],
            data
          )
          .then((data) => {
            setRobertito('sip')
            console.log('sip')
            console.log(data)
          })
          .catch((error) => {
            setRobertito('nop')
            console.log('nop')
            console.log(error)
          })
      }
    } catch (error) {
      console.error('Error creating token:', error)
    }
  }

  return (
    <>
      <button className="btn-pagar" onClick={pay}>
        Pagar
      </button>
      <p>{robertito}</p>
    </>
  )
}

export default NiubizUndockedForm

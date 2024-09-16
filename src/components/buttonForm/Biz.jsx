import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Biz = () => {
  const [scriptLoad, setScriptLoad] = useState(false)
  const sessionKey = useSelector((state) => state.session.token?.sessionKey)
  const transactionId = useSelector((state) => state.session.token?.transactionId)
  const amount = useSelector((state) => state.payment.amountToPay)

  useEffect(() => {
    // Cargar el script de la pasarela de pago
    const script = document.createElement('script')
    if (sessionKey && amount) {
      script.src = import.meta.env.VITE_NIUBIZ_URL
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('data-sessiontoken', sessionKey)
      script.setAttribute('data-channel', 'web')
      script.setAttribute(
        'data-merchantid',
        import.meta.env.VITE_NIUBIZ_MERCHANT_ID
      )
      script.setAttribute('data-purchasenumber', transactionId)
      script.setAttribute('data-amount', amount)
      script.setAttribute('data-expirationminutes', '20')
      script.setAttribute('data-timeouturl', 'about:blank')
      // script.setAttribute('data-merchantlogo', 'img/comercio.png');
      script.setAttribute('data-merchantname', 'subastop')

      script.setAttribute('data-formbuttoncolor', '#000000')
      document.body.appendChild(script)
      script.onload = () => {
        setScriptLoad(true)
        console.log('Script de pasarela de pago cargado.')
      }

      script.onerror = (error) => {
        setScriptLoad(false)
        console.error(
          'Error al cargar el script de la pasarela de pago:',
          error
        )
      }

      const formElement = document.getElementById('payment-form')
      formElement.appendChild(script)
    }
    return () => {
      // Limpiar el script cuando el componente se desmonte
      const element = document.getElementById('script')
      if (element) {
        document.body.removeChild(script)
        setScriptLoad(false)
      }
    }
  }, [sessionKey, amount])
}

export default Biz

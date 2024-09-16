import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useNiubisConfiguration = () => {
  const [isConfigured, setIsConfigured] = useState(false)
  const sessionKey = useSelector((state) => state.session.token?.sessionKey)
  const amount = useSelector((state)=> state.payment.amountToPay)

  useEffect(() => {
    if (sessionKey && amount) {
      window?.VisanetCheckout.configure({
        action: 'https://d7fd-24-232-47-195.ngrok-free.app/paymentCallback', // modificar el id para que sea dinamico
        method: 'POST',
        sessiontoken: sessionKey,
        channel: 'web',
        merchantid: import.meta.env.VITE_NIUBIZ_MERCHANT_ID,
        purchasenumber: '10000000001',
        amount: amount,
        expirationminutes: 5,
        timeouturl: 'https://localhost:5173/urlTimeout',
        merchantname: 'subastop'
      })
      setIsConfigured(true)
      window?.VisanetCheckout.open();
    }
  }, [sessionKey, amount])
  return isConfigured
}

export default useNiubisConfiguration

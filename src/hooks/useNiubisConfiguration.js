import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useNiubisConfiguration = () => {
  const [isConfigured, setIsConfigured] = useState(false)
  const sessionKey = useSelector((state) => state.session.token?.sessionKey)
  const amount = useSelector((state)=> state.payment.amountToPay)

  useEffect(() => {
    if (sessionKey && amount) {
      window.payform.setConfiguration({
        sessionkey: sessionKey,
        channel: 'web',
        merchantid: import.meta.env.VITE_NIUBIZ_MERCHANT_ID,
        purchasenumber: '10000000001',
        amount: amount,
        language: 'es',
        font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
      })
      setIsConfigured(true)
    }
  }, [sessionKey, amount])
  return isConfigured
}

export default useNiubisConfiguration
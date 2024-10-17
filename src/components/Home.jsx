import { useDispatch, useSelector } from 'react-redux'
import { setNiubizScriptMounted } from '../features/globals/globalSlice'
import useNiubizScript from '../hooks/useNiubisScript'
import InitialDataForm from './InitialDataForm'
import StatusDialog from './StatusDialog'
import NiubuzButtonForm from './buttonForm/NiubuzButtonForm'
import Biz from './buttonForm/Biz'
import { useEffect, useState } from 'react'

const Home = () => {
  const transactionId = useSelector(
    (state) => state.session.token?.transactionId
  )
  const operationId = useSelector(
    (state) => state.session.token?.operationId
  )
  const amount = useSelector((state) => state.payment.amountToPay)
  const userId = useSelector((state) => state.payment.userId)
  const opportunityId = useSelector((state) => state.payment.opportunityId)
  const dispatch = useDispatch()
  const notifyScriptMounted = () => dispatch(setNiubizScriptMounted(true))

  const isScriptLoaded = useNiubizScript(notifyScriptMounted)
  const [callbackUrl, setCallbackUrl] = useState('')

  useEffect(()=>{
    setCallbackUrl(`/v1/coinmarket/create-payment?operationId=${operationId}&amount=${amount}&userId=${userId}`)
  }, [transactionId, amount, userId, opportunityId])

  const handleSubmit = () => {
    ;<>
      <p>loading...</p>
    </>
  }

  return (
    <div>
      <InitialDataForm />
      <div id='alguito'>
        <form
          id="payment-form"
          action={callbackUrl}
          method="post"
          style={{ marginTop: 20 }}
        ></form>
      </div>
      <Biz />
      {/* {isScriptLoaded && <NiubuzButtonForm />} */}
      {/* {isScriptLoaded && <PaymentFormUndocked />} */}
      <StatusDialog />
    </div>
  )
}

export default Home

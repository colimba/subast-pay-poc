import { useDispatch, useSelector } from 'react-redux'
import { setNiubizScriptMounted } from '../features/globals/globalSlice'
import useNiubizScript from '../hooks/useNiubisScript'
import InitialDataForm from './InitialDataForm'
import StatusDialog from './StatusDialog'
import NiubuzButtonForm from './buttonForm/NiubuzButtonForm'
import Biz from './buttonForm/Biz'

const Home = () => {
  const transactionId = useSelector(
    (state) => state.session.token?.transactionId
  )
  const amount = useSelector((state) => state.payment.amountToPay)
  const userId = useSelector((state) => state.payment.userId)
  const opportunityId = useSelector((state) => state.payment.opportunityId)
  const dispatch = useDispatch()
  const notifyScriptMounted = () => dispatch(setNiubizScriptMounted(true))

  const isScriptLoaded = useNiubizScript(notifyScriptMounted)

  const callbackUrl = `/v1/coinmarket/create-payment?transactionId=${transactionId}&amount=${amount}&userId=${userId}&opportunityId=${opportunityId}`

  const handleSubmit = () => {
    <>
      <p>loading...</p>
    </>
  }

  return (
    <div>
      <InitialDataForm />
      <form id="payment-form" action={callbackUrl} method="post" style={{marginTop: 20}}></form>
      <Biz />
      {/* {isScriptLoaded && <NiubuzButtonForm />} */}
      {/* {isScriptLoaded && <PaymentFormUndocked />} */}
      <StatusDialog />
    </div>
  )
}

export default Home

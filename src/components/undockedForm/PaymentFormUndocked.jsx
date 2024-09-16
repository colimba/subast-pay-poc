import { useSelector } from 'react-redux'
import useNiubisConfiguration from '../../hooks/useNiubisConfiguration'
import NiubizUndockedForm from './NiubizUndockedForm'

const PaymentFormUndocked = () => {
  const sessionTokenStatus = useSelector((state) => state.session.status)

  const isConfigured = useNiubisConfiguration()

  if (sessionTokenStatus === 'idle' || sessionTokenStatus === 'failed') {
    return null
  }

  return (
    <div className="nes-container with-title" style={{ marginTop: 20 }}>
      <p className="title">Niubiz Form (4474118355632240)</p>
      {isConfigured && <NiubizUndockedForm />}
    </div>
  )
}

export default PaymentFormUndocked

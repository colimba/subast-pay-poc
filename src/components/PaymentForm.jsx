import { useSelector } from 'react-redux'
import NiubizUndockedForm from './NiubizUndockedForm'
import useNiubisConfiguration from '../hooks/useNiubisConfiguration'
import { useState } from 'react'
import NiubuzButtonForm from './NiubuzButtonForm'

const PaymentForm = () => {
  const [formType, setFormType] = useState('')
  const sessionTokenStatus = useSelector((state) => state.session.status)

  const isConfigured = useNiubisConfiguration()

  const handleSelection = (e) => {
    setFormType(e.target.value)
  }

  if (sessionTokenStatus === 'idle' || sessionTokenStatus === 'failed') {
    return null
  }

  return (
    <div className="nes-container with-title" style={{ marginTop: 20 }}>
      <p className="title">Niubiz Form (4474118355632240)</p>
      <div className="nes-select">
        <select required id='formType' onChange={handleSelection} value={formType}>
          <option value="" disabled selected hidden>
            Tipo Pago
          </option>
          <option value='0'>Boton de Pago</option>
          <option value='1'>Formulario Desacoplado</option>
        </select>
      </div>
      <div id="txtNumeroTarjeta" className="form-control"></div>
      <div id="txtFechaVencimiento" className="from-control"></div>
      <div id="txtCvv" className="from-control"></div>
      {isConfigured && formType === '0' ? <NiubuzButtonForm/> : <NiubizUndockedForm />}
    </div>
  )
}

export default PaymentForm

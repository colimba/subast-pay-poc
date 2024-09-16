import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setStatus, setToken } from '../features/payment/sessionSlice'
import { setAmountToPay, setPayerOpportunityId, setPayerUserId } from '../features/payment/paymentSlice'

const InitialDataForm = () => {
  const [amount, setAmount] = useState('')
  const [userId, setUserId] = useState('')
  const [opportunityId, setOpportunityId] = useState('')
  const dispatch = useDispatch()

  const channel = 'web'

  const handlePayment = async () => {
    try {
      dispatch(setStatus('processing'))
      const response = await axios.post(
        '/v1/coinmarket/authenticate',
        { userId, opportunityId, amount, channel },
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch(setStatus('success'))
      dispatch(setToken(response.data))
      dispatch(setAmountToPay(amount))
      dispatch(setPayerUserId(userId))
      dispatch(setPayerOpportunityId(opportunityId))
    } catch (error) {
      dispatch(setStatus('failed'))
      console.error('Payment failed:', error)
    }
  }

  return (
    <div>
      <div className="nes-container with-title">
        <p className="title">Form Initial Data</p>
        <div className="nes-field is-inline">
          <input
            type="text"
            id="userId_field"
            className="nes-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter userId"
            autoComplete='off'
          />
        </div>
        <div className="nes-field is-inline" style={{ marginTop: 8 }}>
          <input
            type="text"
            id="opportunityId_field"
            className="nes-input"
            value={opportunityId}
            onChange={(e) => setOpportunityId(e.target.value)}
            placeholder="Enter opportunityId"
            autoComplete='off'
          />
        </div>
        <div className="nes-field is-inline" style={{ marginTop: 8 }}>
          <input
            type="text"
            id="name_field"
            className="nes-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            autoComplete='off'
          />
        </div>
        <button
          className="nes-btn"
          onClick={handlePayment}
          style={{ marginTop: 12 }}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default InitialDataForm

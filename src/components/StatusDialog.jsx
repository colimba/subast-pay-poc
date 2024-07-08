import { useSelector } from 'react-redux'

const StatusDialog = () => {
  const sessionStatus = useSelector((state) => state.session.status)
  const sessionKey = useSelector((state) => state.session.token?.sessionKey)
  const scriptMountedStatus = useSelector(
    (state) => state.global.niubizScriptMounted
  )
  const formMountedStatus = useSelector(
    (state) => state.global.niubizFormMounted
  )

  return (
    <>
      <div className="nes-container with-title" style={{ marginTop: 20 }}>
        <p className="title">App Status</p>
        <section className="message-list">
          {scriptMountedStatus && (
            <section className="message -right">
              <div className="nes-balloon from-right">
                <p>Niubiz Script Mounted</p>
              </div>
            </section>
          )}
          {sessionStatus !== 'idle' && (
            <section className="message -left">
              <div className="nes-balloon from-left">
                <p>Session Token Creation Status: {sessionStatus}</p>
                <span className="nes-text is-success">{sessionKey}</span>
              </div>
            </section>
          )}
          {formMountedStatus && (
            <section className="message -right">
              <div className="nes-balloon from-right">
                <p>Payment Statys: pending</p>
              </div>
            </section>
          )}
        </section>
      </div>
    </>
  )
}

export default StatusDialog

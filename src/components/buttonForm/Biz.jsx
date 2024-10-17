import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Biz = () => {
  const [scriptLoad, setScriptLoad] = useState(false);
  const sessionKey = useSelector((state) => state.session.token?.sessionKey);
  const transactionId = useSelector((state) => state.session.token?.transactionId);
  const purchaseNumber = useSelector((state) => state.session.token?.purchaseNumber)
  const amount = useSelector((state) => state.payment.amountToPay);

  useEffect(() => {
    // Escuchar los mensajes de la pasarela
    const handlePaymentMessage = (event) => {
      if (event.origin === import.meta.env.VITE_NIUBIZ_ORIGIN) { // Asegúrate de que sea el origen correcto
        const paymentStatus = event.data.status;
        if (paymentStatus === 'success') {
          console.log('Pago exitoso:', event.data);

          // Llamada a tu API para procesar el token de transacción (transactionToken)
          fetch('/v1/coinmarket/transaction-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              transactionId: transactionId,
              amount: amount,
              userId: event.data.userId, // Obtener del evento
              channel: 'web',            // Puedes ajustar según tu lógica
              transactionToken: event.data.transactionToken // Token enviado por la pasarela
            })
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              console.log('Transacción procesada exitosamente:', data);

              // Hacer la llamada a create-payment desde aquí si es necesario
              fetch('/v1/coinmarket/create-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  transactionId: data.transactionId,
                  amount: data.amount,
                  userId: data.userId,
                  channel: data.channel,
                  transactionToken: data.transactionToken
                })
              })
              .then(paymentResponse => paymentResponse.json())
              .then(paymentData => {
                if (paymentData.paymentAuthorized) {
                  // Redirigir a pantalla de éxito sin refrescar la página
                  window.location.href = '/paymentSuccess';
                } else {
                  // Redirigir a pantalla de fallo
                  window.location.href = '/paymentFailure';
                }
              });
            } else {
              console.error('Error procesando el token:', data);
              window.location.href = '/paymentFailure';
            }
          })
          .catch(error => {
            console.error('Error en la llamada a transaction-token:', error);
            window.location.href = '/paymentFailure';
          });

        } else {
          console.log('Pago fallido:', event.data);
          window.location.href = '/paymentFailure';
        }
      }
    };

    window.addEventListener('message', handlePaymentMessage);

    // Cargar el script de la pasarela de pago
    const formElement = document.getElementById('payment-form');
    const script = document.createElement('script');
    if (sessionKey && amount) {
      script.src = import.meta.env.VITE_NIUBIZ_URL;
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('data-sessiontoken', sessionKey);
      script.setAttribute('data-channel', 'web');
      script.setAttribute('data-merchantid', import.meta.env.VITE_NIUBIZ_MERCHANT_ID);
      script.setAttribute('data-purchasenumber', purchaseNumber);
      script.setAttribute('data-amount', amount);
      script.setAttribute('data-expirationminutes', '20');
      script.setAttribute('data-timeouturl', 'about:blank');
      script.setAttribute('data-merchantname', 'subastop');
      script.setAttribute('data-formbuttoncolor', '#000000');

      formElement.appendChild(script);
      script.onload = () => {
        setScriptLoad(true);
        console.log('Script de pasarela de pago cargado.');
      };

      script.onerror = (error) => {
        setScriptLoad(false);
        console.error('Error al cargar el script de la pasarela de pago:', error);
      };
    }

    return () => {
      // Limpiar el script y remover el listener cuando el componente se desmonte
      window.removeEventListener('message', handlePaymentMessage);
      const element = document.getElementById('script');
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, [sessionKey, amount]);

  return null;
};

export default Biz;

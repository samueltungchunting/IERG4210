import { useEffect, useRef } from 'react'

const Paypal = () => {

  const paypalBtnRef = useRef()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "HKD",
                  value: 100.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalBtnRef.current);
  }, [])

  return (
    <div className="">
      <div ref={paypalBtnRef}></div>
    </div>
  )
}

export default Paypal
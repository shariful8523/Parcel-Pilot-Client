import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { Title } from 'react-head';

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

    return (
        <>

            <Title> Parcel Pilot || Payment </Title>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </>

    );
};

export default Payment;
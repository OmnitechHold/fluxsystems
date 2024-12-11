import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentService from '../services/PaymentService';
import { Button, TextField, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 500,
  margin: '0 auto',
}));

const CardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

interface PaymentPortalProps {
  policyDetails: {
    policyId: string;
    customerId: string;
    customerName: string;
    email: string;
    coverage: string;
    premium: number;
  };
  onPaymentComplete: (success: boolean) => void;
}

const PaymentForm: React.FC<PaymentPortalProps> = ({ policyDetails, onPaymentComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const paymentService = PaymentService.getInstance();
      
      await paymentService.processPayment(
        policyDetails.premium,
        'USD',
        {
          ...policyDetails,
          card: cardElement,
        }
      );

      onPaymentComplete(true);
    } catch (error: any) {
      setError(error.message);
      onPaymentComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Policy Details:
          </Typography>
          <Typography>
            Policy ID: {policyDetails.policyId}
          </Typography>
          <Typography>
            Coverage: {policyDetails.coverage}
          </Typography>
          <Typography>
            Premium: ${policyDetails.premium}
          </Typography>
        </Box>

        <CardContainer>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </CardContainer>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!stripe || loading}
        >
          {loading ? <CircularProgress size={24} /> : `Pay $${policyDetails.premium}`}
        </Button>
      </form>
    </StyledPaper>
  );
};

const PaymentPortal: React.FC<PaymentPortalProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentPortal;

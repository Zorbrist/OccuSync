// hooks/usePaymentData.ts
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerInvoice, processPayment } from '../services/customerService';
import type { InvoiceDetail, PaymentPayload } from '../types/customerType';

export function usePaymentData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMethod, setSelectedMethod] = useState<PaymentPayload['method']>('ONLINE_BANKING');
  const [receiptFile, setReceiptFile] = useState<File | null>(null); // For the photo_url mock
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      try {
        const data = await getCustomerInvoice(id);
        setInvoice(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load invoice for payment');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handlePayment = async () => {
    if (!invoice) return;
    setIsSubmitting(true);
    
    try {
      // 1. Initialize the strict base payload
      const payload: PaymentPayload = {
        method: selectedMethod,
      };

      // 2. Safely attach the photo string only if a file was uploaded
      if (receiptFile) {
        payload.photo_url = 'uploaded_receipt_url_mock.jpg';
      }

      await processPayment(Number(invoice.invoice_id), payload);
      setShowSuccessModal(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Payment failed to process. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/customer/invoices'); // Redirect back to invoices list
  };

  return {
    invoice,
    isLoading,
    error,
    selectedMethod,
    setSelectedMethod,
    receiptFile,
    setReceiptFile,
    isSubmitting,
    showSuccessModal,
    handlePayment,
    handleSuccessClose,
    navigate
  };
}
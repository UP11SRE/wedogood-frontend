import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { submitReport } from '../api/endpoints';

const schema = yup.object({
  ngo_id: yup.string().trim().required('NGO ID is required'),
  month: yup
    .string()
    .required('Month is required')
    .matches(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format')
    .test('valid-month', 'Month must be between 01 and 12', (value) => {
      if (!value) return false;
      const month = parseInt(value.split('-')[1], 10);
      return month >= 1 && month <= 12;
    }),
  people_helped: yup
    .number()
    .typeError('Must be a number')
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .required('People helped is required'),
  events_conducted: yup
    .number()
    .typeError('Must be a number')
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .required('Events conducted is required'),
  funds_utilized: yup
    .number()
    .typeError('Must be a number')
    .integer('Must be an integer')
    .min(0, 'Must be at least 0')
    .required('Funds utilized is required'),
});

const SubmitReport = () => {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: submitReport,
    onSuccess: (data) => {
      setToast({ open: true, message: data.message || 'Report submitted successfully', severity: 'success' });
      setServerError('');
      reset();
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      if (responseData?.fieldErrors) {
        Object.entries(responseData.fieldErrors).forEach(([field, message]) => {
          if (message) {
            setError(field, { type: 'server', message });
          }
        });
      }
      setServerError(responseData?.message || 'Failed to submit report. Please try again.');
    },
  });

  const onSubmit = (data) => {
    setServerError('');
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>

        <h1 style={{ margin: '0 0 30px 0', fontSize: '28px', color: '#333' }}>
          Submit Monthly Report
        </h1>

        {serverError && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            background: '#ffebee',
            border: '1px solid #ef9a9a',
            borderRadius: '4px',
            color: '#c62828'
          }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              NGO ID *
            </label>
            <input
              {...register('ngo_id')}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: errors.ngo_id ? '1px solid #d32f2f' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter NGO ID"
            />
            {errors.ngo_id && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#d32f2f' }}>
                {errors.ngo_id.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Month *
            </label>
            <input
              {...register('month')}
              type="month"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: errors.month ? '1px solid #d32f2f' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
            {errors.month && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#d32f2f' }}>
                {errors.month.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              People Helped *
            </label>
            <input
              {...register('people_helped')}
              type="number"
              min="0"
              step="1"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: errors.people_helped ? '1px solid #d32f2f' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="0"
            />
            {errors.people_helped && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#d32f2f' }}>
                {errors.people_helped.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Events Conducted *
            </label>
            <input
              {...register('events_conducted')}
              type="number"
              min="0"
              step="1"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: errors.events_conducted ? '1px solid #d32f2f' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="0"
            />
            {errors.events_conducted && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#d32f2f' }}>
                {errors.events_conducted.message}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Funds Utilized (₹) *
            </label>
            <input
              {...register('funds_utilized')}
              type="number"
              min="0"
              step="1"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: errors.funds_utilized ? '1px solid #d32f2f' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="0"
            />
            {errors.funds_utilized && (
              <div style={{ marginTop: '4px', fontSize: '12px', color: '#d32f2f' }}>
                {errors.funds_utilized.message}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button
              type="submit"
              disabled={mutation.isPending}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                background: mutation.isPending ? '#90caf9' : '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: mutation.isPending ? 'not-allowed' : 'pointer'
              }}
            >
              {mutation.isPending ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setServerError('');
              }}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                background: 'white',
                color: '#1976d2',
                border: '1px solid #1976d2',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {toast.open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: toast.severity === 'success' ? '#4caf50' : '#f44336',
          color: 'white',
          borderRadius: '4px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default SubmitReport;

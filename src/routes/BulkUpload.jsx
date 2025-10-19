import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadCSV } from '../api/endpoints';
import { useJobPoll } from '../hooks/useJobPoll';

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const mutation = useMutation({
    mutationFn: uploadCSV,
    onSuccess: (data) => {
      setJobId(data.job_id);
      setToast({
        open: true,
        message: `Upload started. Job ID: ${data.job_id}`,
        severity: 'info',
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Upload failed. Please try again.';
      setToast({ open: true, message, severity: 'error' });
      setSelectedFile(null);
    },
  });

  const { data: jobStatus } = useJobPoll(jobId, !!jobId);

  useEffect(() => {
    if (jobStatus) {
      if (jobStatus.status === 'success') {
        setToast({
          open: true,
          message: 'Upload completed successfully.',
          severity: 'success',
        });
        // Clear file after successful upload
        setSelectedFile(null);
      } else if (jobStatus.status === 'failed') {
        setToast({
          open: true,
          message: 'Upload failed. Please fix the CSV and try again.',
          severity: 'error',
        });
        // Clear file after failed upload
        setSelectedFile(null);
      }
    }
  }, [jobStatus?.status]);

  const handleUpload = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile);
    }
  };

  const handleCancelPolling = () => {
    setJobId(null);
    setSelectedFile(null);
  };

  const isJobActive = jobId && jobStatus && (jobStatus.status === 'pending' || jobStatus.status === 'processing');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else if (file) {
      setToast({ open: true, message: 'Please select a CSV file', severity: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>

        <h1 style={{ margin: '0 0 30px 0', fontSize: '28px', color: '#333' }}>
          Bulk Upload (CSV)
        </h1>

        {/* File Upload */}
        <div style={{
          border: '2px dashed #ddd',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          background: '#fafafa',
          marginBottom: '20px'
        }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="csv-upload"
          />
          <label htmlFor="csv-upload" style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '48px', color: '#bbb', marginBottom: '10px' }}>📄</div>
            <div style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
              {selectedFile ? selectedFile.name : 'Click to select CSV file'}
            </div>
            <div style={{ fontSize: '14px', color: '#999' }}>
              or drag and drop here
            </div>
          </label>
        </div>

        {/* Upload Button */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || mutation.isPending || isJobActive}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              background: (!selectedFile || mutation.isPending || isJobActive) ? '#90caf9' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (!selectedFile || mutation.isPending || isJobActive) ? 'not-allowed' : 'pointer'
            }}
          >
            {mutation.isPending ? 'Uploading...' : 'Upload'}
          </button>
          {isJobActive && (
            <button
              onClick={handleCancelPolling}
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
              Cancel
            </button>
          )}
        </div>

        {/* Job Status */}
        {jobStatus && (
          <div style={{
            padding: '20px',
            background: jobStatus.status === 'success' ? '#e8f5e9' : jobStatus.status === 'failed' ? '#ffebee' : '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${jobStatus.status === 'success' ? '#4caf50' : jobStatus.status === 'failed' ? '#f44336' : '#e0e0e0'}`
          }}>
            <div style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              Upload Progress
            </div>
            {jobId && (
              <div style={{ marginBottom: '10px', fontSize: '13px', color: '#666', fontFamily: 'monospace' }}>
                Job ID: {jobId}
              </div>
            )}
            <div style={{
              marginBottom: '10px',
              fontSize: '15px',
              fontWeight: '600',
              color: jobStatus.status === 'success' ? '#2e7d32' : jobStatus.status === 'failed' ? '#c62828' : '#1976d2'
            }}>
              {jobStatus.status === 'pending' && '⏳ Preparing to process CSV...'}
              {jobStatus.status === 'processing' && `📊 Processed ${jobStatus.processed} of ${jobStatus.total} rows (${Math.round((jobStatus.processed / jobStatus.total) * 100)}%)`}
              {jobStatus.status === 'success' && '✅ Upload completed successfully!'}
              {jobStatus.status === 'failed' && '❌ Upload failed'}
            </div>

            {/* Progress Bar */}
            {(jobStatus.status === 'pending' || jobStatus.status === 'processing') && (
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px'
              }}>
                {jobStatus.total > 0 ? (
                  <div style={{
                    width: `${(jobStatus.processed / jobStatus.total) * 100}%`,
                    height: '100%',
                    background: '#1976d2',
                    transition: 'width 0.3s ease'
                  }} />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 50%, #1976d2 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'indeterminate 1.5s ease-in-out infinite'
                  }} />
                )}
              </div>
            )}

            {jobStatus.error_message && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                background: '#ffcdd2',
                borderRadius: '4px',
                color: '#c62828',
                fontSize: '14px'
              }}>
                {jobStatus.error_message}
              </div>
            )}
          </div>
        )}

        <style>{`
          @keyframes indeterminate {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>

        {/* CSV Format Help */}
        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#333' }}>
            CSV Format
          </h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
            Required columns (in order): ngo_id, month (YYYY-MM), people_helped, events_conducted, funds_utilized
          </p>
          <div style={{
            padding: '12px',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#333',
            marginBottom: '8px'
          }}>
            ngo_id,month,people_helped,events_conducted,funds_utilized
          </div>
          <div style={{
            padding: '12px',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#666'
          }}>
            NGO_001,2025-09,120,5,75000
          </div>
        </div>
      </div>

      {toast.open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: toast.severity === 'success' ? '#4caf50' : toast.severity === 'info' ? '#2196f3' : '#f44336',
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

export default BulkUpload;

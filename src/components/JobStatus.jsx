import { Card, CardContent, Typography, LinearProgress, Box, Chip, Alert } from '@mui/material';

const JobStatus = ({ status, processed, total, errorMessage }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'processing':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getProgress = () => {
    if (!total) return 0;
    return (processed / total) * 100;
  };

  return (
    <Card elevation={3} sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Job Status</Typography>
          <Chip label={status.toUpperCase()} color={getStatusColor()} />
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Processed {processed} of {total} rows
        </Typography>

        {status === 'pending' || status === 'processing' ? (
          <LinearProgress
            variant={total > 0 ? 'determinate' : 'indeterminate'}
            value={getProgress()}
            sx={{ height: 8, borderRadius: 4 }}
          />
        ) : null}

        {status === 'failed' && errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {status === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Upload completed successfully
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default JobStatus;

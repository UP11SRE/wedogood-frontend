import { Card, CardContent, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, icon, prefix = '' }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon && <Box sx={{ mr: 1, color: 'primary.main' }}>{icon}</Box>}
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold">
          {prefix}
          {formatNumber(value)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

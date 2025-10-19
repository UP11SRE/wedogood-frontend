import { Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileDropzone = ({ onFileSelect, selectedFile }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: 'primary.main',
        backgroundColor: 'action.hover',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.selected',
        },
      }}
    >
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-file-input"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="csv-file-input" style={{ cursor: 'pointer', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6">
            {selectedFile ? selectedFile.name : 'Click to select CSV file'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Only .csv files are accepted
          </Typography>
        </Box>
      </label>
    </Paper>
  );
};

export default FileDropzone;

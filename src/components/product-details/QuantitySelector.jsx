import { Box, IconButton, Typography } from '@mui/material';
import RemoveOutlined from '@mui/icons-material/RemoveOutlined';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { pulse7Colors } from '../../theme/theme';

function QuantitySelector({ quantity, onChange }) {
  const decrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < 10) {
      onChange(quantity + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 128,
        px: 1.5,
        py: 0.5,
        border: `1px solid ${pulse7Colors.primaryText}`,
        borderRadius: '6px',
        bgcolor: pulse7Colors.surface,
        flexShrink: 0,
      }}
    >
      <IconButton
        aria-label="Decrease quantity"
        onClick={decrease}
        disabled={quantity <= 1}
        size="small"
      >
        <RemoveOutlined fontSize="small" />
      </IconButton>
      <Typography
        aria-live="polite"
        sx={{ fontSize: '1rem', fontWeight: 500, minWidth: 24, textAlign: 'center' }}
      >
        {quantity}
      </Typography>
      <IconButton
        aria-label="Increase quantity"
        onClick={increase}
        disabled={quantity >= 10}
        size="small"
      >
        <AddOutlined fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default QuantitySelector;

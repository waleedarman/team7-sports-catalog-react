import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { pulse7Colors } from '../../theme/theme';

function CatalogSearch({ search, onSearchChange }) {
  return (
    <TextField
      fullWidth
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search performance gear"
      aria-label="Search performance gear"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined sx={{ color: pulse7Colors.secondaryText, fontSize: 22 }} />
          </InputAdornment>
        ),
        endAdornment: search ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="Clear search"
              onClick={() => onSearchChange('')}
              edge="end"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: pulse7Colors.surface,
          borderRadius: '12px',
          minHeight: 54,
          fontSize: '1rem',
          fontFamily: '"Inter", sans-serif',
          boxShadow: 'none',
          '& fieldset': {
            borderColor: pulse7Colors.border,
          },
          '&:hover fieldset': {
            borderColor: pulse7Colors.secondaryText,
          },
          '&.Mui-focused fieldset': {
            borderColor: pulse7Colors.primaryText,
            borderWidth: 1,
          },
        },
        '& .MuiOutlinedInput-input': {
          py: 1.75,
        },
      }}
    />
  );
}

export default CatalogSearch;

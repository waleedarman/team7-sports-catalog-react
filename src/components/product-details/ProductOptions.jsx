import { Box, Button, Typography } from '@mui/material';
import { pulse7Colors } from '../../theme/theme';

function ColorSwatch({ colorOption, isSelected, onSelect }) {
  return (
    <Button
      type="button"
      aria-label={`Select ${colorOption.name}`}
      aria-pressed={isSelected}
      disabled={!colorOption.available}
      onClick={() => onSelect(colorOption)}
      sx={{
        minWidth: 64,
        width: 64,
        height: 64,
        p: 0.5,
        borderRadius: '50%',
        border: isSelected
          ? `2px solid ${pulse7Colors.primaryText}`
          : `1px solid ${pulse7Colors.border}`,
        opacity: colorOption.available ? 1 : 0.4,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          bgcolor: colorOption.primary,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '50%',
            height: '50%',
            bgcolor: colorOption.secondary,
          }}
        />
      </Box>
    </Button>
  );
}

function ProductOptions({
  product,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
}) {
  const hasColors = product.colorOptions?.length > 0;
  const hasSizes = product.sizes?.length > 0;

  if (!hasColors && !hasSizes) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {hasColors && (
        <Box
          sx={{
            borderTop: `1px solid ${pulse7Colors.border}`,
            pt: 3,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>
            Color:{' '}
            <Box component="span" sx={{ fontWeight: 400 }}>
              {selectedColor?.name}
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 1.5 }}>
            {product.colorOptions.map((colorOption) => (
              <ColorSwatch
                key={colorOption.id}
                colorOption={colorOption}
                isSelected={selectedColor?.id === colorOption.id}
                onSelect={onColorChange}
              />
            ))}
          </Box>
        </Box>
      )}

      {hasSizes && (
        <Box
          sx={{
            borderTop: `1px solid ${pulse7Colors.border}`,
            pt: 3,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>
            Select Size (US)
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(3, minmax(0, 1fr))',
                sm: 'repeat(4, minmax(0, 1fr))',
              },
              gap: 1,
            }}
          >
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size.value;

              return (
                <Button
                  key={size.value}
                  type="button"
                  disabled={!size.available}
                  aria-pressed={isSelected}
                  onClick={() => onSizeChange(size.value)}
                  sx={{
                    py: 1.25,
                    minWidth: 0,
                    borderRadius: '6px',
                    border: isSelected
                      ? `2px solid ${pulse7Colors.primaryText}`
                      : `1px solid ${pulse7Colors.border}`,
                    bgcolor: isSelected ? '#E8E8E6' : pulse7Colors.surface,
                    color: size.available
                      ? pulse7Colors.primaryText
                      : pulse7Colors.secondaryText,
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&.Mui-disabled': {
                      opacity: 0.45,
                      color: pulse7Colors.secondaryText,
                    },
                  }}
                >
                  {size.value}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductOptions;

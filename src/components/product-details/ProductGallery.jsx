import { useState } from 'react';
import { Box, Dialog, IconButton } from '@mui/material';
import ZoomInOutlined from '@mui/icons-material/ZoomInOutlined';
import FullscreenOutlined from '@mui/icons-material/FullscreenOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { getProductGallery } from '../../data/products';
import { pulse7Colors } from '../../theme/theme';

function ProductGallery({ product }) {
  const gallery = getProductGallery(product);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const selectedImage = gallery[selectedIndex] || product.image;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: pulse7Colors.surface,
          border: `1px solid ${pulse7Colors.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: { xs: '1 / 1', md: 'auto' },
          minHeight: { md: 480, lg: 560 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover .gallery-controls': {
            opacity: 1,
          },
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Box
          component="img"
          src={selectedImage}
          alt={`${product.name} product view`}
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: { md: 560 },
            objectFit: 'contain',
            p: { xs: 3, md: 4 },
            transition: 'transform 0.3s ease',
            transform: isZoomed ? 'scale(1.15)' : 'scale(1)',
          }}
        />

        <Box
          className="gallery-controls"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'flex',
            gap: 1,
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.2s ease',
          }}
        >
          <IconButton
            aria-label="Zoom product image"
            onClick={() => setFullscreenOpen(true)}
            sx={{
              bgcolor: pulse7Colors.primaryText,
              color: '#FFFFFF',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: pulse7Colors.secondaryBlue },
            }}
          >
            <ZoomInOutlined fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="View product image fullscreen"
            onClick={() => setFullscreenOpen(true)}
            sx={{
              bgcolor: pulse7Colors.primaryText,
              color: '#FFFFFF',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: pulse7Colors.secondaryBlue },
            }}
          >
            <FullscreenOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {gallery.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 0.5,
          }}
        >
          {gallery.map((image, index) => (
            <Box
              key={image}
              component="button"
              type="button"
              aria-label={`View ${product.name} image ${index + 1}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              sx={{
                width: 96,
                height: 96,
                flexShrink: 0,
                p: 0,
                border:
                  selectedIndex === index
                    ? `2px solid ${pulse7Colors.electricLime}`
                    : `1px solid ${pulse7Colors.border}`,
                borderRadius: '12px',
                overflow: 'hidden',
                bgcolor: pulse7Colors.surface,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
                '&:hover': {
                  borderColor: pulse7Colors.primaryText,
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      <Dialog
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        maxWidth="lg"
        fullWidth
        aria-label={`${product.name} fullscreen image`}
      >
        <Box sx={{ position: 'relative', bgcolor: pulse7Colors.background, p: 2 }}>
          <IconButton
            aria-label="Close fullscreen image"
            onClick={() => setFullscreenOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: pulse7Colors.surface,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={selectedImage}
            alt={`${product.name} fullscreen view`}
            sx={{
              width: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default ProductGallery;

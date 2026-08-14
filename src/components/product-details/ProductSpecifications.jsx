import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { pulse7Colors } from '../../theme/theme';

function ProductSpecifications({ product }) {
  const details = product.details?.length
    ? product.details
    : [
        ...(product.description
          ? [{ label: 'Description', value: product.description }]
          : []),
        ...(product.tags?.length
          ? [{ label: 'Features', value: product.tags.join(', ') }]
          : []),
      ];

  if (!details.length) {
    return null;
  }

  return (
    <Box sx={{ mt: { xs: 6, md: 8 }, mb: { xs: 4, md: 6 } }}>
      <Accordion
        defaultExpanded={false}
        elevation={0}
        sx={{
          borderTop: `1px solid ${pulse7Colors.border}`,
          borderBottom: `1px solid ${pulse7Colors.border}`,
          '&::before': { display: 'none' },
          bgcolor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="product-details-content"
          id="product-details-header"
          sx={{ px: 0 }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Anton", sans-serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              textTransform: 'uppercase',
            }}
          >
            PRODUCT DETAILS
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {details.map((detail) => (
              <Box
                component="li"
                key={detail.label}
                sx={{
                  display: 'flex',
                  gap: 1,
                  mb: 1.5,
                  fontSize: '1rem',
                  color: pulse7Colors.secondaryText,
                  lineHeight: 1.6,
                }}
              >
                <Typography component="span" sx={{ fontWeight: 600, color: pulse7Colors.primaryText }}>
                  {detail.label}:
                </Typography>
                <Typography component="span">{detail.value}</Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ProductSpecifications;

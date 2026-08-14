import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router';
import { pulse7Colors } from '../../theme/theme';

function PerformanceCategoryCard({ category }) {
  return (
    <Box
      component={RouterLink}
      to={category.route}
      sx={{
        position: 'relative',
        display: 'block',
        aspectRatio: '3 / 4',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover img': {
          transform: 'scale(1.05)',
        },
        '&:hover .category-arrow': {
          bgcolor: pulse7Colors.electricLime,
          color: pulse7Colors.primaryText,
        },
      }}
    >
      <Box
        component="img"
        src={category.image}
        alt={category.name}
        loading="lazy"
        decoding="async"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transition: 'transform 0.5s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(26, 28, 27, 0.82) 0%, rgba(26, 28, 27, 0.25) 38%, transparent 62%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          p: { xs: 2, sm: 3 },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: '"Anton", sans-serif',
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' },
            textTransform: 'uppercase',
            color: '#FFFFFF',
            mb: 1,
            lineHeight: 1.1,
          }}
        >
          {category.name}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '1rem',
            mb: 2,
            display: { xs: 'none', md: 'block' },
          }}
        >
          {category.description}
        </Typography>
        <Box
          className="category-arrow"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.12)',
            color: pulse7Colors.electricLime,
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );
}

export default PerformanceCategoryCard;

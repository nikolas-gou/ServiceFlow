import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs as MUIBreadcrumbs, Typography, Box, Chip, styled } from '@mui/material';
import {
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  Build as BuildIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';

// Styled components για καλύτερη εμφάνιση
const StyledBreadcrumbsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  minHeight: '40px',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#6b7280',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  fontSize: '14px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#f3f4f6',
    color: '#374151',
  },
}));

const CurrentPageChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  fontWeight: 600,
  fontSize: '14px',
  height: '28px',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapping για paths με icons
  const pathConfig = {
    dashboard: {
      label: 'Πίνακας ελέγχου',
      icon: <HomeIcon sx={{ fontSize: 16 }} />,
      route: '/dashboard/overview',
    },
    overview: {
      label: 'Αρχική',
      icon: <HomeIcon sx={{ fontSize: 16 }} />,
      route: '/dashboard/overview',
    },
    analytics: {
      label: 'Στατιστικά',
      icon: <AssessmentIcon sx={{ fontSize: 16 }} />,
      route: '/dashboard/analytics',
    },
    customers: {
      label: 'Πελάτες',
      icon: <GroupIcon sx={{ fontSize: 16 }} />,
      route: '/dashboard/customers',
    },
    services: {
      label: 'Επισκευές',
      icon: <BuildIcon sx={{ fontSize: 16 }} />,
      route: '/dashboard/services',
    },
  };

  // Build route για κάθε breadcrumb
  const buildRoute = (index) => {
    const currentPath = pathnames[index];
    const config = pathConfig[currentPath];

    // Αν υπάρχει predefined route στο config, χρησιμοποίησε αυτό
    if (config && config.route) {
      return config.route;
    }

    // Αλλιώς χτίσε το route δυναμικά
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  return (
    <StyledBreadcrumbsContainer>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16, color: '#d1d5db' }} />}
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
          },
        }}
      >
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const config = pathConfig[name];
          const route = buildRoute(index);

          if (!config) return null;

          return isLast ? (
            // Τελευταίο στοιχείο (current page) - εμφανίζεται ως Chip
            <CurrentPageChip key={name} icon={config.icon} label={config.label} size="small" />
          ) : (
            // Προηγούμενα στοιχεία - εμφανίζονται ως links
            <StyledLink key={name} to={route}>
              {config.icon}
              <Typography component="span" sx={{ fontSize: 'inherit' }}>
                {config.label}
              </Typography>
            </StyledLink>
          );
        })}
      </MUIBreadcrumbs>
    </StyledBreadcrumbsContainer>
  );
}

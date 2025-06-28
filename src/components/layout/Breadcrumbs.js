import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    color: 'rgba(255, 255, 255, 0.5)',
    margin: '0 8px',
  },
}));

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  padding: '4px 8px',
  borderRadius: '8px',
  '&:hover': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    marginRight: '4px',
    transition: 'transform 0.2s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
});

const CurrentPageText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontWeight: 600,
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    marginRight: '4px',
  },
});

const BreadcrumbContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
});

const pathMap = {
  overview: {
    label: 'Αρχική',
    icon: <HomeIcon sx={{ color: '#90caf9' }} />,
  },
  analytics: {
    label: 'Στατιστικά',
    icon: <AssessmentIcon sx={{ color: '#81d4fa' }} />,
  },
  customers: {
    label: 'Πελάτες',
    icon: <GroupIcon sx={{ color: '#80cbc4' }} />,
  },
  services: {
    label: 'Επισκευές',
    icon: <BuildIcon sx={{ color: '#ffb74d' }} />,
  },
  settings: {
    label: 'Ρυθμίσεις',
    icon: <SettingsIcon sx={{ color: '#b39ddb' }} />,
  },
  about: {
    label: 'Σχετικά',
    icon: <InfoIcon sx={{ color: '#9fa8da' }} />,
  },
  feedback: {
    label: 'Feedback',
    icon: <FeedbackIcon sx={{ color: '#f48fb1' }} />,
  },
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbContainer>
      <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const pathInfo = pathMap[value] || { label: value, icon: null };

          if (last) {
            return (
              <CurrentPageText key={to}>
                {pathInfo.icon}
                {pathInfo.label}
              </CurrentPageText>
            );
          }

          return (
            <StyledLink key={to} component={RouterLink} to="/dashboard/overview" underline="none">
              {pathInfo.icon}
              {pathInfo.label}
            </StyledLink>
          );
        })}
      </StyledBreadcrumbs>
    </BreadcrumbContainer>
  );
}

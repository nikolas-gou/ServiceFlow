import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// Styled Components με το ίδιο aesthetic pattern
const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  marginTop: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
  border: '1px solid rgba(25, 118, 210, 0.12)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(25,118,210,0.12)',
    borderColor: 'rgba(25, 118, 210, 0.2)',
  },
}));

const PageButton = styled(IconButton)(({ theme, isActive }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  margin: '0 3px',
  fontSize: '0.875rem',
  fontWeight: 600,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  background: isActive ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'transparent',
  color: isActive ? '#ffffff' : '#546e7a',
  boxShadow: isActive ? '0 4px 12px rgba(25, 118, 210, 0.25)' : 'none',
  border: isActive ? 'none' : '1px solid rgba(25, 118, 210, 0.15)',
  '&:hover': {
    background: isActive
      ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
      : 'rgba(25, 118, 210, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: isActive
      ? '0 6px 16px rgba(25, 118, 210, 0.3)'
      : '0 2px 8px rgba(25, 118, 210, 0.12)',
  },
  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
    transform: 'none',
  },
}));

const PageNumberButton = styled(IconButton)(({ theme, isActive }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  margin: '0 3px',
  fontSize: '0.875rem',
  fontWeight: 600,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  background: isActive ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'transparent',
  color: isActive ? '#ffffff' : '#546e7a',
  boxShadow: isActive ? '0 4px 12px rgba(25, 118, 210, 0.25)' : 'none',
  border: isActive ? 'none' : '1px solid rgba(25, 118, 210, 0.15)',
  '&:hover': {
    background: isActive
      ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
      : 'rgba(25, 118, 210, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: isActive
      ? '0 6px 16px rgba(25, 118, 210, 0.3)'
      : '0 2px 8px rgba(25, 118, 210, 0.12)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  height: '36px',
  borderRadius: '10px',
  fontSize: '0.875rem',
  fontWeight: 500,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  transition: 'all 0.3s ease',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(25, 118, 210, 0.2)',
    borderWidth: '1px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(25, 118, 210, 0.4)',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
    borderWidth: '2px',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
  },
  '& .MuiSelect-select': {
    padding: '8px 14px',
    paddingRight: '32px !important',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function PaginationComponent({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 20,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Υπολογισμός των σελίδων που θα εμφανίζονται
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : isTablet ? 5 : 7;
    // κυριως για τα 1, .., Κ, ... , Ν
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Προσαρμογή αν είμαστε κοντά στην αρχή ή το τέλος
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange?.(newPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    onItemsPerPageChange?.(event.target.value);
  };

  if (totalPages <= 1 && !showItemsPerPage) return null;

  return (
    <PaginationContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            display: isMobile ? 'none' : 'block',
          }}
        >
          Εμφάνιση
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {totalItems === 0 ? '0' : `${startItem}-${endItem}`}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          από {totalItems}
        </Typography>

        {/* Items per page selector */}
        {showItemsPerPage && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: isMobile ? 'none' : 'block',
              }}
            >
              Ανά σελίδα:
            </Typography>
            <StyledSelect value={itemsPerPage} onChange={handleItemsPerPageChange} size="small">
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </StyledSelect>
          </Box>
        )}
      </Box>

      {/* Pagination Controls - Δεξιά */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {/* First Page */}
        {!isMobile && (
          <PageButton onClick={() => handlePageChange(1)} disabled={currentPage === 1} size="small">
            <FirstPageIcon fontSize="small" />
          </PageButton>
        )}

        {/* Previous Page */}
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="small"
        >
          <ChevronLeftIcon fontSize="small" />
        </PageButton>

        {/* Ellipsis αρχή */}
        {pageNumbers[0] > 1 && !isMobile && (
          <>
            <PageNumberButton onClick={() => handlePageChange(1)} size="small">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>1</Typography>
            </PageNumberButton>
            {pageNumbers[0] > 2 && (
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mx: 0.5,
                  userSelect: 'none',
                }}
              >
                ...
              </Typography>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <PageNumberButton
            key={page}
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
            size="small"
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{page}</Typography>
          </PageNumberButton>
        ))}

        {/* Ellipsis τέλος */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && !isMobile && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mx: 0.5,
                  userSelect: 'none',
                }}
              >
                ...
              </Typography>
            )}
            <PageNumberButton onClick={() => handlePageChange(totalPages)} size="small">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{totalPages}</Typography>
            </PageNumberButton>
          </>
        )}

        {/* Next Page */}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="small"
        >
          <ChevronRightIcon fontSize="small" />
        </PageButton>

        {/* Last Page */}
        {!isMobile && (
          <PageButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            size="small"
          >
            <LastPageIcon fontSize="small" />
          </PageButton>
        )}
      </Box>
    </PaginationContainer>
  );
}

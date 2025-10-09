import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Close, ZoomIn, ZoomOut, CameraAlt } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import config from '../../../config';

// Styled Components
const ThumbnailImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const FullScreenImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '80vh',
  objectFit: 'contain',
  transition: 'transform 0.3s ease',
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255,255,255,0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  zIndex: 1,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: 'rgba(255,255,255,0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  zIndex: 1,
}));

const ZoomButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  backgroundColor: 'rgba(255,255,255,0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  zIndex: 1,
}));

const ImageCounter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  fontWeight: 'bold',
  zIndex: 1,
}));

export const CardPhotos = ({ repair }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const images = repair?.images || [];

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          color: 'text.secondary',
        }}
      >
        <CameraAlt sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
        <Typography variant="body2">Δεν υπάρχουν φωτογραφίες</Typography>
      </Box>
    );
  }

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setZoom(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setZoom(1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const getImageUrl = (image) => {
    // Αν έχει preview (νέα φωτογραφία), χρησιμοποίησε το
    if (image.preview) {
      return image.preview;
    }
    // Αλλιώς, αν έχει id από server, χρησιμοποίησε το API endpoint
    if (image.id) {
      return `${config.server}/api/images/serve/${image.id}`;
    }
    return '';
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <ImageList cols={3} gap={12} sx={{ mb: 0 }}>
        {images.map((image, index) => (
          <ImageListItem key={image.id || index}>
            <ThumbnailImage
              src={getImageUrl(image)}
              alt={`Φωτογραφία ${index + 1}`}
              loading="lazy"
              onClick={() => handleOpen(index)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Full Screen Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.95)',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            p: 0,
            overflow: 'hidden',
          }}
        >
          {/* Image Counter */}
          <ImageCounter>
            {currentIndex + 1} / {images.length}
          </ImageCounter>

          {/* Close Button */}
          <CloseButton onClick={handleClose}>
            <Close />
          </CloseButton>

          {/* Previous Button */}
          {images.length > 1 && (
            <NavigationButton onClick={handlePrevious} sx={{ left: 16 }} aria-label="Προηγούμενη">
              <ChevronLeft />
            </NavigationButton>
          )}

          {/* Image */}
          <FullScreenImage
            src={getImageUrl(images[currentIndex])}
            alt={`Φωτογραφία ${currentIndex + 1}`}
            style={{ transform: `scale(${zoom})` }}
          />

          {/* Next Button */}
          {images.length > 1 && (
            <NavigationButton onClick={handleNext} sx={{ right: 16 }} aria-label="Επόμενη">
              <ChevronRight />
            </NavigationButton>
          )}

          {/* Zoom Buttons */}
          <ZoomButton onClick={handleZoomOut} sx={{ left: 16 }} disabled={zoom <= 1}>
            <ZoomOut />
          </ZoomButton>
          <ZoomButton onClick={handleZoomIn} sx={{ left: 72 }} disabled={zoom >= 3}>
            <ZoomIn />
          </ZoomButton>

          {/* Zoom Level Indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 140,
              backgroundColor: 'rgba(255,255,255,0.9)',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
            }}
          >
            {Math.round(zoom * 100)}%
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

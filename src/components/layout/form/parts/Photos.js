import React, { useState, useRef } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import StyledButton from '../../../common/StyledButton';
import { Image } from '../../../Models/Image';

const PhotoUploadContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const PhotoPreviewGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const PhotoPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
  },
}));

const PhotoPreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '&:hover .photo-actions': {
    opacity: 1,
  },
}));

const PhotoActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1),
  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const Photos = ({ repair, setRepair }) => {
  const [isLoading, setIsLoading] = useState(false);

  // reference for hidden input elements
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Handler for camera click
  const handleCameraClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // Handler for gallery click
  const handleGalleryClick = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  // Handler για την επιλογή φωτογραφίας (είτε από κάμερα είτε από συλλογή)
  const handlePhotoSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsLoading(true);
      try {
        const newPhotos = Array.from(files).map((file) => {
          // Δημιουργία URL για προεπισκόπηση
          const previewUrl = URL.createObjectURL(file);

          const image = new Image({
            file, // Το αρχείο για το upload
            preview: previewUrl, // URL για προεπισκόπηση στο UI
          });
          image.isNew = true; // Flag για να ξεχωρίζουμε τις νέες φωτογραφίες
          return image;
        });
        // Ενημέρωση του repair object
        setRepair((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newPhotos],
        }));
      } catch (error) {
        console.error('Σφάλμα κατά την επεξεργασία των φωτογραφιών:', error);
      } finally {
        setIsLoading(false);
        // Καθαρισμός του input για να επιτρέπει την επιλογή του ίδιου αρχείου
        event.target.value = '';
      }
    }
  };

  // Handler για διαγραφή φωτογραφίας
  const handleDeletePhoto = (index) => {
    const photoToDelete = repair.images[index];

    // Καθαρισμός του URL object αν είναι προεπισκόπηση
    if (photoToDelete.isNew && photoToDelete.preview) {
      URL.revokeObjectURL(photoToDelete.preview);
    }

    // Ενημέρωση του repair object
    setRepair((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Παίρνουμε τις φωτογραφίες από το repair object
  const photos = repair.images || [];

  return (
    <PhotoUploadContainer>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Προσθήκη Φωτογραφιών
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Προσθέστε φωτογραφίες του κινητήρα για καλύτερη τεκμηρίωση της επισκευής
        </Typography>
      </Box>

      {/* Κρυφά input elements για κάμερα και συλλογή */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handlePhotoSelect}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        accept="image/*"
        multiple
        ref={galleryInputRef}
        onChange={handlePhotoSelect}
        style={{ display: 'none' }}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <StyledButton
          variant="contained"
          color="primary"
          text="Λήψη Φωτογραφίας"
          startIcon={<PhotoCamera />}
          onClick={handleCameraClick}
        />
        <StyledButton
          variant="contained"
          color="secondary"
          text="Επιλογή από Συλλογή"
          startIcon={<CollectionsIcon />}
          onClick={handleGalleryClick}
        />
      </Box>

      <PhotoPreviewGrid container spacing={2}>
        {/* Placeholder για νέα φωτογραφία - εμφανίζεται μόνο αν δεν φορτώνουμε */}
        {!isLoading && (
          <Grid item xs={12} sm={6} md={4}>
            <PhotoPlaceholder onClick={handleGalleryClick}>
              <AddAPhotoIcon sx={{ fontSize: 40, color: 'grey.500' }} />
              <Typography variant="body2" color="textSecondary">
                Προσθήκη Φωτογραφίας
              </Typography>
            </PhotoPlaceholder>
          </Grid>
        )}

        {/* Προεπισκόπηση φωτογραφιών */}
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={photo.preview}>
            <PhotoPreview>
              <img src={photo.preview} alt={`Φωτογραφία ${index + 1}`} />
              <PhotoActions className="photo-actions">
                <StyledButton
                  variant="contained"
                  size="small"
                  color="error"
                  text="Διαγραφή"
                  onClick={() => handleDeletePhoto(index)}
                />
              </PhotoActions>
            </PhotoPreview>
          </Grid>
        ))}

        {/* Loading placeholder */}
        {isLoading && (
          <Grid item xs={12} sm={6} md={4}>
            <PhotoPlaceholder>
              <CircularProgress size={40} />
              <Typography variant="body2" color="textSecondary">
                Φόρτωση...
              </Typography>
            </PhotoPlaceholder>
          </Grid>
        )}
      </PhotoPreviewGrid>
    </PhotoUploadContainer>
  );
};

export default Photos;

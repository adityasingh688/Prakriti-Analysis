import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  LinearProgress,
  Button,
  Chip,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessIcon,
  LocalFlorist as HerbIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Results = ({ prakritiResults, userProfile }) => {
  const navigate = useNavigate();

  if (!prakritiResults) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="text.secondary">
          No results available. Please complete the analysis first.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/analysis')}
          sx={{ mt: 2 }}
        >
          Take Analysis
        </Button>
      </Box>
    );
  }

  const { percentages, primaryDosha, constitution, recommendations } = prakritiResults;

  const doshaColors = {
    vata: '#9C27B0', // Purple
    pitta: '#FF5722', // Red-Orange
    kapha: '#4CAF50'  // Green
  };

  const doshaDescriptions = {
    vata: {
      element: "Air & Space",
      qualities: "Light, Dry, Cold, Rough, Subtle, Mobile",
      characteristics: "Creative, energetic, quick-thinking, adaptable",
      imbalance: "Anxiety, restlessness, digestive issues, insomnia"
    },
    pitta: {
      element: "Fire & Water", 
      qualities: "Hot, Sharp, Light, Oily, Liquid, Mobile",
      characteristics: "Intelligent, focused, ambitious, organized",
      imbalance: "Anger, inflammation, heartburn, skin issues"
    },
    kapha: {
      element: "Earth & Water",
      qualities: "Heavy, Slow, Cold, Oily, Smooth, Stable",
      characteristics: "Calm, loving, patient, stable, strong",
      imbalance: "Lethargy, weight gain, congestion, depression"
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
        <TrendingUpIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Your Prakriti Results
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {userProfile?.firstName}, your constitution is: <strong>{constitution}</strong>
        </Typography>
        <Chip 
          label={`Primary Dosha: ${primaryDosha.toUpperCase()}`}
          sx={{ 
            backgroundColor: doshaColors[primaryDosha], 
            color: 'white',
            fontSize: '1.1rem',
            px: 2,
            py: 1
          }}
        />
      </Paper>

      <Grid container spacing={4}>
        {/* Dosha Percentages */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Your Dosha Distribution
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(percentages).map(([dosha, percentage]) => (
                  <Grid item xs={12} sm={4} key={dosha}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: doshaColors[dosha], fontWeight: 600 }}>
                        {dosha.toUpperCase()}
                      </Typography>
                      <Typography variant="h3" sx={{ color: doshaColors[dosha], mb: 1 }}>
                        {percentage}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: doshaColors[dosha],
                            borderRadius: 6,
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {doshaDescriptions[dosha].element}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Primary Dosha Details */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                About Your Primary Dosha: {primaryDosha.toUpperCase()}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Qualities</Typography>
                  <Typography variant="body1" paragraph>
                    {doshaDescriptions[primaryDosha].qualities}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>Characteristics</Typography>
                  <Typography variant="body1">
                    {doshaDescriptions[primaryDosha].characteristics}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>When Imbalanced</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {doshaDescriptions[primaryDosha].imbalance}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Personalized Recommendations
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <RestaurantIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Diet</Typography>
                  </Box>
                  <Typography variant="body1">
                    {recommendations.diet}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <FitnessIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Lifestyle</Typography>
                  </Box>
                  <Typography variant="body1">
                    {recommendations.lifestyle}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <HerbIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Herbs & Supplements</Typography>
                  </Box>
                  <Typography variant="body1">
                    {recommendations.herbs}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{ 
                px: 4, 
                py: 2, 
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: 3,
                mr: 2
              }}
            >
              View Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/analysis')}
              sx={{ 
                px: 4, 
                py: 2, 
                fontSize: '1.1rem',
                borderRadius: 3
              }}
            >
              Retake Analysis
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Results;

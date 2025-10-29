import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper
} from '@mui/material';
import {
  Spa as SpaIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Personal Profile',
      description: 'Create your detailed health profile with personal information and health history.',
      action: () => navigate('/profile')
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Prakriti Analysis',
      description: 'Take our comprehensive questionnaire to discover your unique Ayurvedic constitution.',
      action: () => navigate('/analysis')
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Health Dashboard',
      description: 'View your results, track progress, and get personalized recommendations.',
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <SpaIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          Discover Your Ayurvedic Constitution
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Understand your unique Prakriti (Vata, Pitta, Kapha) through our comprehensive 
          assessment and receive personalized health recommendations.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/profile')}
          sx={{ 
            px: 4, 
            py: 2, 
            fontSize: '1.1rem',
            borderRadius: 3,
            boxShadow: 3
          }}
        >
          Start Your Journey
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={feature.action}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'primary.light', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          About Ayurvedic Constitution
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Ayurveda recognizes three fundamental energies or doshas: Vata (air & space), 
          Pitta (fire & water), and Kapha (earth & water). Your unique combination of these 
          doshas determines your Prakriti - your natural constitution that influences your 
          physical, mental, and emotional characteristics.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;

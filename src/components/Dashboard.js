import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessIcon,
  LocalFlorist as HerbIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ userProfile, prakritiResults }) => {
  const navigate = useNavigate();

  if (!userProfile) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="text.secondary">
          Please complete your profile first
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/profile')}
          sx={{ mt: 2 }}
        >
          Create Profile
        </Button>
      </Box>
    );
  }

  const doshaColors = {
    vata: '#9C27B0',
    pitta: '#FF5722',
    kapha: '#4CAF50'
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'info' };
    if (bmi < 25) return { category: 'Normal', color: 'success' };
    if (bmi < 30) return { category: 'Overweight', color: 'warning' };
    return { category: 'Obese', color: 'error' };
  };

  const bmi = calculateBMI(userProfile.weight, userProfile.height);
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
        <DashboardIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Health Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome back, {userProfile.firstName}! Here's your health overview.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    mr: 2, 
                    backgroundColor: 'primary.main',
                    fontSize: '1.5rem'
                  }}
                >
                  {getInitials(userProfile.firstName, userProfile.lastName)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {userProfile.firstName} {userProfile.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    {userProfile.age} years old
                  </Typography>
                </Box>
              </Box>
              
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Email" 
                    secondary={userProfile.email} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Height" 
                    secondary={`${userProfile.height} cm`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Weight" 
                    secondary={`${userProfile.weight} kg`} 
                  />
                </ListItem>
                {bmi && (
                  <ListItem>
                    <ListItemText 
                      primary="BMI" 
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{bmi}</span>
                          <Chip 
                            label={bmiInfo.category} 
                            color={bmiInfo.color} 
                            size="small" 
                          />
                        </Box>
                      } 
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Prakriti Results */}
        <Grid item xs={12} md={8}>
          {prakritiResults ? (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Your Prakriti Constitution
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Chip 
                    label={`Primary: ${prakritiResults.primaryDosha.toUpperCase()}`}
                    sx={{ 
                      backgroundColor: doshaColors[prakritiResults.primaryDosha], 
                      color: 'white',
                      fontSize: '1rem',
                      px: 2,
                      py: 1,
                      mr: 1
                    }}
                  />
                  <Chip 
                    label={prakritiResults.constitution}
                    variant="outlined"
                    sx={{ fontSize: '1rem', px: 2, py: 1 }}
                  />
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {Object.entries(prakritiResults.percentages).map(([dosha, percentage]) => (
                    <Grid item xs={4} key={dosha}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: doshaColors[dosha] }}>
                          {dosha.toUpperCase()}
                        </Typography>
                        <Typography variant="h4" sx={{ color: doshaColors[dosha] }}>
                          {percentage}%
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="outlined"
                  onClick={() => navigate('/results')}
                  sx={{ mr: 2 }}
                >
                  View Detailed Results
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/analysis')}
                >
                  Retake Analysis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <AssessmentIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                <Typography variant="h5" gutterBottom color="text.secondary">
                  No Prakriti Analysis Yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Take our comprehensive questionnaire to discover your Ayurvedic constitution
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/analysis')}
                  sx={{ px: 4 }}
                >
                  Start Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    onClick={() => navigate('/profile')}
                    sx={{ py: 2 }}
                  >
                    Update Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                    onClick={() => navigate('/analysis')}
                    sx={{ py: 2 }}
                  >
                    Take Analysis
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<RestaurantIcon />}
                    disabled
                    sx={{ py: 2 }}
                  >
                    Diet Plan (Coming Soon)
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FitnessIcon />}
                    disabled
                    sx={{ py: 2 }}
                  >
                    Exercise Plan (Coming Soon)
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Tips */}
        {prakritiResults && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Personalized Health Tips
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <RestaurantIcon sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography variant="h6">Diet Recommendations</Typography>
                    </Box>
                    <Typography variant="body2">
                      {prakritiResults.recommendations.diet}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FitnessIcon sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography variant="h6">Lifestyle Tips</Typography>
                    </Box>
                    <Typography variant="body2">
                      {prakritiResults.recommendations.lifestyle}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <HerbIcon sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography variant="h6">Herbal Support</Typography>
                    </Box>
                    <Typography variant="body2">
                      {prakritiResults.recommendations.herbs}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;

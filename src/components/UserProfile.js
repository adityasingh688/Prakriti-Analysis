import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Person as PersonIcon, Save as SaveIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  age: Yup.number().min(1, 'Age must be positive').max(120, 'Invalid age').required('Age is required'),
  gender: Yup.string().required('Gender is required'),
  height: Yup.number().min(50, 'Invalid height').max(300, 'Invalid height').required('Height is required'),
  weight: Yup.number().min(20, 'Invalid weight').max(500, 'Invalid weight').required('Weight is required'),
});

const UserProfile = ({ userProfile, setUserProfile }) => {
  const navigate = useNavigate();

  const initialValues = userProfile || {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    occupation: '',
    lifestyle: '',
    sleepHours: '',
    exerciseFrequency: '',
    stressLevel: '',
    dietType: '',
    allergies: '',
    medications: '',
    chronicConditions: '',
    smokingStatus: false,
    alcoholConsumption: '',
    waterIntake: '',
    mentalHealthConcerns: '',
    familyHistory: ''
  };

  const handleSubmit = (values) => {
    setUserProfile(values);
    navigate('/analysis');
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4, textAlign: 'center', backgroundColor: 'primary.light', color: 'white' }}>
        <PersonIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Personal Health Profile
        </Typography>
        <Typography variant="h6">
          Please provide your personal and health information for accurate Prakriti analysis
        </Typography>
      </Paper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="firstName"
                          label="First Name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="lastName"
                          label="Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="email"
                          label="Email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="age"
                          label="Age"
                          type="number"
                          value={values.age}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.age && !!errors.age}
                          helperText={touched.age && errors.age}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            error={touched.gender && !!errors.gender}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          name="height"
                          label="Height (cm)"
                          type="number"
                          value={values.height}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.height && !!errors.height}
                          helperText={touched.height && errors.height}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          name="weight"
                          label="Weight (kg)"
                          type="number"
                          value={values.weight}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.weight && !!errors.weight}
                          helperText={touched.weight && errors.weight}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Lifestyle Information */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Lifestyle Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="occupation"
                          label="Occupation"
                          value={values.occupation}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Lifestyle</InputLabel>
                          <Select
                            name="lifestyle"
                            value={values.lifestyle}
                            onChange={handleChange}
                          >
                            <MenuItem value="sedentary">Sedentary</MenuItem>
                            <MenuItem value="moderately_active">Moderately Active</MenuItem>
                            <MenuItem value="very_active">Very Active</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="sleepHours"
                          label="Sleep Hours per Night"
                          type="number"
                          value={values.sleepHours}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Exercise Frequency</InputLabel>
                          <Select
                            name="exerciseFrequency"
                            value={values.exerciseFrequency}
                            onChange={handleChange}
                          >
                            <MenuItem value="never">Never</MenuItem>
                            <MenuItem value="rarely">Rarely (1-2 times/month)</MenuItem>
                            <MenuItem value="sometimes">Sometimes (1-2 times/week)</MenuItem>
                            <MenuItem value="regularly">Regularly (3-4 times/week)</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Stress Level</InputLabel>
                          <Select
                            name="stressLevel"
                            value={values.stressLevel}
                            onChange={handleChange}
                          >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="moderate">Moderate</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="very_high">Very High</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Diet Type</InputLabel>
                          <Select
                            name="dietType"
                            value={values.dietType}
                            onChange={handleChange}
                          >
                            <MenuItem value="vegetarian">Vegetarian</MenuItem>
                            <MenuItem value="vegan">Vegan</MenuItem>
                            <MenuItem value="non_vegetarian">Non-Vegetarian</MenuItem>
                            <MenuItem value="mixed">Mixed</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Health Information */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Health Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="allergies"
                          label="Known Allergies"
                          multiline
                          rows={2}
                          value={values.allergies}
                          onChange={handleChange}
                          placeholder="List any known allergies..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="medications"
                          label="Current Medications"
                          multiline
                          rows={2}
                          value={values.medications}
                          onChange={handleChange}
                          placeholder="List current medications..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="chronicConditions"
                          label="Chronic Health Conditions"
                          multiline
                          rows={2}
                          value={values.chronicConditions}
                          onChange={handleChange}
                          placeholder="List any chronic conditions..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="familyHistory"
                          label="Family Medical History"
                          multiline
                          rows={2}
                          value={values.familyHistory}
                          onChange={handleChange}
                          placeholder="Relevant family medical history..."
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="smokingStatus"
                              checked={values.smokingStatus}
                              onChange={handleChange}
                            />
                          }
                          label="Current Smoker"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Alcohol Consumption</InputLabel>
                          <Select
                            name="alcoholConsumption"
                            value={values.alcoholConsumption}
                            onChange={handleChange}
                          >
                            <MenuItem value="never">Never</MenuItem>
                            <MenuItem value="rarely">Rarely</MenuItem>
                            <MenuItem value="occasionally">Occasionally</MenuItem>
                            <MenuItem value="regularly">Regularly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      boxShadow: 3
                    }}
                  >
                    Save Profile & Continue to Analysis
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserProfile;

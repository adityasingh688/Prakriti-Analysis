import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Assessment as AssessmentIcon, NavigateNext, NavigateBefore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PrakritiAnalysis = ({ userProfile, setPrakritiResults }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      category: "Physical Characteristics",
      question: "What best describes your body frame?",
      options: [
        { text: "Thin, light, small-boned", dosha: "vata", points: 3 },
        { text: "Medium build, moderate weight", dosha: "pitta", points: 3 },
        { text: "Large frame, heavy, well-built", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Physical Characteristics",
      question: "How would you describe your skin?",
      options: [
        { text: "Dry, rough, thin, cool", dosha: "vata", points: 3 },
        { text: "Warm, oily, soft, with freckles/moles", dosha: "pitta", points: 3 },
        { text: "Thick, moist, cool, smooth", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Physical Characteristics",
      question: "What is your hair like?",
      options: [
        { text: "Dry, brittle, thin", dosha: "vata", points: 3 },
        { text: "Fine, soft, early graying/balding", dosha: "pitta", points: 3 },
        { text: "Thick, oily, wavy, lustrous", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Physical Characteristics",
      question: "How are your eyes?",
      options: [
        { text: "Small, dry, active", dosha: "vata", points: 3 },
        { text: "Sharp, bright, penetrating", dosha: "pitta", points: 3 },
        { text: "Large, soft, loving", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Appetite & Digestion",
      question: "How is your appetite?",
      options: [
        { text: "Variable, sometimes forget to eat", dosha: "vata", points: 3 },
        { text: "Strong, get irritable when hungry", dosha: "pitta", points: 3 },
        { text: "Steady, can skip meals easily", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Appetite & Digestion",
      question: "How is your digestion?",
      options: [
        { text: "Irregular, gas, bloating", dosha: "vata", points: 3 },
        { text: "Strong, quick, sometimes heartburn", dosha: "pitta", points: 3 },
        { text: "Slow, heavy feeling after eating", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Sleep & Energy",
      question: "How do you sleep?",
      options: [
        { text: "Light sleeper, restless, wake up tired", dosha: "vata", points: 3 },
        { text: "Moderate sleep, wake up refreshed", dosha: "pitta", points: 3 },
        { text: "Deep sleeper, hard to wake up", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Sleep & Energy",
      question: "What is your energy level like?",
      options: [
        { text: "Comes in bursts, then fatigue", dosha: "vata", points: 3 },
        { text: "Moderate, steady energy", dosha: "pitta", points: 3 },
        { text: "Steady, good endurance", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Mental Characteristics",
      question: "How do you handle stress?",
      options: [
        { text: "Become anxious, worried", dosha: "vata", points: 3 },
        { text: "Become irritable, angry", dosha: "pitta", points: 3 },
        { text: "Remain calm, withdraw", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Mental Characteristics",
      question: "How do you learn?",
      options: [
        { text: "Quick to learn, quick to forget", dosha: "vata", points: 3 },
        { text: "Moderate pace, good retention", dosha: "pitta", points: 3 },
        { text: "Slow to learn, excellent retention", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Mental Characteristics",
      question: "What describes your personality?",
      options: [
        { text: "Enthusiastic, creative, changeable", dosha: "vata", points: 3 },
        { text: "Determined, focused, competitive", dosha: "pitta", points: 3 },
        { text: "Calm, steady, loyal", dosha: "kapha", points: 3 }
      ]
    },
    {
      category: "Weather Preferences",
      question: "What weather do you prefer?",
      options: [
        { text: "Warm, humid weather", dosha: "vata", points: 3 },
        { text: "Cool, well-ventilated spaces", dosha: "pitta", points: 3 },
        { text: "Warm, dry weather", dosha: "kapha", points: 3 }
      ]
    }
  ];

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options[optionIndex];
      scores[selectedOption.dosha] += selectedOption.points;
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };

    // Determine primary dosha
    const primaryDosha = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    const results = {
      scores,
      percentages,
      primaryDosha,
      constitution: getConstitutionType(percentages),
      recommendations: getRecommendations(primaryDosha),
      completedAt: new Date().toISOString()
    };

    setPrakritiResults(results);
    navigate('/results');
  };

  const getConstitutionType = (percentages) => {
    const sorted = Object.entries(percentages).sort(([,a], [,b]) => b - a);
    const [first, second] = sorted;
    
    if (first[1] - second[1] > 20) {
      return `Pure ${first[0].charAt(0).toUpperCase() + first[0].slice(1)}`;
    } else {
      return `${first[0].charAt(0).toUpperCase() + first[0].slice(1)}-${second[0].charAt(0).toUpperCase() + second[0].slice(1)}`;
    }
  };

  const getRecommendations = (primaryDosha) => {
    const recommendations = {
      vata: {
        diet: "Warm, cooked foods; sweet, sour, salty tastes; regular meal times",
        lifestyle: "Regular routine, adequate rest, gentle exercise like yoga",
        herbs: "Ashwagandha, Brahmi, Jatamansi for calming and grounding"
      },
      pitta: {
        diet: "Cool, fresh foods; sweet, bitter, astringent tastes; avoid spicy foods",
        lifestyle: "Moderate exercise, avoid overheating, practice meditation",
        herbs: "Amalaki, Neem, Shatavari for cooling and balancing"
      },
      kapha: {
        diet: "Light, warm foods; pungent, bitter, astringent tastes; avoid heavy foods",
        lifestyle: "Regular vigorous exercise, stay active, avoid oversleeping",
        herbs: "Trikatu, Guggulu, Punarnava for stimulation and detox"
      }
    };
    
    return recommendations[primaryDosha];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

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
          Go to Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4, textAlign: 'center', backgroundColor: 'secondary.light', color: 'white' }}>
        <AssessmentIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Prakriti Analysis
        </Typography>
        <Typography variant="h6">
          Answer the following questions to discover your Ayurvedic constitution
        </Typography>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          
          <Typography variant="h6" color="primary.main" gutterBottom>
            {currentQ.category}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {currentQ.question}
          </Typography>

          <RadioGroup
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion, parseInt(e.target.value))}
          >
            {currentQ.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option.text}
                sx={{ 
                  mb: 1,
                  p: 2,
                  border: '1px solid',
                  borderColor: answers[currentQuestion] === index ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  backgroundColor: answers[currentQuestion] === index ? 'primary.light' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'grey.50'
                  }
                }}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button
            variant="contained"
            size="large"
            onClick={calculateResults}
            disabled={answers[currentQuestion] === undefined}
            sx={{ px: 4 }}
          >
            Get My Results
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<NavigateNext />}
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={answers[currentQuestion] === undefined}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PrakritiAnalysis;

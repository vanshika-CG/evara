export const USER_PROFILE = {
  name: 'Priyasha',
  fullName: 'Priyasha Sharma',
  age: 32,
  height: 165,
  weight: 64,
  bmi: 23.5,
  bmiStatus: 'Normal',
  isPremium: true,
  cycleLength: 28,
  cyclePattern: 'Consistently regular',
  currentPhase: 'Follicular',
  nextPeriodDays: 14,
};

export const DASHBOARD_DATA = {
  greeting: 'Good Morning',
  bmi: {
    value: 23.5,
    status: 'Normal',
    change: -0.3,
  },
  cycle: {
    day: 14,
    phase: 'Follicular Phase',
    nextPeriod: '14 Days',
    fertility: 'Low chance of symptoms',
  },
  water: {
    current: 5,
    goal: 8,
  },
  dailyCalories: {
    consumed: 1250,
    target: 1450,
  },
  meals: {
    breakfast: { name: 'Vegetable Poha', calories: 320, time: '08:30 AM' },
    lunch: { name: 'Roti, Dal Tadka & Sabji', calories: 580, time: '01:00 PM' },
    dinner: { name: 'Light Moong Dal Khichdi', calories: 350, time: '07:30 PM' },
  },
};

export const DIET_DATA = {
  date: 'Today, Oct 12',
  totalCalories: 1450,
  macros: {
    protein: { value: 56, unit: 'g' },
    carbs: { value: 140, unit: 'g' },
    fats: { value: 42, unit: 'g' },
  },
  meals: [
    {
      type: 'Breakfast',
      icon: '🌅',
      name: 'Vegetable Poha',
      calories: 320,
      protein: 8,
      carbs: 45,
      fat: 10,
    },
    {
      type: 'Lunch',
      icon: '☀️',
      name: 'Roti, Dal Tadka & Sabji',
      calories: 580,
      protein: 22,
      carbs: 65,
      fat: 16,
    },
    {
      type: 'Dinner',
      icon: '🌙',
      name: 'Light Moong Dal Khichdi',
      calories: 350,
      protein: 14,
      carbs: 50,
      fat: 8,
    },
  ],
};

export const FITNESS_DATA = {
  whyRoutine: "You're in your ovulation phase! Your energy levels are peaking, making it the perfect time for moderate strength training and active cardio to complement your normal BMI.",
  tags: ['BMI: Normal', 'Phase: Ovulation'],
  workouts: [
    {
      id: '1',
      name: 'Brisk Walking',
      description: 'Low-impact morning cardio',
      duration: '30 min',
      calories: '150 kcal',
      icon: '🏃‍♀️',
      color: '#E0F2FE',
    },
    {
      id: '2',
      name: 'Strength Training',
      description: 'Light dumbbells for muscl...',
      duration: '20 min',
      calories: '120 kcal',
      icon: '💪',
      color: '#FEE2E2',
    },
    {
      id: '3',
      name: 'Evening Restorative ...',
      description: 'Focus on pelvic flexibility',
      duration: '15 min',
      calories: '50 kcal',
      icon: '🧘‍♀️',
      color: '#F3E8FF',
    },
  ],
};

export const CYCLE_DATA = {
  currentMonth: 'October 2023',
  nextPeriodDays: 14,
  currentPhase: 'Follicular Phase',
  phaseDescription: 'Low chance of symptoms',
  periodDays: [1, 2, 3, 4],
  todayDate: 14,
  predictedDays: [28, 29, 30, 31],
  symptoms: [
    { id: 'pain', label: 'Pain', icon: '📊', active: true },
    { id: 'mood', label: 'Mood', icon: '😊', active: true },
    { id: 'fatigue', label: 'Fatigue', icon: '😴', active: true },
    { id: 'flow', label: 'Flow', icon: '💧', active: false },
  ],
  suggestions: [
    {
      title: 'Iron-rich Foods',
      description: 'Include spinach and lentils today to maintain your energy levels.',
      icon: '🥬',
    },
    {
      title: 'Light Yoga',
      description: '15 mins of gentle stretching to relieve lower abdomen pressure.',
      icon: '🧘',
    },
  ],
};

export const CHECKIN_MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😤', label: 'Angry' },
];

export const CHECKIN_SYMPTOMS = [
  { id: 'headache', label: 'Headache' },
  { id: 'cramps', label: 'Cramps' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'backpain', label: 'Back Pain' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'acne', label: 'Acne' },
  { id: 'insomnia', label: 'Insomnia' },
];

export const DEFICIENCY_SYMPTOMS = [
  { id: 'fatigue', label: 'Constant Fatigue' },
  { id: 'pale', label: 'Pale Skin or Gums' },
  { id: 'cramps', label: 'Frequent Muscle Cramps' },
  { id: 'hair', label: 'Hair Thinning or Loss' },
  { id: 'joint', label: 'Joint or Bone Pain' },
];

export const DEFICIENCY_RESULT = {
  title: 'Possible Iron Deficiency',
  description: 'Based on fatigue and pale skin, your iron levels might be low. This is common during menstruation.',
  foods: [
    { name: 'Spinach', icon: '🥬' },
    { name: 'Beetroot', icon: '🥗' },
    { name: 'Lentils', icon: '🫘' },
  ],
  doctorNote: 'We suggest consulting a physician for a basic CBC blood test if these symptoms persist for over two weeks.',
};

export const HEALTH_TIMELINE = {
  overallProgress: 72,
  insights: [
    {
      title: 'BMI Impact',
      level: 'High Impact',
      description: 'Your current BMI indicates a need for slightly higher protein intake and moderate cardio to support lean muscle mass.',
      progress: 75,
      color: '#8B5CF6',
      borderColor: '#C4B5FD',
    },
    {
      title: 'Cycle Phase Impact',
      level: 'Med Impact',
      description: "You are currently in your luteal phase. We've included magnesium-rich foods to help reduce cravings and light yoga to ease tension.",
      progress: 55,
      color: '#EC4899',
      borderColor: '#F9A8D4',
    },
    {
      title: 'Symptoms',
      level: 'High Impact',
      description: "Based on your reported fatigue and mild cramping, we've swapped high-intensity workouts for restorative exercises to help you recover.",
      progress: 65,
      color: '#8B5CF6',
      borderColor: '#C4B5FD',
    },
  ],
};

export const HORMONE_RISK = {
  riskPercent: 72,
  level: 'Medium',
  levelColor: '#F59E0B',
  explanation: 'Elevated due to stress. Your hormonal balance shows moderate imbalance attributed to recent stress patterns and sleep irregularities.',
  factors: [
    { label: 'Stress Levels', value: 'High', icon: '🧠' },
    { label: 'Sleep Quality', value: 'Poor', icon: '😴' },
    { label: 'Diet Balance', value: 'Moderate', icon: '🥗' },
    { label: 'Exercise', value: 'Low', icon: '🏃‍♀️' },
  ],
};

export const INGREDIENT_SCANNER = {
  safetyScore: 72,
  rating: 'Moderate',
  ingredients: [
    { name: 'Retinol', status: 'caution', note: 'May irritate sensitive skin' },
    { name: 'Niacinamide', status: 'safe', note: 'Brightening & pore minimizing' },
    { name: 'Fragrance', status: 'warning', note: 'Potential allergen' },
    { name: 'Hyaluronic Acid', status: 'safe', note: 'Deep hydration' },
  ],
};

export const WEIGHT_TREND = [
  { day: 'Mon', value: 63.0 },
  { day: 'Tue', value: 62.5 },
  { day: 'Wed', value: 63.2 },
  { day: 'Thu', value: 63.5 },
  { day: 'Fri', value: 63.8 },
  { day: 'Sat', value: 64.0 },
  { day: 'Sun', value: 64.2 },
];

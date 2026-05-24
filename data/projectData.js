import AsyncStorage from '@react-native-async-storage/async-storage';

const SAMPLE_PROJECT = {
  id: '1',
  name: 'Niagara Bridge Retrofit 2024',
  client: 'Ontario Ministry of Transportation',
  location: 'Niagara Falls, ON',
  budget: 2500000,
  timeline: '18 months',
  status: 'Planning Phase',
  requirements: [
    {
      id: 1,
      text: 'Bridge deck reinforcement per CSA S6-19 Section 5.2',
      status: 'verified',
      category: 'Structural'
    },
    {
      id: 2,
      text: 'Concrete strength f\'c = 35 MPa minimum per CSA A23.3-14',
      status: 'verified',
      category: 'Materials'
    },
    {
      id: 3,
      text: 'Environmental impact assessment required per OBC 2020',
      status: 'flagged',
      category: 'Environmental'
    },
    {
      id: 4,
      text: 'Safety barriers to AASHTO M31-04 specification',
      status: 'verified',
      category: 'Safety'
    },
    {
      id: 5,
      text: 'Seismic design per NBC 2020 Section 4.1.8',
      status: 'partial',
      category: 'Structural'
    },
    {
      id: 6,
      text: 'Load testing per ASTM C39 methodology',
      status: 'verified',
      category: 'Testing'
    },
    {
      id: 7,
      text: 'Structural steel per CSA S16-14 grade 350W',
      status: 'verified',
      category: 'Materials'
    },
    {
      id: 8,
      text: 'Geotechnical investigation per AASHTO M21',
      status: 'flagged',
      category: 'Geotechnical'
    },
  ],
  standards: ['CSA S6-19', 'CSA A23.3-14', 'CSA A23.1-14', 'CSA S16-14', 'NBC 2020', 'OBC 2020', 'AASHTO LRFD', 'ASTM C39'],
  risks: [
    {
      title: 'Weather delays',
      level: 'Medium',
      description: 'Winter construction challenges in Ontario climate',
      mitigation: 'Schedule critical work in Q2-Q3, use heated enclosures for concrete curing',
      impact: 'Could extend timeline by 2-3 months'
    },
    {
      title: 'Material sourcing',
      level: 'High',
      description: 'Specialty reinforcing steel shortage in market',
      mitigation: 'Pre-order 6 months in advance, establish backup suppliers',
      impact: 'Could delay project start or increase costs by 15%'
    },
    {
      title: 'Traffic impact',
      level: 'High',
      description: 'Highway closure coordination required with MTO',
      mitigation: 'Engage MTO early, plan off-peak work windows, use traffic management plan',
      impact: 'Public coordination could delay approvals by 4 weeks'
    },
    {
      title: 'Environmental approvals',
      level: 'Medium',
      description: 'Environmental assessment review timeline',
      mitigation: 'Submit early, engage agencies in planning phase',
      impact: '3-4 month review period typical'
    },
    {
      title: 'Geotechnical findings',
      level: 'Medium',
      description: 'Unknown soil conditions could require design changes',
      mitigation: 'Conduct comprehensive geotechnical survey, phase design if needed',
      impact: 'Could require foundation redesign'
    },
  ],
  citations: [
    {
      req: 'Bridge design and load factors',
      source: 'CSA S6-19 Section 5.2',
      detail: 'Load factors and load combinations for bridge design'
    },
    {
      req: 'Concrete strength specification',
      source: 'CSA A23.3-14 Section 8.2.1',
      detail: 'Design of concrete structures - strength design methodology'
    },
    {
      req: 'Concrete testing procedure',
      source: 'CSA A23.1-14 Section 7.2',
      detail: 'Testing of concrete cylinders for compressive strength'
    },
    {
      req: 'Structural steel design',
      source: 'CSA S16-14 Section 8.4',
      detail: 'Limit states design of steel structures'
    },
    {
      req: 'Building code compliance',
      source: 'NBC 2020 Section 4.1.8',
      detail: 'National Building Code structural requirements'
    },
    {
      req: 'Ontario building compliance',
      source: 'OBC 2020 Section 3.2.2',
      detail: 'Ontario Building Code structural fire protection'
    },
    {
      req: 'Bridge design alternative',
      source: 'AASHTO LRFD Section 5.4.2.4',
      detail: 'International validation - load resistance factor design'
    },
    {
      req: 'Concrete cylinder testing',
      source: 'ASTM C39',
      detail: 'Standard test method for compressive strength of concrete cylinders'
    },
  ],
};

export const initializeData = async () => {
  try {
    // Check if data already exists
    const existingProject = await AsyncStorage.getItem('currentProject');

    if (!existingProject) {
      // Initialize with sample project
      await AsyncStorage.setItem('currentProject', JSON.stringify(SAMPLE_PROJECT));
      console.log('Sample project initialized');
    }
  } catch (error) {
    console.log('Error initializing data:', error);
  }
};

export const saveProject = async (project) => {
  try {
    await AsyncStorage.setItem('currentProject', JSON.stringify(project));
    return true;
  } catch (error) {
    console.log('Error saving project:', error);
    return false;
  }
};

export const loadProject = async () => {
  try {
    const data = await AsyncStorage.getItem('currentProject');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error loading project:', error);
    return null;
  }
};

export const clearProject = async () => {
  try {
    await AsyncStorage.removeItem('currentProject');
    return true;
  } catch (error) {
    console.log('Error clearing project:', error);
    return false;
  }
};

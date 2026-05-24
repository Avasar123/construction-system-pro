import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OverviewScreen() {
  const [projectData, setProjectData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const data = await AsyncStorage.getItem('currentProject');
      if (data) {
        setProjectData(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading project:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadProject();
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const loadSampleProject = async () => {
    const sampleProject = {
      id: '1',
      name: 'Niagara Bridge Retrofit 2024',
      client: 'Ontario Ministry of Transportation',
      location: 'Niagara Falls, ON',
      budget: 2500000,
      timeline: '18 months',
      status: 'Planning Phase',
      requirements: [
        { id: 1, text: 'Bridge deck reinforcement per CSA S6-19', status: 'verified', category: 'Structural' },
        { id: 2, text: 'Concrete strength f\'c = 35 MPa minimum', status: 'verified', category: 'Materials' },
        { id: 3, text: 'Environmental impact assessment required', status: 'flagged', category: 'Environmental' },
        { id: 4, text: 'Safety barriers to AASHTO M31-04 spec', status: 'verified', category: 'Safety' },
        { id: 5, text: 'Seismic design per NBC 2020', status: 'partial', category: 'Structural' },
      ],
      standards: ['CSA S6-19', 'CSA A23.3-14', 'NBC 2020', 'AASHTO LRFD', 'OBC 2020'],
      risks: [
        { title: 'Weather delays', level: 'Medium', description: 'Winter construction challenges' },
        { title: 'Material sourcing', level: 'High', description: 'Specialty reinforcing steel shortage' },
        { title: 'Traffic impact', level: 'High', description: 'Highway closure coordination required' },
      ],
      citations: [
        { req: 'Bridge design', source: 'CSA S6-19 Section 5.2', detail: 'Load factors and combinations' },
        { req: 'Concrete', source: 'CSA A23.3-14 Section 8', detail: 'Strength design methodology' },
      ],
    };

    await AsyncStorage.setItem('currentProject', JSON.stringify(sampleProject));
    setProjectData(sampleProject);
    Alert.alert('Success', 'Sample project loaded');
  };

  if (!projectData) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <MaterialIcons name="dashboard" size={32} color="#fff" />
          <Text style={styles.headerTitle}>RFP Analysis Pro</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyBox}>
            <MaterialIcons name="folder-open" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No Project Loaded</Text>
            <Text style={styles.emptySubtext}>Load a sample project to get started</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={loadSampleProject}>
            <MaterialIcons name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Load Sample Project</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={24} color="#4a90e2" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>How to Use</Text>
              <Text style={styles.infoText}>
                1. Load sample project to see all features{'\n'}
                2. Review requirements, standards, and risks{'\n'}
                3. Use triangular research for verification{'\n'}
                4. Generate compliance documents{'\n'}
                5. Export with full citations
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  const verifiedCount = projectData.requirements.filter(r => r.status === 'verified').length;
  const flaggedCount = projectData.requirements.filter(r => r.status === 'flagged').length;
  const highRisks = projectData.risks.filter(r => r.level === 'High').length;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <MaterialIcons name="dashboard" size={32} color="#fff" />
        <Text style={styles.headerTitle}>RFP Analysis Pro</Text>
      </View>

      <View style={styles.content}>
        {/* Project Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{projectData.name}</Text>
          <Text style={styles.cardSubtitle}>{projectData.client}</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.infoText}>{projectData.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={16} color="#666" />
            <Text style={styles.infoText}>{projectData.timeline}</Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{projectData.status}</Text>
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{projectData.requirements.length}</Text>
            <Text style={styles.metricLabel}>Requirements</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{verifiedCount}</Text>
            <Text style={styles.metricLabel}>Verified</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{flaggedCount}</Text>
            <Text style={styles.metricLabel}>Flagged</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{projectData.standards.length}</Text>
            <Text style={styles.metricLabel}>Standards</Text>
          </View>
        </View>

        {/* Budget */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="attach-money" size={24} color="#27ae60" />
            <Text style={styles.cardTitle}>Budget</Text>
          </View>
          <Text style={styles.largeValue}>
            ${(projectData.budget / 1000000).toFixed(1)}M
          </Text>
        </View>

        {/* Risk Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="warning" size={24} color="#e74c3c" />
            <Text style={styles.cardTitle}>Risks</Text>
          </View>
          <Text style={styles.riskText}>
            {highRisks} High Priority Items
          </Text>
          {projectData.risks.slice(0, 2).map((risk, idx) => (
            <View key={idx} style={styles.riskItem}>
              <View
                style={[
                  styles.riskBadge,
                  risk.level === 'High' && { backgroundColor: '#e74c3c' },
                  risk.level === 'Medium' && { backgroundColor: '#f39c12' },
                  risk.level === 'Low' && { backgroundColor: '#27ae60' },
                ]}
              >
                <Text style={styles.riskBadgeText}>{risk.level}</Text>
              </View>
              <View style={styles.riskContent}>
                <Text style={styles.riskTitle}>{risk.title}</Text>
                <Text style={styles.riskDesc}>{risk.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Standards */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="library-books" size={24} color="#4a90e2" />
            <Text style={styles.cardTitle}>Standards</Text>
          </View>
          <View style={styles.standardsList}>
            {projectData.standards.map((std, idx) => (
              <View key={idx} style={styles.standardBadge}>
                <Text style={styles.standardText}>{std}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={loadSampleProject}>
          <MaterialIcons name="refresh" size={20} color="#fff" />
          <Text style={styles.buttonText}>Reload Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e3a5f',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#1565c0',
    fontWeight: '500',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metric: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a5f',
  },
  metricLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  largeValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#27ae60',
    marginVertical: 8,
  },
  riskText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 50,
    alignItems: 'center',
  },
  riskBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  riskContent: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  riskDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  standardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  standardBadge: {
    backgroundColor: '#f0f4ff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  standardText: {
    fontSize: 12,
    color: '#1e3a5f',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 8,
  },
});

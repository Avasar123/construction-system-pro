import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const REFERENCE_PROJECTS = [
  {
    id: 1,
    name: 'Niagara Bridge Retrofit 2021',
    type: 'Bridge Rehabilitation',
    location: 'Niagara Falls, ON',
    budget: 2200000,
    timeline: '16 months',
    status: 'Completed',
    year: 2021,
    standards: ['CSA S6-19', 'CSA A23.3-14'],
    lessons: 'Material sourcing delays in winter. Plan procurement 6 months ahead.',
  },
  {
    id: 2,
    name: 'Water Treatment Facility 2020',
    type: 'Infrastructure',
    location: 'Toronto, ON',
    budget: 3500000,
    timeline: '22 months',
    status: 'Completed',
    year: 2020,
    standards: ['NBC 2020', 'OBC 2020', 'CSA S16-14'],
    lessons: 'Environmental approvals took 3 months longer than expected. Engage agencies early.',
  },
  {
    id: 3,
    name: 'Toronto Road Reconstruction 2022',
    type: 'Highway Project',
    location: 'Toronto, ON',
    budget: 1800000,
    timeline: '12 months',
    status: 'Completed',
    year: 2022,
    standards: ['MTO-EDM', 'AASHTO LRFD', 'OBC 2020'],
    lessons: 'Traffic impact was greater than modeled. Recommend off-peak work windows.',
  },
  {
    id: 4,
    name: 'Hamilton Industrial Complex 2023',
    type: 'Commercial',
    location: 'Hamilton, ON',
    budget: 5000000,
    timeline: '20 months',
    status: 'Active',
    year: 2023,
    standards: ['CSA A23.3-14', 'CSA S16-14', 'NBC 2020'],
    lessons: 'Subcontractor coordination critical. Monthly safety meetings mandatory.',
  },
  {
    id: 5,
    name: 'Ottawa Bridge Design 2022',
    type: 'Bridge Design',
    location: 'Ottawa, ON',
    budget: 2800000,
    timeline: '18 months',
    status: 'Completed',
    year: 2022,
    standards: ['CSA S6-19', 'AASHTO LRFD', 'OBC 2020'],
    lessons: 'Seismic design review caused 2-month delay. Include this in risk assessment.',
  },
];

export default function ProjectsScreen() {
  const [selectedProject, setSelectedProject] = useState(null);

  const renderProject = ({ item }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => setSelectedProject(item)}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectType}>{item.type}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Completed'
              ? { backgroundColor: '#e8f5e9' }
              : { backgroundColor: '#e3f2fd' },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'Completed'
                ? { color: '#2e7d32' }
                : { color: '#1565c0' },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.projectMeta}>
        <View style={styles.metaItem}>
          <MaterialIcons name="location-on" size={14} color="#999" />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialIcons name="calendar-today" size={14} color="#999" />
          <Text style={styles.metaText}>{item.year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="folder" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Reference Projects</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <MaterialIcons name="info" size={20} color="#4a90e2" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Learn from Past Projects</Text>
            <Text style={styles.infoText}>
              Reference {REFERENCE_PROJECTS.length} completed/active projects for lessons learned and best practices
            </Text>
          </View>
        </View>

        <FlatList
          data={REFERENCE_PROJECTS}
          renderItem={renderProject}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Project Detail Modal */}
      {selectedProject && (
        <View style={styles.detailOverlay}>
          <TouchableOpacity
            style={styles.detailBackground}
            onPress={() => setSelectedProject(null)}
          />
          <View style={styles.detailPanel}>
            <View style={styles.detailHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>{selectedProject.name}</Text>
                <Text style={styles.detailType}>{selectedProject.type}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedProject(null)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailContent}>
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Project Details</Text>

                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={16} color="#666" />
                  <View style={styles.detailColumn}>
                    <Text style={styles.rowLabel}>Location</Text>
                    <Text style={styles.rowValue}>{selectedProject.location}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="attach-money" size={16} color="#27ae60" />
                  <View style={styles.detailColumn}>
                    <Text style={styles.rowLabel}>Budget</Text>
                    <Text style={styles.rowValue}>
                      ${(selectedProject.budget / 1000000).toFixed(1)}M
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="schedule" size={16} color="#666" />
                  <View style={styles.detailColumn}>
                    <Text style={styles.rowLabel}>Timeline</Text>
                    <Text style={styles.rowValue}>{selectedProject.timeline}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="calendar-today" size={16} color="#666" />
                  <View style={styles.detailColumn}>
                    <Text style={styles.rowLabel}>Completed</Text>
                    <Text style={styles.rowValue}>{selectedProject.year}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Standards Applied</Text>
                <View style={styles.standardsList}>
                  {selectedProject.standards.map((std, idx) => (
                    <View key={idx} style={styles.standardTag}>
                      <Text style={styles.standardTagText}>{std}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.lessonsBox}>
                <View style={styles.lessonsHeader}>
                  <MaterialIcons name="lightbulb" size={20} color="#f39c12" />
                  <Text style={styles.lessonsTitle}>Lessons Learned</Text>
                </View>
                <Text style={styles.lessonsText}>{selectedProject.lessons}</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedProject(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
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
    paddingBottom: 20,
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
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoCard: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 10,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#1565c0',
    lineHeight: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  projectType: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#999',
  },
  bottomPadding: {
    height: 40,
  },
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  detailBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  detailPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  detailType: {
    fontSize: 12,
    color: '#999',
  },
  detailContent: {
    padding: 16,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  detailColumn: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  standardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  standardTag: {
    backgroundColor: '#f0f4ff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#4a90e2',
  },
  standardTagText: {
    fontSize: 11,
    color: '#1e3a5f',
    fontWeight: '500',
  },
  lessonsBox: {
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
    marginBottom: 20,
  },
  lessonsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  lessonsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e65100',
  },
  lessonsText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  closeButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

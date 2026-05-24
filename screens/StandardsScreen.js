import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STANDARDS_DATA = {
  canadian: [
    { code: 'CSA S6-19', name: 'Canadian Bridge Design Code', section: '5.2', authority: 'Canadian Standards Association' },
    { code: 'CSA S16-14', name: 'Limit States Design of Steel Structures', section: '8.4', authority: 'Canadian Standards Association' },
    { code: 'CSA A23.3-14', name: 'Design of Concrete Structures', section: '8.2.1', authority: 'Canadian Standards Association' },
    { code: 'CSA A23.1-14', name: 'Concrete Materials and Methods of Concrete Construction', section: '7.2', authority: 'Canadian Standards Association' },
    { code: 'NBC 2020', name: 'National Building Code of Canada', section: '4.1.8', authority: 'National Research Council' },
    { code: 'OBC 2020', name: 'Ontario Building Code', section: '3.2.2', authority: 'Ontario Government' },
  ],
  aashto: [
    { code: 'AASHTO LRFD', name: 'LRFD Bridge Design Specifications', section: '5.4.2.4', authority: 'American Association of State Highway Officials' },
    { code: 'AASHTO M323', name: 'Standard Specification for Highway Bridges', section: '12.3', authority: 'American Association of State Highway Officials' },
    { code: 'ASTM C39', name: 'Standard Test Method for Compressive Strength of Concrete Cylinders', section: '6.0', authority: 'American Society for Testing and Materials' },
    { code: 'ASTM A36', name: 'Standard Specification for Carbon Structural Steel', section: '4.0', authority: 'American Society for Testing and Materials' },
  ],
  provincial: [
    { code: 'OPS-MO 800', name: 'Materials and Objects Policy', section: '2.1', authority: 'Ontario Public Service' },
    { code: 'MTO-EDM', name: 'MTO Engineering Design Manual', section: '3.0', authority: 'Ministry of Transportation Ontario' },
    { code: 'MTO Guide', name: 'Pavement Design and Management Guide', section: '4.2', authority: 'Ministry of Transportation Ontario' },
  ],
};

export default function StandardsScreen() {
  const [projectStandards, setProjectStandards] = useState([]);
  const [selectedTab, setSelectedTab] = useState('canadian');
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProjectStandards();
  }, []);

  const loadProjectStandards = async () => {
    try {
      const data = await AsyncStorage.getItem('currentProject');
      if (data) {
        const project = JSON.parse(data);
        setProjectStandards(project.standards || []);
      }
    } catch (error) {
      console.log('Error loading standards:', error);
    }
  };

  const getTabData = () => {
    return STANDARDS_DATA[selectedTab] || [];
  };

  const filteredStandards = getTabData().filter((std) =>
    std.code.toLowerCase().includes(search.toLowerCase()) ||
    std.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderStandard = ({ item }) => {
    const isSelected = projectStandards.includes(item.code);
    return (
      <TouchableOpacity
        style={[
          styles.standardCard,
          isSelected && styles.standardCardSelected,
        ]}
        onPress={() => setSelectedStandard(item)}
      >
        <View style={styles.standardHeader}>
          <View
            style={[
              styles.codeBadge,
              isSelected && styles.codeBadgeSelected,
            ]}
          >
            <Text
              style={[
                styles.codeText,
                isSelected && styles.codeTextSelected,
              ]}
            >
              {item.code}
            </Text>
          </View>
          {isSelected && (
            <MaterialIcons name="check-circle" size={20} color="#27ae60" />
          )}
        </View>
        <Text style={styles.standardName}>{item.name}</Text>
        <Text style={styles.standardAuthority}>{item.authority}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="library-books" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Standards & Codes</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'canadian' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('canadian')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'canadian' && styles.tabTextActive,
              ]}
            >
              Canadian
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'aashto' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('aashto')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'aashto' && styles.tabTextActive,
              ]}
            >
              International
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'provincial' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('provincial')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'provincial' && styles.tabTextActive,
              ]}
            >
              Provincial
            </Text>
          </TouchableOpacity>
        </View>

        {/* Triangular Research Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <MaterialIcons name="info" size={20} color="#4a90e2" />
            <Text style={styles.infoTitle}>Triangular Research</Text>
          </View>
          <Text style={styles.infoText}>
            Requirements verified across 3 sources:{'\n'}
            1️⃣ Canadian Authority (CSA, NBC, OBC){'\n'}
            2️⃣ International Validation (AASHTO, ASTM){'\n'}
            3️⃣ Provincial Compliance (MTO, OBC)
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search standards..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#bbb"
          />
        </View>

        {/* Standards List */}
        <FlatList
          data={filteredStandards}
          renderItem={renderStandard}
          keyExtractor={(item) => item.code}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Standard Detail Modal */}
      <Modal
        visible={!!selectedStandard}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedStandard(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedStandard(null)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Standard Details</Text>
              <View style={{ width: 24 }} />
            </View>

            {selectedStandard && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.detailCard}>
                  <View style={styles.detailBadge}>
                    <Text style={styles.detailCode}>{selectedStandard.code}</Text>
                  </View>

                  <Text style={styles.detailName}>{selectedStandard.name}</Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Authority:</Text>
                    <Text style={styles.detailValue}>
                      {selectedStandard.authority}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Key Section:</Text>
                    <Text style={styles.detailValue}>
                      Section {selectedStandard.section}
                    </Text>
                  </View>

                  <View style={styles.applicabilityBox}>
                    <Text style={styles.applicabilityTitle}>
                      Applicability in Ontario
                    </Text>
                    {selectedStandard.code.includes('CSA') && (
                      <Text style={styles.applicabilityText}>
                        ✓ Primary authority for Canadian projects
                      </Text>
                    )}
                    {selectedStandard.code.includes('NBC') && (
                      <Text style={styles.applicabilityText}>
                        ✓ National standard adopted by Ontario
                      </Text>
                    )}
                    {selectedStandard.code.includes('OBC') && (
                      <Text style={styles.applicabilityText}>
                        ✓ Mandatory for all Ontario projects
                      </Text>
                    )}
                    {selectedStandard.code.includes('AASHTO') && (
                      <Text style={styles.applicabilityText}>
                        ✓ Secondary reference for validation
                      </Text>
                    )}
                    {selectedStandard.code.includes('ASTM') && (
                      <Text style={styles.applicabilityText}>
                        ✓ Testing and material standards
                      </Text>
                    )}
                    {selectedStandard.code.includes('MTO') && (
                      <Text style={styles.applicabilityText}>
                        ✓ Required for transportation projects
                      </Text>
                    )}
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  tabActive: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#fff',
  },
  infoCard: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  infoText: {
    fontSize: 12,
    color: '#1565c0',
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  standardCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  standardCardSelected: {
    borderColor: '#27ae60',
    backgroundColor: '#f1f8f4',
  },
  standardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeBadge: {
    backgroundColor: '#f0f4ff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  codeBadgeSelected: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#27ae60',
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e3a5f',
  },
  codeTextSelected: {
    color: '#2e7d32',
  },
  standardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  standardAuthority: {
    fontSize: 11,
    color: '#999',
  },
  bottomPadding: {
    height: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalBody: {
    padding: 16,
  },
  detailCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  detailBadge: {
    backgroundColor: '#4a90e2',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  detailCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  detailName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
  applicabilityBox: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#27ae60',
  },
  applicabilityTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  applicabilityText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
});

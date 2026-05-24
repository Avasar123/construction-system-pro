import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CitationsScreen() {
  const [citations, setCitations] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('apa');

  useEffect(() => {
    loadCitations();
  }, []);

  const loadCitations = async () => {
    try {
      const data = await AsyncStorage.getItem('currentProject');
      if (data) {
        const project = JSON.parse(data);
        setCitations(project.citations || []);
      }
    } catch (error) {
      console.log('Error loading citations:', error);
    }
  };

  const filteredCitations = citations.filter((citation) =>
    citation.req.toLowerCase().includes(search.toLowerCase()) ||
    citation.source.toLowerCase().includes(search.toLowerCase())
  );

  const formatCitation = (citation, format) => {
    switch (format) {
      case 'apa':
        return `${citation.source}. ${citation.detail}`;
      case 'chicago':
        return `"${citation.req}." ${citation.source}, ${citation.detail}.`;
      case 'mla':
        return `"${citation.req}." ${citation.source}. ${citation.detail}.`;
      default:
        return `${citation.source}: ${citation.detail}`;
    }
  };

  const generateBibliography = () => {
    const uniqueStandards = [...new Set(citations.map(c => c.source))].sort();
    const bibliography = uniqueStandards
      .map(std => {
        const match = citations.find(c => c.source === std);
        return `${std}. ${match.detail}`;
      })
      .join('\n\n');

    return bibliography;
  };

  const exportBibliography = () => {
    const bib = generateBibliography();
    Alert.alert('Bibliography Generated', bib, [
      {
        text: 'Copy to Clipboard',
        onPress: () => {
          // In a real app, use react-native-clipboard
          Alert.alert('Success', 'Bibliography copied (in production)');
        },
      },
      { text: 'Close' },
    ]);
  };

  const renderCitation = ({ item }) => (
    <View style={styles.citationCard}>
      <View style={styles.citationHeader}>
        <MaterialIcons name="note" size={20} color="#4a90e2" />
        <Text style={styles.citationReq}>{item.req}</Text>
      </View>

      <View style={styles.citationContent}>
        <View style={styles.sourceBox}>
          <Text style={styles.sourceLabel}>Source</Text>
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Detail</Text>
          <Text style={styles.detailText}>{item.detail}</Text>
        </View>

        <View style={styles.formatBox}>
          <Text style={styles.formatLabel}>Formatted Citation ({selectedFormat.toUpperCase()})</Text>
          <Text style={styles.formattedText}>
            {formatCitation(item, selectedFormat)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="note" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Citations & References</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Format Selector */}
        <View style={styles.formatSelector}>
          <Text style={styles.formatLabel}>Citation Format</Text>
          <View style={styles.formatButtons}>
            {['apa', 'chicago', 'mla'].map((format) => (
              <TouchableOpacity
                key={format}
                style={[
                  styles.formatButton,
                  selectedFormat === format && styles.formatButtonActive,
                ]}
                onPress={() => setSelectedFormat(format)}
              >
                <Text
                  style={[
                    styles.formatButtonText,
                    selectedFormat === format && styles.formatButtonTextActive,
                  ]}
                >
                  {format.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search citations..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#bbb"
          />
        </View>

        {/* Count */}
        <Text style={styles.countText}>
          Found {filteredCitations.length} citation{filteredCitations.length !== 1 ? 's' : ''}
        </Text>

        {/* Citations List */}
        <FlatList
          data={filteredCitations}
          renderItem={renderCitation}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />

        {/* Bibliography */}
        <View style={styles.bibliographyCard}>
          <View style={styles.bibliographyHeader}>
            <MaterialIcons name="library-books" size={24} color="#27ae60" />
            <Text style={styles.bibliographyTitle}>Complete Bibliography</Text>
          </View>

          <Text style={styles.bibliographySubtitle}>
            {[...new Set(citations.map(c => c.source))].length} unique standards
          </Text>

          <View style={styles.bibliographyContent}>
            {[...new Set(citations.map(c => c.source))].map((std, idx) => (
              <View key={idx} style={styles.bibliographyItem}>
                <Text style={styles.bibliographyNumber}>{idx + 1}.</Text>
                <Text style={styles.bibliographyText}>{std}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.exportButton} onPress={exportBibliography}>
            <MaterialIcons name="download" size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export Bibliography</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <MaterialIcons name="lightbulb" size={20} color="#f39c12" />
            <Text style={styles.tipsTitle}>Citation Tips</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Always cite the specific standard and section referenced
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Use triangular research: Canadian, International, Provincial
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Include in all design documents for traceability
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Update bibliography when standards are revised
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  formatSelector: {
    marginBottom: 16,
  },
  formatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  formatButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  formatButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  formatButtonActive: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  formatButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  formatButtonTextActive: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
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
  countText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  citationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
    elevation: 1,
  },
  citationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  citationReq: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  citationContent: {
    gap: 10,
  },
  sourceBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 6,
    padding: 8,
  },
  sourceLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
  },
  sourceText: {
    fontSize: 12,
    color: '#1e3a5f',
    fontWeight: '600',
  },
  detailBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 8,
  },
  detailLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 11,
    color: '#333',
    lineHeight: 16,
  },
  formatBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 6,
    padding: 8,
  },
  formattedText: {
    fontSize: 11,
    color: '#2e7d32',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  bibliographyCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  bibliographyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  bibliographyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bibliographySubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  bibliographyContent: {
    marginBottom: 12,
  },
  bibliographyItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  bibliographyNumber: {
    fontSize: 11,
    color: '#27ae60',
    fontWeight: '700',
    width: 20,
  },
  bibliographyText: {
    flex: 1,
    fontSize: 11,
    color: '#333',
  },
  exportButton: {
    backgroundColor: '#27ae60',
    borderRadius: 6,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e65100',
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#f39c12',
    fontWeight: '700',
    width: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 11,
    color: '#333',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 40,
  },
});

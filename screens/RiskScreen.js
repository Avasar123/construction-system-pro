import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RiskScreen() {
  const [risks, setRisks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    try {
      const data = await AsyncStorage.getItem('currentProject');
      if (data) {
        const project = JSON.parse(data);
        setRisks(project.risks || []);
      }
    } catch (error) {
      console.log('Error loading risks:', error);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High':
        return '#e74c3c';
      case 'Medium':
        return '#f39c12';
      case 'Low':
        return '#27ae60';
      default:
        return '#999';
    }
  };

  const filteredRisks = risks.filter((risk) => {
    if (filter === 'all') return true;
    return risk.level === filter;
  });

  const counts = {
    high: risks.filter(r => r.level === 'High').length,
    medium: risks.filter(r => r.level === 'Medium').length,
    low: risks.filter(r => r.level === 'Low').length,
    total: risks.length,
  };

  const riskScore = Math.round(
    (counts.high * 3 + counts.medium * 2 + counts.low * 1) / (counts.total || 1)
  );

  const getRiskScoreColor = (score) => {
    if (score >= 2.5) return '#e74c3c';
    if (score >= 1.5) return '#f39c12';
    return '#27ae60';
  };

  const renderRisk = ({ item, index }) => {
    const isExpanded = expandedId === index;
    return (
      <TouchableOpacity
        style={[
          styles.riskCard,
          { borderLeftColor: getRiskColor(item.level) },
        ]}
        onPress={() => setExpandedId(isExpanded ? null : index)}
      >
        <View style={styles.riskHeader}>
          <View
            style={[
              styles.riskLevelBadge,
              { backgroundColor: getRiskColor(item.level) + '20' },
            ]}
          >
            <Text
              style={[
                styles.riskLevelText,
                { color: getRiskColor(item.level) },
              ]}
            >
              {item.level}
            </Text>
          </View>

          <View style={styles.riskTitleContainer}>
            <Text style={styles.riskTitle}>{item.title}</Text>
          </View>

          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={20}
            color={getRiskColor(item.level)}
          />
        </View>

        {isExpanded && (
          <View style={styles.riskDetails}>
            <View style={styles.detailRow}>
              <MaterialIcons name="description" size={16} color="#666" />
              <Text style={styles.detailText}>{item.description}</Text>
            </View>

            {item.mitigation && (
              <View style={styles.mitigationBox}>
                <View style={styles.mitigationHeader}>
                  <MaterialIcons name="shield" size={16} color="#27ae60" />
                  <Text style={styles.mitigationTitle}>Mitigation Strategy</Text>
                </View>
                <Text style={styles.mitigationText}>{item.mitigation}</Text>
              </View>
            )}

            {item.impact && (
              <View style={styles.impactBox}>
                <Text style={styles.impactTitle}>Potential Impact:</Text>
                <Text style={styles.impactText}>{item.impact}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="warning" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Risk Assessment</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Risk Score */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Overall Risk Score</Text>
            <Text style={[styles.scoreValue, { color: getRiskScoreColor(riskScore) }]}>
              {riskScore.toFixed(1)}/3.0
            </Text>
          </View>

          <View style={styles.scoreRight}>
            <View style={styles.gaugeCircle}>
              <Text
                style={[
                  styles.gaugeText,
                  { color: getRiskScoreColor(riskScore) },
                ]}
              >
                {riskScore >= 2.5 ? '🔴' : riskScore >= 1.5 ? '🟡' : '🟢'}
              </Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'all' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'all' && styles.filterTextActive,
              ]}
            >
              All ({counts.total})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'High' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('High')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'High' && styles.filterTextActive,
              ]}
            >
              High ({counts.high})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'Medium' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('Medium')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'Medium' && styles.filterTextActive,
              ]}
            >
              Medium ({counts.medium})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'Low' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('Low')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'Low' && styles.filterTextActive,
              ]}
            >
              Low ({counts.low})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Risk List */}
        <FlatList
          data={filteredRisks}
          renderItem={renderRisk}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="check-circle" size={48} color="#27ae60" />
              <Text style={styles.emptyText}>No risks at this level</Text>
            </View>
          }
        />

        {/* Recommendations */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <MaterialIcons name="lightbulb" size={24} color="#f39c12" />
            <Text style={styles.recommendationTitle}>Key Recommendations</Text>
          </View>

          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>
              Schedule project timeline with 10-15% contingency for high-risk items
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>
              Allocate budget reserves for material sourcing risks
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>
              Establish stakeholder communication plan for external dependencies
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>
              Conduct regular risk reviews (monthly) and update assessment
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
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  scoreLeft: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  scoreRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeText: {
    fontSize: 32,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  filterTabActive: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  filterText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  riskCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  riskLevelBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  riskLevelText: {
    fontSize: 11,
    fontWeight: '700',
  },
  riskTitleContainer: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  riskDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  detailText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  mitigationBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#27ae60',
  },
  mitigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  mitigationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  mitigationText: {
    fontSize: 11,
    color: '#333',
    lineHeight: 16,
  },
  impactBox: {
    backgroundColor: '#fff3e0',
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
  },
  impactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e65100',
    marginBottom: 4,
  },
  impactText: {
    fontSize: 11,
    color: '#333',
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recommendationItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#f39c12',
    fontWeight: '700',
    width: 16,
  },
  recommendationText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 40,
  },
});

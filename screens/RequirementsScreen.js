import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequirementsScreen() {
  const [requirements, setRequirements] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    try {
      const data = await AsyncStorage.getItem('currentProject');
      if (data) {
        const project = JSON.parse(data);
        setRequirements(project.requirements || []);
      }
    } catch (error) {
      console.log('Error loading requirements:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return '#27ae60';
      case 'flagged':
        return '#e74c3c';
      case 'partial':
        return '#f39c12';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'check-circle';
      case 'flagged':
        return 'cancel';
      case 'partial':
        return 'help';
      default:
        return 'radio-button-unchecked';
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch =
      req.text.toLowerCase().includes(search.toLowerCase()) ||
      req.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    verified: requirements.filter(r => r.status === 'verified').length,
    flagged: requirements.filter(r => r.status === 'flagged').length,
    partial: requirements.filter(r => r.status === 'partial').length,
    total: requirements.length,
  };

  const renderRequirement = ({ item }) => (
    <View style={styles.requirementCard}>
      <View style={styles.requirementHeader}>
        <MaterialIcons
          name={getStatusIcon(item.status)}
          size={20}
          color={getStatusColor(item.status)}
        />
        <Text style={styles.requirementText}>{item.text}</Text>
      </View>

      <View style={styles.requirementFooter}>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                item.category === 'Structural'
                  ? '#e8f5e9'
                  : item.category === 'Materials'
                  ? '#fff3e0'
                  : item.category === 'Safety'
                  ? '#ffebee'
                  : '#f3e5f5',
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color:
                  item.category === 'Structural'
                    ? '#2e7d32'
                    : item.category === 'Materials'
                    ? '#e65100'
                    : item.category === 'Safety'
                    ? '#c62828'
                    : '#6a1b9a',
              },
            ]}
          >
            {item.category}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="list-alt" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Requirements</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
              filter === 'verified' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('verified')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'verified' && styles.filterTextActive,
              ]}
            >
              Verified ({counts.verified})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'flagged' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('flagged')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'flagged' && styles.filterTextActive,
              ]}
            >
              Flagged ({counts.flagged})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'partial' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('partial')}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'partial' && styles.filterTextActive,
              ]}
            >
              Partial ({counts.partial})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search requirements..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#bbb"
          />
        </View>

        {/* Requirements List */}
        <FlatList
          data={filteredRequirements}
          renderItem={renderRequirement}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="inbox" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No requirements found</Text>
            </View>
          }
        />

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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#fff',
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
  requirementCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
    elevation: 1,
  },
  requirementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  requirementText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
  requirementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
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
  bottomPadding: {
    height: 40,
  },
});

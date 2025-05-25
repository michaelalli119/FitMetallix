import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { workouts, WorkoutType, WorkoutLevel } from '@/constants/workouts';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<WorkoutType | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<WorkoutLevel | 'all'>('all');
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use tRPC to fetch workouts
  const workoutsQuery = trpc.workouts.getWorkouts.useQuery({
    type: selectedType === 'all' ? undefined : selectedType,
    level: selectedLevel === 'all' ? undefined : selectedLevel,
  }, {
    onSuccess: (data) => {
      setIsLoading(false);
      // Apply search filter client-side
      if (searchQuery) {
        const filtered = data.filter(workout => 
          workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredWorkouts(filtered);
      } else {
        setFilteredWorkouts(data);
      }
    },
    onError: (error) => {
      console.error("Error fetching workouts:", error);
      setIsLoading(false);
      // Fallback to local filtering if API fails
      filterWorkoutsLocally();
    }
  });
  
  const workoutTypes: { id: WorkoutType | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'strength', label: 'Strength' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'recovery', label: 'Recovery' },
  ];
  
  const workoutLevels: { id: WorkoutLevel | 'all'; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];
  
  // Filter workouts locally as a fallback
  const filterWorkoutsLocally = () => {
    let filtered = [...workouts];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(workout => workout.type === selectedType);
    }
    
    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(workout => workout.level === selectedLevel);
    }
    
    setFilteredWorkouts(filtered);
  };
  
  // Apply search filter when query changes
  useEffect(() => {
    if (workoutsQuery.data) {
      if (searchQuery) {
        const filtered = workoutsQuery.data.filter(workout => 
          workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredWorkouts(filtered);
      } else {
        setFilteredWorkouts(workoutsQuery.data);
      }
    } else {
      filterWorkoutsLocally();
    }
  }, [searchQuery]);
  
  // Refetch when filters change
  useEffect(() => {
    if (workoutsQuery.refetch) {
      workoutsQuery.refetch();
    }
  }, [selectedType, selectedLevel]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Header showGreeting={false} title="Workouts" />
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search workouts"
            placeholderTextColor={colors.textSecondary}
            cursorColor={colors.primary}
          />
        </View>
        
        {/* Type Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {workoutTypes.map(type => (
            <Text
              key={type.id}
              style={[
                styles.filterItem,
                selectedType === type.id && styles.selectedFilter
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              {type.label}
            </Text>
          ))}
        </ScrollView>
        
        {/* Level Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {workoutLevels.map(level => (
            <Text
              key={level.id}
              style={[
                styles.filterItem,
                selectedLevel === level.id && styles.selectedFilter
              ]}
              onPress={() => setSelectedLevel(level.id)}
            >
              {level.label}
            </Text>
          ))}
        </ScrollView>
        
        {/* Workouts List */}
        <View style={styles.workoutsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading workouts...</Text>
            </View>
          ) : filteredWorkouts.length > 0 ? (
            filteredWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          ) : (
            <Text style={styles.emptyText}>
              No workouts found. Try adjusting your filters.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    color: colors.text,
  },
  filterContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginRight: 8,
    color: colors.text,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  selectedFilter: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderColor: colors.primary,
  },
  workoutsContainer: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: colors.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: colors.textSecondary,
  },
});
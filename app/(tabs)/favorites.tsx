import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { mockFavorites } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BookOpen } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites data
    setFavorites(mockFavorites);
  }, []);

  const navigateToSectionDetails = (sectionId) => {
    router.push(`/sectionDetails/${sectionId}`);
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.favoriteItem, { backgroundColor: colors.card }]}
      onPress={() => navigateToSectionDetails(item.id)}
    >
      <View style={styles.favoriteContent}>
        <View style={styles.iconContainer}>
          <BookOpen size={24} color="#4294ff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.bookTitle, { color: colors.textSecondary }]}>{item.bookTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Favorites" />
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            You haven't added any favorites yet.
          </Text>
          <TouchableOpacity 
            style={[styles.exploreButton, { backgroundColor: '#4294ff' }]}
            onPress={() => router.push('/')}
          >
            <Text style={styles.exploreButtonText}>Explore Books</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  favoriteItem: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  bookTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  }
});
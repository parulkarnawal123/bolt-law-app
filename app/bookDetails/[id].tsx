import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Pin as PinIcon, BookOpen } from 'lucide-react-native';
import { mockBooks, mockSections } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BookDetailsScreen() {
  const { colors } = useColorScheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [sections, setSections] = useState([]);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (id) {
      // Find book by id
      const foundBook = mockBooks.find(b => b.id.toString() === id);
      if (foundBook) {
        setBook(foundBook);
        setIsPinned(foundBook.isPinned);
        
        // Get sections for this book
        const bookSections = mockSections.filter(s => s.bookId.toString() === id);
        setSections(bookSections);
      }
    }
  }, [id]);

  const togglePin = () => {
    setIsPinned(!isPinned);
    // Update book pin status in real app
  };

  const navigateToSectionDetails = (sectionId) => {
    router.push(`/sectionDetails/${sectionId}`);
  };

  const renderSectionItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.sectionItem, { backgroundColor: colors.card }]}
      onPress={() => navigateToSectionDetails(item.id)}
    >
      <View style={styles.sectionNumber}>
        <Text style={[styles.sectionNumberText, { color: '#4294ff' }]}>{index + 1}</Text>
      </View>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{item.title}</Text>
        {item.description && (
          <Text 
            style={[styles.sectionDescription, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pinButton}
            onPress={togglePin}
          >
            <PinIcon size={24} color={isPinned ? '#4294ff' : colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.bookInfo}>
          <View style={styles.bookIconContainer}>
            <BookOpen size={32} color="#4294ff" />
          </View>
          <Text style={[styles.bookTitle, { color: colors.text }]}>{book.title}</Text>
          <Text style={[styles.bookMeta, { color: colors.textSecondary }]}>
            {sections.length} Sections • Last updated: {new Date(book.lastUpdated).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Sections List */}
      <FlatList
        data={sections}
        renderItem={renderSectionItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.sectionsList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={[styles.listHeaderTitle, { color: colors.text }]}>
              All Sections
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  pinButton: {
    padding: 8,
    borderRadius: 8,
  },
  bookInfo: {
    alignItems: 'center',
  },
  bookIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e6ecff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookMeta: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionsList: {
    padding: 16,
  },
  listHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  sectionItem: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionNumber: {
    width: 30,
    marginRight: 12,
    alignItems: 'center',
  },
  sectionNumberText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
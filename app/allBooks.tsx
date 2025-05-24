import { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal,
  Clock,
  BookOpen,
  ChevronDown,
  X,
  Check
} from 'lucide-react-native';
import { mockBooks } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import BookCard from '@/components/BookCard';

type SortOption = 'title' | 'recent' | 'sections';
type FilterOption = 'all' | 'pinned' | 'new';

export default function AllBooksScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  
  const filterBooks = useCallback(() => {
    let filtered = [...mockBooks];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    switch (filterBy) {
      case 'pinned':
        filtered = filtered.filter(book => book.isPinned);
        break;
      case 'new':
        filtered = filtered.filter(book => book.isNew);
        break;
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        filtered.sort((a, b) => 
          new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
        );
        break;
      case 'sections':
        filtered.sort((a, b) => b.sections - a.sections);
        break;
    }
    
    return filtered;
  }, [searchQuery, sortBy, filterBy]);
  
  const navigateToBookDetails = (bookId: number) => {
    router.push(`/bookDetails/${bookId}`);
  };
  
  const renderSortOption = (option: SortOption, label: string) => (
    <TouchableOpacity 
      style={[
        styles.filterOption,
        sortBy === option && { backgroundColor: '#e6ecff' }
      ]}
      onPress={() => setSortBy(option)}
    >
      <Text 
        style={[
          styles.filterOptionText,
          { color: sortBy === option ? '#4294ff' : colors.text }
        ]}
      >
        {label}
      </Text>
      {sortBy === option && (
        <Check size={16} color="#4294ff" style={{ marginLeft: 8 }} />
      )}
    </TouchableOpacity>
  );
  
  const renderFilterOption = (option: FilterOption, label: string) => (
    <TouchableOpacity 
      style={[
        styles.filterOption,
        filterBy === option && { backgroundColor: '#e6ecff' }
      ]}
      onPress={() => setFilterBy(option)}
    >
      <Text 
        style={[
          styles.filterOptionText,
          { color: filterBy === option ? '#4294ff' : colors.text }
        ]}
      >
        {label}
      </Text>
      {filterBy === option && (
        <Check size={16} color="#4294ff" style={{ marginLeft: 8 }} />
      )}
    </TouchableOpacity>
  );
  
  const ListHeader = () => (
    <>
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search law books..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            { backgroundColor: colors.card },
            showFilters && { backgroundColor: '#e6ecff' }
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal 
            size={20} 
            color={showFilters ? '#4294ff' : colors.text} 
          />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={[styles.filtersContainer, { backgroundColor: colors.card }]}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>
              Sort By
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterOptions}
            >
              {renderSortOption('title', 'Title')}
              {renderSortOption('recent', 'Recently Accessed')}
              {renderSortOption('sections', 'Number of Sections')}
            </ScrollView>
          </View>
          
          <View style={[styles.filterSection, { borderTopColor: colors.border }]}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>
              Filter By
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterOptions}
            >
              {renderFilterOption('all', 'All Books')}
              {renderFilterOption('pinned', 'Pinned Books')}
              {renderFilterOption('new', 'New Books')}
            </ScrollView>
          </View>
        </View>
      )}
      
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors.text }]}>
          {filterBooks().length} Books Found
        </Text>
      </View>
    </>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Law Books Library
          </Text>
          
          <View style={{ width: 40 }} />
        </View>
      </View>
      
      <FlatList
        data={filterBooks()}
        renderItem={({ item }) => (
          <BookCard 
            book={item} 
            onPress={() => navigateToBookDetails(item.id)}
            showLastAccessed
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <BookOpen size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No books found
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Try adjusting your search or filters
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
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  filterSection: {
    padding: 16,
    borderTopWidth: 1,
  },
  filterTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  filterOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  resultsCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
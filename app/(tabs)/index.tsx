import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell } from 'lucide-react-native';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  const { user } = useAuth();
  const [pinnedBooks, setPinnedBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    // Filter pinned books
    const pinned = mockBooks.filter(book => book.isPinned);
    setPinnedBooks(pinned);

    // Filter recent books
    const recent = mockBooks.sort((a, b) => 
      new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    ).slice(0, 5);
    setRecentBooks(recent);

    // Filter new books
    const newAdded = mockBooks.filter(book => book.isNew);
    setNewBooks(newAdded);
  }, []);

  const navigateToBookDetails = (bookId) => {
    router.push(`/bookDetails/${bookId}`);
  };

  const navigateToAllBooks = () => {
    router.push('/allBooks');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pinned Books Section */}
        {pinnedBooks.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Pinned Books</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {pinnedBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onPress={() => navigateToBookDetails(book.id)} 
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recently Accessed Books */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recently Accessed</Text>
          {recentBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onPress={() => navigateToBookDetails(book.id)} 
              showLastAccessed
            />
          ))}
        </View>

        {/* New Additions */}
        {newBooks.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>New Additions</Text>
            {newBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onPress={() => navigateToBookDetails(book.id)} 
                highlight
              />
            ))}
          </View>
        )}

        {/* View All Books Button */}
        <TouchableOpacity 
          style={[styles.viewAllButton, { backgroundColor: '#4294ff' }]}
          onPress={navigateToAllBooks}
        >
          <Text style={styles.viewAllButtonText}>View All Law Books</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginVertical: 10,
  },
  horizontalScroll: {
    paddingBottom: 15,
  },
  viewAllButton: {
    margin: 16,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  viewAllButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
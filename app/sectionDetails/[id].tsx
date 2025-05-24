import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Platform,
  Share
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Tag, 
  Settings, 
  ChevronRight,
  BookOpen
} from 'lucide-react-native';
import { mockSections, mockBooks } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import SettingsModal from '@/components/SettingsModal';

export default function SectionDetailsScreen() {
  const { colors } = useColorScheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [section, setSection] = useState(null);
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [textAlign, setTextAlign] = useState('left');
  const [textColor, setTextColor] = useState(colors.text);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.8, 1],
    extrapolate: 'clamp',
  });

  // Update text color when theme changes
  useEffect(() => {
    setTextColor(colors.text);
  }, [colors.text]);

  useEffect(() => {
    if (id) {
      // Find section by id
      const foundSection = mockSections.find(s => s.id.toString() === id);
      if (foundSection) {
        setSection(foundSection);
        setIsFavorite(foundSection.isFavorite);
        
        // Find book for this section
        const foundBook = mockBooks.find(b => b.id === foundSection.bookId);
        if (foundBook) {
          setBook(foundBook);
        }
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Update favorite status in real app
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        alert('Sharing is not available on web');
        return;
      }
      
      await Share.share({
        message: `${section.title} from ${book?.title}\n\n${section.content}`,
        title: section.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openTagsModal = () => {
    // Implement tags modal
    console.log('Open tags modal');
  };

  const navigateToNextSection = () => {
    // Find next section and navigate to it
    if (section && book) {
      const bookSections = mockSections.filter(s => s.bookId === book.id);
      const currentIndex = bookSections.findIndex(s => s.id === section.id);
      
      if (currentIndex < bookSections.length - 1) {
        const nextSection = bookSections[currentIndex + 1];
        router.replace(`/sectionDetails/${nextSection.id}`);
      }
    }
  };

  if (!section || !book) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.animatedHeader, 
          { 
            backgroundColor: colors.card,
            opacity: headerOpacity,
            borderBottomColor: colors.border
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text 
          style={[styles.headerTitle, { color: colors.text }]} 
          numberOfLines={1}
        >
          {section.title}
        </Text>
        <View style={styles.headerRight} />
      </Animated.View>
      
      {/* Static Header */}
      <View style={styles.staticHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Section Info */}
        <View style={styles.sectionInfo}>
          <View style={[styles.bookBadge, { backgroundColor: '#e6ecff' }]}>
            <BookOpen size={14} color="#4294ff" />
            <Text style={[styles.bookBadgeText, { color: '#4294ff' }]}>
              {book.title}
            </Text>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {section.title}
          </Text>
        </View>
        
        {/* Section Content */}
        <View style={styles.contentContainer}>
          <Text 
            style={[
              styles.content, 
              { 
                color: textColor,
                fontSize, 
                lineHeight: fontSize * lineHeight,
                textAlign
              }
            ]}
          >
            {section.content}
          </Text>
        </View>
        
        {/* Next Section Button */}
        <TouchableOpacity 
          style={[styles.nextButton, { backgroundColor: '#4294ff' }]}
          onPress={navigateToNextSection}
        >
          <Text style={styles.nextButtonText}>Next Section</Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </Animated.ScrollView>
      
      {/* Action Buttons */}
      <View style={[styles.actionsContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={toggleFavorite}
        >
          <Heart 
            size={24} 
            color={isFavorite ? '#FF6B6B' : colors.textSecondary} 
            fill={isFavorite ? '#FF6B6B' : 'none'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={openTagsModal}
        >
          <Tag size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Share2 size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setSettingsModalVisible(true)}
        >
          <Settings size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {/* Settings Modal */}
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
        textColor={textColor}
        setTextColor={setTextColor}
        colors={colors}
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
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 16,
    zIndex: 100,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerRight: {
    width: 40,
  },
  staticHeader: {
    height: 90,
    paddingTop: 40,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  sectionInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bookBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginBottom: 10,
  },
  bookBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 5,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  content: {
    fontFamily: 'Inter-Regular',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 5,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, Clock } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    sections: number;
    progress?: number;
    lastAccessed?: string;
    isPinned?: boolean;
    isNew?: boolean;
  };
  onPress: () => void;
  showLastAccessed?: boolean;
  highlight?: boolean;
}

export default function BookCard({ 
  book, 
  onPress, 
  showLastAccessed = false,
  highlight = false
}: BookCardProps) {
  const { colors } = useColorScheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          borderColor: highlight ? '#4294ff' : colors.border,
          borderWidth: highlight ? 2 : 1,
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
          <BookOpen size={24} color="#4294ff" />
        </View>
        
        <View style={styles.details}>
          <Text 
            style={[styles.title, { color: colors.text }]}
            numberOfLines={2}
          >
            {book.title}
          </Text>
          
          <Text style={[styles.sections, { color: colors.textSecondary }]}>
            {book.sections} Sections
          </Text>
          
          {showLastAccessed && book.lastAccessed && (
            <View style={styles.lastAccessed}>
              <Clock size={12} color={colors.textSecondary} />
              <Text style={[styles.lastAccessedText, { color: colors.textSecondary }]}>
                Last accessed: {formatDate(book.lastAccessed)}
              </Text>
            </View>
          )}
          
          {book.progress !== undefined && (
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { backgroundColor: colors.border }
                ]}
              >
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: '#4294ff',
                      width: `${book.progress}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {book.progress}%
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {book.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
      
      {book.isPinned && (
        <View style={styles.pinnedIndicator}>
          <View style={styles.pinnedDot} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  sections: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  lastAccessed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastAccessedText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    flex: 1,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 8,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  pinnedIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  pinnedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4294ff',
  }
});
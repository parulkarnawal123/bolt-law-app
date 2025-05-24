import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { mockTags } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ChevronDown, ChevronUp, CreditCard as Edit2, Trash2 } from 'lucide-react-native';

export default function TagsScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [expandedTagId, setExpandedTagId] = useState(null);

  useEffect(() => {
    // Load tags data
    setTags(mockTags);
  }, []);

  const toggleExpand = (tagId) => {
    setExpandedTagId(expandedTagId === tagId ? null : tagId);
  };

  const navigateToSectionDetails = (sectionId) => {
    router.push(`/sectionDetails/${sectionId}`);
  };

  const editTag = (tagId) => {
    // Implement tag editing functionality
    console.log(`Edit tag ${tagId}`);
  };

  const deleteTag = (tagId) => {
    // Implement tag deletion functionality
    console.log(`Delete tag ${tagId}`);
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const renderTagItem = ({ item }) => (
    <View style={[styles.tagContainer, { backgroundColor: colors.card }]}>
      <TouchableOpacity 
        style={styles.tagHeader}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.tagTitleContainer}>
          <View style={[styles.tagDot, { backgroundColor: item.color || '#4294ff' }]} />
          <Text style={[styles.tagTitle, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.tagCount, { color: colors.textSecondary }]}>
            {item.sections.length} items
          </Text>
        </View>
        
        <View style={styles.tagActions}>
          <TouchableOpacity 
            style={styles.tagAction} 
            onPress={() => editTag(item.id)}
          >
            <Edit2 size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tagAction} 
            onPress={() => deleteTag(item.id)}
          >
            <Trash2 size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          {expandedTagId === item.id ? 
            <ChevronUp size={20} color={colors.textSecondary} /> : 
            <ChevronDown size={20} color={colors.textSecondary} />
          }
        </View>
      </TouchableOpacity>
      
      {expandedTagId === item.id && (
        <View style={styles.sectionsContainer}>
          {item.sections.map(section => (
            <TouchableOpacity 
              key={section.id}
              style={[styles.sectionItem, { borderTopColor: colors.border }]}
              onPress={() => navigateToSectionDetails(section.id)}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {section.title}
              </Text>
              <Text style={[styles.bookTitle, { color: colors.textSecondary }]}>
                {section.bookTitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Tags" />
      
      {tags.length > 0 ? (
        <FlatList
          data={tags}
          renderItem={renderTagItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            You haven't created any tags yet.
          </Text>
          <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
            Tags help you organize sections for easy access.
          </Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.createTagButton, { backgroundColor: '#4294ff' }]}
        onPress={() => console.log('Create new tag')}
      >
        <Text style={styles.createTagButtonText}>Create New Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  tagContainer: {
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  tagTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tagDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  tagTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 8,
  },
  tagCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  tagActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagAction: {
    marginHorizontal: 8,
  },
  sectionsContainer: {
    paddingHorizontal: 16,
  },
  sectionItem: {
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
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
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  createTagButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createTagButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  }
});
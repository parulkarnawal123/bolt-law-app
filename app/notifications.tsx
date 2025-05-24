import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, BookOpen, Tag, Heart } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

const mockNotifications = [
  {
    id: 1,
    type: 'update',
    title: 'New Updates Available',
    message: 'The Constitution of India has been updated with recent amendments',
    timestamp: '2025-04-12T14:30:00',
    read: false,
  },
  {
    id: 2,
    type: 'favorite',
    title: 'Section Added to Favorites',
    message: 'Article 21: Right to Life and Personal Liberty has been added to your favorites',
    timestamp: '2025-04-12T10:15:00',
    read: true,
  },
  {
    id: 3,
    type: 'tag',
    title: 'New Tag Created',
    message: 'You created a new tag: "Constitutional Rights"',
    timestamp: '2025-04-11T16:45:00',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <BookOpen size={24} color="#4294ff" />;
      case 'favorite':
        return <Heart size={24} color="#FF6B6B" />;
      case 'tag':
        return <Tag size={24} color="#10B981" />;
      default:
        return <Bell size={24} color="#4294ff" />;
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        { 
          backgroundColor: colors.card,
          opacity: item.read ? 0.8 : 1,
        }
      ]}
      onPress={() => {
        // Mark as read and handle navigation
        setNotifications(prev =>
          prev.map(n => n.id === item.id ? { ...n, read: true } : n)
        );
      }}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text 
          style={[styles.notificationMessage, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.message}
        </Text>
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
      
      {!item.read && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
        </Text>
        
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => setNotifications([])}
        >
          <Text style={[styles.clearButtonText, { color: colors.textSecondary }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Bell size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No notifications yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              We'll notify you when there are updates or important changes
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  clearButton: {
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6ecff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 24,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4294ff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});
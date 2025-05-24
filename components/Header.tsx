import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, X, Menu } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';
import SidebarMenu from './SidebarMenu';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { colors } = useColorScheme();
  const router = useRouter();
  const { user } = useAuth();
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleSearchPress = () => {
    setIsSearchActive(true);
  };
  
  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };
  
  const handleNotificationPress = () => {
    router.push('/notifications');
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const navigateToProfile = () => {
    router.push('/profile');
  };
  
  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.statusBar} />
        
        <View style={styles.headerContent}>
          {isSearchActive ? (
            <View style={styles.searchContainer}>
              <TouchableOpacity onPress={handleCloseSearch}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
              
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search books, sections..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              
              <TouchableOpacity onPress={handleSearch}>
                <Search size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={toggleSidebar}>
                {user?.avatar ? (
                  <Image 
                    source={{ uri: user.avatar }} 
                    style={styles.avatar} 
                  />
                ) : (
                  <Menu size={24} color={colors.text} />
                )}
              </TouchableOpacity>
              
              <Text style={[styles.title, { color: colors.text }]}>
                {title || 'Indian Law Library'}
              </Text>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={handleSearchPress}
                >
                  <Search size={24} color={colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={handleNotificationPress}
                >
                  <Bell size={24} color={colors.text} />
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>3</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
      
      <SidebarMenu 
        isVisible={isSidebarOpen} 
        onClose={toggleSidebar}
        onProfilePress={navigateToProfile}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingBottom: 10,
  },
  statusBar: {
    height: 50,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});
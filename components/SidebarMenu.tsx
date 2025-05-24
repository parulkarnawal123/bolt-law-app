import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Dimensions,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Moon, Sun, FileText, CircleHelp as HelpCircle, Mail, LogOut, X } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface SidebarMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onProfilePress: () => void;
}

export default function SidebarMenu({ 
  isVisible, 
  onClose,
  onProfilePress
}: SidebarMenuProps) {
  const { colors } = useColorScheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const translateX = useRef(new Animated.Value(-280)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -280,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isVisible]);
  
  const handleProfilePress = () => {
    onClose();
    onProfilePress();
  };
  
  const handleNavigate = (route: string) => {
    onClose();
    router.push(route);
  };
  
  const handleLogout = async () => {
    try {
      onClose();
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  if (Platform.OS === 'web' && !isVisible) {
    return null;
  }
  
  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}>
      <Animated.View 
        style={[
          styles.backdrop,
          { opacity }
        ]}
      >
        <TouchableOpacity 
          style={styles.backdropTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.sidebar, 
          { 
            backgroundColor: colors.background,
            transform: [{ translateX }]
          }
        ]}
      >
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          {user?.avatar ? (
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={[styles.profilePlaceholder, { backgroundColor: '#e6ecff' }]}>
              <User size={32} color="#4294ff" />
            </View>
          )}
          
          <Text style={[styles.profileName, { color: colors.text }]}>
            {user?.name || 'Guest User'}
          </Text>
          
          {user?.email && (
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              {user.email}
            </Text>
          )}
          
          <TouchableOpacity 
            style={[styles.profileButton, { backgroundColor: '#e6ecff' }]}
            onPress={handleProfilePress}
          >
            <Text style={[styles.profileButtonText, { color: '#4294ff' }]}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuItems}>
          <View style={[styles.menuSection, { borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => toggleTheme()}
            >
              {theme === 'dark' ? (
                <Sun size={20} color={colors.text} style={styles.menuIcon} />
              ) : (
                <Moon size={20} color={colors.text} style={styles.menuIcon} />
              )}
              <Text style={[styles.menuText, { color: colors.text }]}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.menuSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.menuSectionTitle, { color: colors.textSecondary }]}>
              Legal Pages
            </Text>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigate('/privacy-policy')}
            >
              <FileText size={20} color={colors.text} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigate('/about')}
            >
              <HelpCircle size={20} color={colors.text} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>
                About Us
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigate('/contact')}
            >
              <Mail size={20} color={colors.text} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { borderTopColor: colors.border }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF6B6B" style={styles.menuIcon} />
          <Text style={[styles.logoutText, { color: '#FF6B6B' }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  backdropTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  profileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  profileButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  menuItems: {
    flex: 1,
  },
  menuSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuSectionTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});
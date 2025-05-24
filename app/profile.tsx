import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Camera, 
  LogOut, 
  Bell, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg');
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      if (user.avatar) setAvatar(user.avatar);
    }
  }, [user]);
  
  const handleSave = () => {
    // Save profile updates
    setIsEditing(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Text style={[styles.editButtonText, { color: '#4294ff' }]}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: avatar }} 
            style={styles.avatar} 
          />
          {isEditing && (
            <TouchableOpacity 
              style={[styles.cameraButton, { backgroundColor: '#4294ff' }]}
              onPress={() => console.log('Change photo')}
            >
              <Camera size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Information
          </Text>
          
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Full Name
            </Text>
            {isEditing ? (
              <TextInput 
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.card, 
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={[styles.fieldValue, { color: colors.text }]}>
                {name || 'Not set'}
              </Text>
            )}
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Email
            </Text>
            <View style={styles.fieldRow}>
              <Mail size={16} color="#4294ff" style={styles.fieldIcon} />
              {isEditing ? (
                <TextInput 
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.card, 
                      color: colors.text,
                      borderColor: colors.border,
                      flex: 1
                    }
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={[styles.fieldValue, { color: colors.text }]}>
                  {email || 'Not set'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Phone Number
            </Text>
            <View style={styles.fieldRow}>
              <Phone size={16} color="#4294ff" style={styles.fieldIcon} />
              {isEditing ? (
                <TextInput 
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.card, 
                      color: colors.text,
                      borderColor: colors.border,
                      flex: 1
                    }
                  ]}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={[styles.fieldValue, { color: colors.text }]}>
                  {phone || 'Not set'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Address
            </Text>
            <View style={styles.fieldRow}>
              <MapPin size={16} color="#4294ff" style={styles.fieldIcon} />
              {isEditing ? (
                <TextInput 
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.card, 
                      color: colors.text,
                      borderColor: colors.border,
                      flex: 1,
                      height: 80,
                      textAlignVertical: 'top',
                      paddingTop: 10
                    }
                  ]}
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={3}
                />
              ) : (
                <Text style={[styles.fieldValue, { color: colors.text }]}>
                  {address || 'Not set'}
                </Text>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notification Settings
          </Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={() => router.push('/notification-settings')}
          >
            <View style={styles.settingLeft}>
              <Bell size={20} color="#4294ff" style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                Notification Preferences
              </Text>
            </View>
            <ArrowLeft size={20} color={colors.textSecondary} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: '#FF6B6B' }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF6B6B" />
          <Text style={[styles.logoutText, { color: '#FF6B6B' }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: 8,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});
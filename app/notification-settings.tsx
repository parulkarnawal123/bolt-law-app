import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, BookOpen, Heart, Tag, Clock } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function NotificationSettingsScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    updates: true,
    newBooks: true,
    favorites: true,
    tags: true,
    reminders: false,
    marketing: false,
  });
  
  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
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
          Notification Settings
        </Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            General Notifications
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
                <Bell size={20} color="#4294ff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  App Updates
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Receive notifications about app updates and new features
                </Text>
              </View>
            </View>
            <Switch
              value={settings.updates}
              onValueChange={() => toggleSetting('updates')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
                <BookOpen size={20} color="#4294ff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  New Books
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Get notified when new law books are added
                </Text>
              </View>
            </View>
            <Switch
              value={settings.newBooks}
              onValueChange={() => toggleSetting('newBooks')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
        </View>
        
        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Updates
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#ffe6e6' }]}>
                <Heart size={20} color="#FF6B6B" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Favorites
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Updates about your favorite sections
                </Text>
              </View>
            </View>
            <Switch
              value={settings.favorites}
              onValueChange={() => toggleSetting('favorites')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#e6fff0' }]}>
                <Tag size={20} color="#10B981" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Tags
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Notifications about tagged sections
                </Text>
              </View>
            </View>
            <Switch
              value={settings.tags}
              onValueChange={() => toggleSetting('tags')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#fff0e6' }]}>
                <Clock size={20} color="#FF9F43" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Reading Reminders
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Daily reminders to continue reading
                </Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={() => toggleSetting('reminders')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Marketing
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
                <Bell size={20} color="#4294ff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Promotional Emails
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Receive updates about special offers
                </Text>
              </View>
            </View>
            <Switch
              value={settings.marketing}
              onValueChange={() => toggleSetting('marketing')}
              trackColor={{ false: colors.border, true: '#4294ff' }}
              thumbColor="white"
            />
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
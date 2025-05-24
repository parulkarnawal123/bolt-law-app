import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users, BookOpen, Shield, Globe } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AboutScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  
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
          About Us
        </Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg' }}
          style={styles.heroImage}
        />
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Our Mission
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            To make Indian law accessible, understandable, and actionable for everyone. We believe that legal knowledge should not be confined to courtrooms and law offices but should be readily available to all citizens.
          </Text>
        </View>
        
        <View style={styles.features}>
          <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <BookOpen size={24} color="#4294ff" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Comprehensive Library
            </Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Access to all major Indian law books and legal documents
            </Text>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <Users size={24} color="#4294ff" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Expert Team
            </Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Curated by experienced legal professionals and scholars
            </Text>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <Shield size={24} color="#4294ff" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Trusted Content
            </Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Verified and up-to-date legal information
            </Text>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <Globe size={24} color="#4294ff" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Accessible Anywhere
            </Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Available on web and mobile platforms
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Our Story
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            Founded in 2025, Indian Law Library emerged from a simple yet powerful idea: to democratize access to legal information in India. Our team of legal experts, technologists, and educators came together to create a platform that makes understanding Indian law simpler and more accessible than ever before.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Our Impact
          </Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#4294ff' }]}>1M+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Active Users
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#4294ff' }]}>50+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Law Books
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#4294ff' }]}>24/7</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Support
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: '#4294ff' }]}
          onPress={() => router.push('/contact')}
        >
          <Text style={styles.contactButtonText}>Contact Us</Text>
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
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: '1%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  contactButton: {
    margin: 24,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
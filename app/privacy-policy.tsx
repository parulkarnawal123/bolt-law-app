import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PrivacyPolicyScreen() {
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
          Privacy Policy
        </Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Introduction
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            This Privacy Policy explains how Indian Law Library ("we," "us," or "our") collects, uses, and protects your personal information when you use our mobile application and website (collectively, the "Service").
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Information We Collect
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text }]}>
            Personal Information
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We collect information that you provide directly to us, including:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Name and contact information
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Account credentials
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Profile information
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Communication preferences
            </Text>
          </View>
          
          <Text style={[styles.sectionSubtitle, { color: colors.text }]}>
            Usage Information
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We automatically collect certain information about your device and how you interact with our Service, including:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Device information
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Log data
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Usage statistics
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Performance data
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How We Use Your Information
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We use the information we collect to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Provide and maintain our Service
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Personalize your experience
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Improve our Service
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Communicate with you
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Ensure security and prevent fraud
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Data Security
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Rights
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            You have the right to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Access your personal information
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Correct inaccurate data
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Request deletion of your data
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Object to data processing
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.textSecondary }]}>
              • Request data portability
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Contact Us
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: '#4294ff' }]}
            onPress={() => router.push('/contact')}
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Last updated: April 15, 2025
          </Text>
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
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoints: {
    marginLeft: 8,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 8,
  },
  contactButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
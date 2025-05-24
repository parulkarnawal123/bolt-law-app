import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ContactScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      if (Platform.OS === 'web') {
        alert('Please fill in all fields');
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
      return;
    }
    
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      if (Platform.OS === 'web') {
        alert('Message sent successfully!');
      } else {
        Alert.alert('Success', 'Message sent successfully!');
      }
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
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
          Contact Us
        </Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <Mail size={24} color="#4294ff" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                Email Us
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                support@indianlawlibrary.com
              </Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <Phone size={24} color="#4294ff" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                Call Us
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                +91 1800-123-4567
              </Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#e6ecff' }]}>
              <MapPin size={24} color="#4294ff" />
            </View>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                Visit Us
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                123 Legal Street, New Delhi, India
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={[styles.formTitle, { color: colors.text }]}>
            Send us a Message
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Your Name
            </Text>
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
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Email Address
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Subject
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter subject"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Message
            </Text>
            <TextInput
              style={[
                styles.textArea,
                { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              { 
                backgroundColor: '#4294ff',
                opacity: sending ? 0.7 : 1
              }
            ]}
            onPress={handleSubmit}
            disabled={sending}
          >
            <Text style={styles.submitButtonText}>
              {sending ? 'Sending...' : 'Send Message'}
            </Text>
            <Send size={20} color="white" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
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
    padding: 16,
  },
  contactInfo: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  formContainer: {
    paddingTop: 16,
  },
  formTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 120,
  },
  submitButton: {
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
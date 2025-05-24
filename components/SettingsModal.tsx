import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { X, Minus, Plus, AlignLeft, AlignCenter, AlignRight } from 'lucide-react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (height: number) => void;
  textAlign: string;
  setTextAlign: (align: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  colors: any;
}

export default function SettingsModal({
  visible,
  onClose,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  textAlign,
  setTextAlign,
  textColor,
  setTextColor,
  colors
}: SettingsModalProps) {
  const fontSizeMin = 12;
  const fontSizeMax = 24;
  const lineHeightMin = 1.2;
  const lineHeightMax = 2.0;
  
  const colorOptions = [
    { label: 'Default', value: colors.text },
    { label: 'Dark', value: '#333333' },
    { label: 'Black', value: '#000000' },
    { label: 'Blue', value: '#1A73E8' },
    { label: 'Sepia', value: '#5B4636' },
  ];
  
  const resetSettings = () => {
    setFontSize(16);
    setLineHeight(1.5);
    setTextAlign('left');
    setTextColor(colors.text);
  };
  
  const handleFontSizeChange = (increase: boolean) => {
    if (increase && fontSize < fontSizeMax) {
      setFontSize(fontSize + 1);
    } else if (!increase && fontSize > fontSizeMin) {
      setFontSize(fontSize - 1);
    }
  };
  
  const handleLineHeightChange = (increase: boolean) => {
    if (increase && lineHeight < lineHeightMax) {
      setLineHeight(parseFloat((lineHeight + 0.1).toFixed(1)));
    } else if (!increase && lineHeight > lineHeightMin) {
      setLineHeight(parseFloat((lineHeight - 0.1).toFixed(1)));
    }
  };
  
  if (Platform.OS === 'web' && !visible) {
    return null;
  }
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Reading Settings
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.settingsContainer}>
            {/* Font Size */}
            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Font Size
              </Text>
              <View style={styles.settingControls}>
                <TouchableOpacity 
                  style={[
                    styles.controlButton, 
                    { 
                      backgroundColor: colors.background,
                      opacity: fontSize <= fontSizeMin ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handleFontSizeChange(false)}
                  disabled={fontSize <= fontSizeMin}
                >
                  <Minus size={20} color={colors.text} />
                </TouchableOpacity>
                
                <Text style={[styles.controlValue, { color: colors.text }]}>
                  {fontSize}px
                </Text>
                
                <TouchableOpacity 
                  style={[
                    styles.controlButton, 
                    { 
                      backgroundColor: colors.background,
                      opacity: fontSize >= fontSizeMax ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handleFontSizeChange(true)}
                  disabled={fontSize >= fontSizeMax}
                >
                  <Plus size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Line Spacing */}
            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Line Spacing
              </Text>
              <View style={styles.settingControls}>
                <TouchableOpacity 
                  style={[
                    styles.controlButton, 
                    { 
                      backgroundColor: colors.background,
                      opacity: lineHeight <= lineHeightMin ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handleLineHeightChange(false)}
                  disabled={lineHeight <= lineHeightMin}
                >
                  <Minus size={20} color={colors.text} />
                </TouchableOpacity>
                
                <Text style={[styles.controlValue, { color: colors.text }]}>
                  {lineHeight.toFixed(1)}
                </Text>
                
                <TouchableOpacity 
                  style={[
                    styles.controlButton, 
                    { 
                      backgroundColor: colors.background,
                      opacity: lineHeight >= lineHeightMax ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handleLineHeightChange(true)}
                  disabled={lineHeight >= lineHeightMax}
                >
                  <Plus size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Text Alignment */}
            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Text Alignment
              </Text>
              <View style={styles.alignmentControls}>
                <TouchableOpacity 
                  style={[
                    styles.alignButton, 
                    { 
                      backgroundColor: textAlign === 'left' ? '#4294ff' : colors.background
                    }
                  ]}
                  onPress={() => setTextAlign('left')}
                >
                  <AlignLeft size={20} color={textAlign === 'left' ? 'white' : colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.alignButton, 
                    { 
                      backgroundColor: textAlign === 'center' ? '#4294ff' : colors.background
                    }
                  ]}
                  onPress={() => setTextAlign('center')}
                >
                  <AlignCenter size={20} color={textAlign === 'center' ? 'white' : colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.alignButton, 
                    { 
                      backgroundColor: textAlign === 'right' ? '#4294ff' : colors.background
                    }
                  ]}
                  onPress={() => setTextAlign('right')}
                >
                  <AlignRight size={20} color={textAlign === 'right' ? 'white' : colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Text Color */}
            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Text Color
              </Text>
              <View style={styles.colorOptions}>
                {colorOptions.map(option => (
                  <TouchableOpacity 
                    key={option.value}
                    style={[
                      styles.colorOption,
                      { 
                        backgroundColor: option.value,
                        borderColor: textColor === option.value ? '#4294ff' : 'transparent',
                      }
                    ]}
                    onPress={() => setTextColor(option.value)}
                  />
                ))}
              </View>
            </View>
            
            {/* Reset Settings */}
            <TouchableOpacity 
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={resetSettings}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                Reset to Default Settings
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingGroup: {
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  settingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 140,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  alignmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignButton: {
    width: 50,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  resetButton: {
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  resetButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});
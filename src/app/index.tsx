import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type Screen = 'onboarding' | 'sendAlert' | 'reportForm';
type YesNo = 'yes' | 'no' | null;

const COLORS = {
  red: '#D32F2F',
  redDark: '#B71C1C',
  white: '#FFFFFF',
  yellow: '#FFEB3B',
  textDark: '#1A1A1A',
  textMuted: '#666666',
  placeholder: '#A0A0A0',
  inputBg: '#F5F5F5',
  inputBorder: '#E0E0E0',
} as const;

const MISSION_TEXT =
  'Track a Gun gives everyone the opportunity to inform others of the presence of a gun nearby. Using crowdsourcing, the general public can work together by sharing vital data that could possibly prevent unnecessary death and reduce gun violence.';

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (next: YesNo) => void;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.yesNoRow}>
        {(['yes', 'no'] as const).map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={({ pressed }) => [
                styles.yesNoButton,
                selected && styles.yesNoButtonSelected,
                pressed && styles.buttonPressed,
              ]}>
              <Text style={[styles.yesNoText, selected && styles.yesNoTextSelected]}>
                {option === 'yes' ? 'Yes' : 'No'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  const [location, setLocation] = useState('');
  const [weaponDescription, setWeaponDescription] = useState('');
  const [situationDescription, setSituationDescription] = useState('');
  const [isSafe, setIsSafe] = useState<YesNo>(null);
  const [canTakePicture, setCanTakePicture] = useState<YesNo>(null);

  const resetForm = () => {
    setLocation('');
    setWeaponDescription('');
    setSituationDescription('');
    setIsSafe(null);
    setCanTakePicture(null);
  };

  const openReportForm = () => {
    resetForm();
    setCurrentScreen('reportForm');
  };

  const handleFormSubmit = () => {
    if (!location.trim()) {
      Alert.alert('Missing Location', 'Please specify your location so nearby users are alerted.');
      return;
    }

    resetForm();
    setCurrentScreen('sendAlert');
    Alert.alert('Alert Active', 'Your alert has been processed and shared successfully.');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar style="light" />

      {currentScreen === 'onboarding' && (
        <View style={styles.screenContent}>
          <View style={styles.onboardingBody}>
            <Text style={styles.accentEyebrow}>TRACK A GUN</Text>
            <Text style={styles.heroHeader}>OUR MISSION</Text>
            <View style={styles.missionDivider} />
            <Text style={styles.missionText}>{MISSION_TEXT}</Text>
          </View>

          <Pressable
            onPress={() => setCurrentScreen('sendAlert')}
            style={({ pressed }) => [styles.enterButton, pressed && styles.buttonPressed]}>
            <Text style={styles.enterButtonText}>ENTER APP</Text>
          </Pressable>
        </View>
      )}

      {currentScreen === 'sendAlert' && (
        <View style={styles.screenContent}>
          <View style={styles.sendAlertHeader}>
            <Text style={styles.accentEyebrow}>EMERGENCY ALERT</Text>
            <Text style={styles.sendAlertTitle}>I SEE A GUN</Text>
            <Text style={styles.sendAlertSubtitle}>
              Tap below to immediately notify everyone nearby
            </Text>
          </View>

          <View style={styles.alertButtonWrapper}>
            <View style={styles.alertButtonRing}>
              <Pressable
                onPress={openReportForm}
                style={({ pressed }) => [
                  styles.alertButton,
                  pressed && styles.alertButtonPressed,
                ]}>
                <Text style={styles.alertButtonText}>SEND</Text>
                <Text style={styles.alertButtonText}>ALERT</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {currentScreen === 'reportForm' && (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
          <ScrollView
            contentContainerStyle={styles.formScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>DO YOU SEE A GUN?</Text>
              <Text style={styles.cardSubheader}>Share details to help keep others safe</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Where are you?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Science Building Lobby"
                  placeholderTextColor={COLORS.placeholder}
                  value={location}
                  onChangeText={setLocation}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Describe weapon/carrying weapon</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="e.g., Handgun in holster, rifle"
                  placeholderTextColor={COLORS.placeholder}
                  value={weaponDescription}
                  onChangeText={setWeaponDescription}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Describe live situation</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="e.g., Confrontation in main entrance"
                  placeholderTextColor={COLORS.placeholder}
                  value={situationDescription}
                  onChangeText={setSituationDescription}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <YesNoField label="Are you safe?" value={isSafe} onChange={setIsSafe} />
              <YesNoField
                label="Can you take a picture?"
                value={canTakePicture}
                onChange={setCanTakePicture}
              />

              <Pressable
                onPress={handleFormSubmit}
                style={({ pressed }) => [styles.submitButton, pressed && styles.buttonPressed]}>
                <Text style={styles.submitButtonText}>Send</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.red,
  },
  flex: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  onboardingBody: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  accentEyebrow: {
    color: COLORS.yellow,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroHeader: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 16,
  },
  missionDivider: {
    height: 4,
    backgroundColor: COLORS.yellow,
    width: 64,
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 24,
  },
  missionText: {
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  enterButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  enterButtonText: {
    color: COLORS.redDark,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sendAlertHeader: {
    alignItems: 'center',
    marginTop: 40,
  },
  sendAlertTitle: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 8,
  },
  sendAlertSubtitle: {
    color: COLORS.white,
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 22,
  },
  alertButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButtonRing: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButton: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: COLORS.red,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  alertButtonPressed: {
    backgroundColor: '#EAEAEA',
    transform: [{ scale: 0.96 }],
  },
  alertButtonText: {
    color: COLORS.red,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 32,
  },
  formScroll: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    color: COLORS.red,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  cardSubheader: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textDark,
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 12,
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoButton: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  yesNoButtonSelected: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  yesNoText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '700',
  },
  yesNoTextSelected: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

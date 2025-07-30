import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { BlurView } from 'expo-blur';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function MembershipCard() {
  // All useState hooks first
  const [qrValue, setQrValue] = useState('user-id-12345-abcde');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // All useSharedValue hooks
  const cardScale = useSharedValue(1);
  const qrOpacity = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  // All other hooks
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // All useEffect hooks
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Animated styles (these use hooks internally but are stable)
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const qrAnimatedStyle = useAnimatedStyle(() => ({
    opacity: qrOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  // Functions
  const refreshQRCode = () => {
    console.log('Button pressed!'); // Debug log
    setIsRefreshing(true);
    
    // Animate button press
    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Animate QR code fade out and in
    qrOpacity.value = withSequence(
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 200 }, () => {
        runOnJS(setIsRefreshing)(false);
      })
    );

    // Generate new QR code value with timestamp
    setTimeout(() => {
      const timestamp = Math.floor(Date.now() / 1000);
      setQrValue(`user-id-12345-abcde-${timestamp}`);
      console.log('QR code updated:', `user-id-12345-abcde-${timestamp}`); // Debug log
    }, 200);
  };

  // Early return AFTER all hooks have been called
  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a', '#2a2a2a']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#2a2a2a']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Membership</Text>
        <Text style={styles.headerSubtitle}>Premium Access Card</Text>
      </View>

      {/* Membership Card */}
      <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardTitle}>MEMBERSHIP CARD</Text>
              <View style={styles.platinumBadge}>
                <Text style={styles.platinumText}>PLATINUM</Text>
              </View>
            </View>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>M</Text>
              </View>
            </View>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitials}>AR</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.memberName}>Alex Ray</Text>
              <Text style={styles.memberLevel}>Platinum Member</Text>
              <Text style={styles.memberId}>ID: 12345</Text>
            </View>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Scan for Access</Text>
            <Animated.View style={[styles.qrContainer, qrAnimatedStyle]}>
              <View style={styles.qrCodeWrapper}>
                <QRCode
                  value={qrValue}
                  size={120}
                  backgroundColor="transparent"
                  color="#FFD700"
                />
              </View>
            </Animated.View>
            <Text style={styles.qrInfo}>Present this code at partner locations</Text>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <Text style={styles.validText}>Valid through 12/2025</Text>
            <View style={styles.securityChip}>
              <View style={styles.chip} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Refresh Button - Wrapped in Animated.View for animation and separated visually */}
      <Animated.View style={[styles.refreshButton, buttonAnimatedStyle, { marginTop: 20 }]}> 
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={refreshQRCode}
          disabled={isRefreshing}
        >
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.refreshButtonGradient}
          >
            <Text style={styles.refreshButtonText}>
              {isRefreshing ? 'Refreshing...' : 'Refresh QR Code'}
            </Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <Text style={styles.infoText}>
          Your membership card is secured with dynamic QR codes
        </Text>
        <Text style={styles.infoSubtext}>
          Tap refresh to generate a new access token
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    color: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    textAlign: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginBottom: 40,
  },
  cardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#888888',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  platinumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  platinumText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    letterSpacing: 1,
  },
  logoContainer: {
    marginLeft: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  profileInitials: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFD700',
  },
  profileInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  memberLevel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFD700',
    marginBottom: 2,
  },
  memberId: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  qrLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    marginBottom: 12,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  qrInfo: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    textAlign: 'center',
    maxWidth: 200,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 16,
  },
  validText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  securityChip: {
    width: 30,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    width: 16,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#FFD700',
  },
  refreshButton: {
    width: CARD_WIDTH * 0.8,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999,
    position: 'relative',
  },
  refreshButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  refreshButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    letterSpacing: 0.5,
  },
  bottomInfo: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 32,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    textAlign: 'center',
    lineHeight: 16,
  },
});
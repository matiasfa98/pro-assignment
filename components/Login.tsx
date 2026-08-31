
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import { UserContext } from '@/context/context';

export default function Login() {
  const { users, setUserId } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // ANIMATION VALUES
  // --------------------------------------------------

  const cardX = useSharedValue(0);
  const cardY = useSharedValue(0);

  const buttonScale = useSharedValue(1);

  const passwordScale = useSharedValue(1);

  const emailFocus = useSharedValue(0);
  const passwordFocus = useSharedValue(0);

  const glowX = useSharedValue(0);
  const glowY = useSharedValue(0);

  // --------------------------------------------------
  // CARD GESTURE
  // --------------------------------------------------

  const cardGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Make the card movement subtle.
      cardX.value = event.translationX * 0.08;
      cardY.value = event.translationY * 0.04;

      // Background glow follows the finger.
      glowX.value = event.translationX * 0.25;
      glowY.value = event.translationY * 0.15;
    })
    .onEnd(() => {
      cardX.value = withSpring(0, {
        damping: 14,
        stiffness: 120,
      });

      cardY.value = withSpring(0, {
        damping: 14,
        stiffness: 120,
      });

      glowX.value = withSpring(0);
      glowY.value = withSpring(0);
    });

  // --------------------------------------------------
  // CARD ANIMATION
  // --------------------------------------------------

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      cardX.value,
      [-20, 20],
      [-1.5, 1.5]
    );

    return {
      transform: [
        {
          translateX: cardX.value,
        },
        {
          translateY: cardY.value,
        },
        {
          rotateZ: `${rotate}deg`,
        },
      ],
    };
  });

  // --------------------------------------------------
  // BACKGROUND GLOW
  // --------------------------------------------------

  const glowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: glowX.value,
        },
        {
          translateY: glowY.value,
        },
      ],
    };
  });

  // --------------------------------------------------
  // BUTTON ANIMATION
  // --------------------------------------------------

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: buttonScale.value,
        },
      ],
    };
  });

  const buttonGesture = Gesture.Tap()
    .onBegin(() => {
      buttonScale.value = withSpring(0.96, {
        damping: 12,
        stiffness: 300,
      });
    })
    .onFinalize(() => {
      buttonScale.value = withSpring(1, {
        damping: 10,
        stiffness: 250,
      });
    });

  // --------------------------------------------------
  // PASSWORD BUTTON ANIMATION
  // --------------------------------------------------

  const passwordAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: passwordScale.value,
        },
      ],
    };
  });

  const togglePassword = () => {
    passwordScale.value = withSpring(0.85, {
      damping: 10,
      stiffness: 300,
    });

    setTimeout(() => {
      passwordScale.value = withSpring(1);
    }, 80);

    setShowPassword((previous) => !previous);
  };

  // --------------------------------------------------
  // INPUT FOCUS ANIMATIONS
  // --------------------------------------------------

  const emailAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: emailFocus.value
        ? '#555'
        : '#242424',
      backgroundColor: emailFocus.value
        ? '#181818'
        : '#151515',
    };
  });

  const passwordFocusAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: passwordFocus.value
        ? '#555'
        : '#242424',
      backgroundColor: passwordFocus.value
        ? '#181818'
        : '#151515',
    };
  });

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const handleLogin = () => {
    if (loading) return;

    setLoading(true);

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    setTimeout(() => {
      if (!user) {
        console.log('login failed try again');
        setLoading(false);
        return;
      }

      setUserId(user.id);

      console.log('user is', user.id);

      setLoading(false);
    }, 800);
  };

  // --------------------------------------------------
  // SCREEN
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>

      {/* --------------------------------------------- */}
      {/* BACKGROUND */}
      {/* --------------------------------------------- */}

      <Animated.View
        style={[
          styles.backgroundCircleOne,
          glowAnimatedStyle,
        ]}
      />

      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.backgroundCircleTwo}
      />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        style={styles.keyboard}
      >

        <View style={styles.content}>

          {/* ----------------------------------------- */}
          {/* LOGO */}
          {/* ----------------------------------------- */}

          <Animated.View
            entering={FadeInDown
              .duration(700)
              .easing(Easing.out(Easing.cubic))}
            style={styles.logoContainer}
          >

            <Animated.View
              entering={FadeIn
                .delay(250)
                .duration(600)}
              style={styles.logo}
            >
              <Text style={styles.logoText}>
                F
              </Text>
            </Animated.View>

            <Animated.Text
              entering={FadeIn
                .delay(450)
                .duration(700)}
              style={styles.brand}
            >
              FEVEN
            </Animated.Text>

          </Animated.View>

          {/* ----------------------------------------- */}
          {/* HEADING */}
          {/* ----------------------------------------- */}

          <Animated.View
            entering={FadeInUp
              .delay(250)
              .duration(700)
              .easing(Easing.out(Easing.cubic))}
            style={styles.heading}
          >

            <Text style={styles.title}>
              Welcome back.
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue your journey.
            </Text>

          </Animated.View>

          {/* ----------------------------------------- */}
          {/* LOGIN CARD */}
          {/* ----------------------------------------- */}

          <GestureDetector gesture={cardGesture}>

            <Animated.View
              entering={FadeInUp
                .delay(400)
                .duration(800)
                .easing(Easing.out(Easing.cubic))}
              style={[
                styles.card,
                cardAnimatedStyle,
              ]}
            >

              {/* EMAIL */}

              <Animated.View
                entering={FadeInUp
                  .delay(550)
                  .duration(600)}
                style={styles.inputContainer}
              >

                <Text style={styles.label}>
                  EMAIL
                </Text>

                <Animated.View
                  style={[
                    styles.inputWrapper,
                    emailAnimatedStyle,
                  ]}
                >

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onFocus={() => {
                      emailFocus.value =
                        withTiming(1, {
                          duration: 200,
                        });
                    }}
                    onBlur={() => {
                      emailFocus.value =
                        withTiming(0, {
                          duration: 200,
                        });
                    }}
                  />

                </Animated.View>

              </Animated.View>

              {/* PASSWORD */}

              <Animated.View
                entering={FadeInUp
                  .delay(650)
                  .duration(600)}
                style={styles.inputContainer}
              >

                <Text style={styles.label}>
                  PASSWORD
                </Text>

                <Animated.View
                  style={[
                    styles.passwordRow,
                    passwordFocusAnimatedStyle,
                  ]}
                >

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                    onFocus={() => {
                      passwordFocus.value =
                        withTiming(1, {
                          duration: 200,
                        });
                    }}
                    onBlur={() => {
                      passwordFocus.value =
                        withTiming(0, {
                          duration: 200,
                        });
                    }}
                  />

                  <Pressable
                    onPress={togglePassword}
                    hitSlop={10}
                  >

                    <Animated.Text
                      style={[
                        styles.show,
                        passwordAnimatedStyle,
                      ]}
                    >
                      {showPassword
                        ? 'HIDE'
                        : 'SHOW'}
                    </Animated.Text>

                  </Pressable>

                </Animated.View>

              </Animated.View>

              {/* FORGOT PASSWORD */}

              <Animated.View
                entering={FadeIn
                  .delay(750)
                  .duration(500)}
              >

                <Pressable
                  style={styles.forgot}
                >

                  <Text style={styles.forgotText}>
                    Forgot password?
                  </Text>

                </Pressable>

              </Animated.View>

              {/* SIGN IN BUTTON */}

              <Animated.View
                entering={FadeInUp
                  .delay(800)
                  .duration(600)}
              >

                <GestureDetector
                  gesture={buttonGesture}
                >

                  <Animated.View
                    style={[
                      buttonAnimatedStyle,
                    ]}
                  >

                    <Pressable
                      onPress={handleLogin}
                      disabled={loading}
                      style={styles.loginButton}
                    >

                      {loading ? (

                        <ActivityIndicator
                          color="#050505"
                        />

                      ) : (

                        <>
                          <Text
                            style={styles.loginText}
                          >
                            SIGN IN
                          </Text>

                          <Text
                            style={styles.arrow}
                          >
                            →
                          </Text>
                        </>

                      )}

                    </Pressable>

                  </Animated.View>

                </GestureDetector>

              </Animated.View>

            </Animated.View>

          </GestureDetector>

          {/* ----------------------------------------- */}
          {/* SIGN UP */}
          {/* ----------------------------------------- */}

          <Animated.View
            entering={FadeInUp
              .delay(950)
              .duration(700)}
            style={styles.signup}
          >

            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <Pressable>

              <Text style={styles.signupLink}>
                {' '}Create one
              </Text>

            </Pressable>

          </Animated.View>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    overflow: 'hidden',
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  // -----------------------------------------------
  // BACKGROUND
  // -----------------------------------------------

  backgroundCircleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#161616',
    top: -130,
    right: -110,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#111',
    bottom: -110,
    left: -110,
  },

  // -----------------------------------------------
  // LOGO
  // -----------------------------------------------

  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,

    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  logoText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#050505',
  },

  brand: {
    color: '#777',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 5,
  },

  // -----------------------------------------------
  // HEADING
  // -----------------------------------------------

  heading: {
    marginBottom: 26,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },

  subtitle: {
    color: '#777',
    fontSize: 15,
    marginTop: 8,
  },

  // -----------------------------------------------
  // CARD
  // -----------------------------------------------

  card: {
    backgroundColor: '#0d0d0d',
    borderWidth: 1,
    borderColor: '#202020',
    borderRadius: 24,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 10,
  },

  // -----------------------------------------------
  // INPUT
  // -----------------------------------------------

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    color: '#666',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 9,
  },

  inputWrapper: {
    height: 52,
    borderRadius: 13,
    borderWidth: 1,
    overflow: 'hidden',
  },

  input: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 15,
  },

  // -----------------------------------------------
  // PASSWORD
  // -----------------------------------------------

  passwordRow: {
    height: 52,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 14,
    overflow: 'hidden',
  },

  passwordInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },

  show: {
    color: '#888',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // -----------------------------------------------
  // FORGOT
  // -----------------------------------------------

  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  forgotText: {
    color: '#888',
    fontSize: 12,
  },

  // -----------------------------------------------
  // LOGIN BUTTON
  // -----------------------------------------------

  loginButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  loginText: {
    color: '#050505',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },

  arrow: {
    color: '#050505',
    fontSize: 20,
    fontWeight: '600',
  },

  // -----------------------------------------------
  // SIGN UP
  // -----------------------------------------------

  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  signupText: {
    color: '#555',
    fontSize: 13,
  },

  signupLink: {
    color: '#ddd',
    fontSize: 13,
    fontWeight: '700',
  },

});


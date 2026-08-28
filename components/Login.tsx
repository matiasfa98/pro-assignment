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

import { UserContext } from '@/context/context';

export default function Login() {
//   const users = useContext(UserContext);
  const { users, setUserId } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
       

        <View style={styles.content}>

          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>F</Text>
            </View>

            <Text style={styles.brand}>FEVEN</Text>
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Welcome back.</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your journey.
            </Text>
          </View>

          <View style={styles.card}>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>

              <View style={styles.passwordRow}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showPassword}
                  style={styles.passwordInput}
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.show}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.forgot}>
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#050505" />
              ) : (
                <>
                  <Text style={styles.loginText}>SIGN IN</Text>
                  <Text style={styles.arrow}>→</Text>
                </>
              )}
            </Pressable>

          </View>

          <View style={styles.signup}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <Pressable>
              <Text style={styles.signupLink}> Create one</Text>
            </Pressable>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#161616',
    top: -120,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#111',
    bottom: -100,
    left: -100,
  },

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

  card: {
    backgroundColor: '#0d0d0d',
    borderWidth: 1,
    borderColor: '#202020',
    borderRadius: 24,
    padding: 20,
  },

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

  input: {
    height: 52,
    backgroundColor: '#151515',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#242424',
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 15,
  },

  passwordRow: {
    height: 52,
    backgroundColor: '#151515',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#242424',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 14,
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

  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  forgotText: {
    color: '#888',
    fontSize: 12,
  },

  loginButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
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
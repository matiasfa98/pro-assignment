import { StyleSheet, Text, View } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FEVEN</Text>
      <Text style={styles.subtitle}>Connect. Create. Discover.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 6,
  },

  subtitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 12,
    letterSpacing: 2,
  },
});

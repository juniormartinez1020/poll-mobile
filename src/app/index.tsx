import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
     <Text style={styles.container}>
      welcome to my app polls lets go ✔❤🐱‍🚀🧤
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

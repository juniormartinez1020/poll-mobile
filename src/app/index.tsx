import { Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const polls = [1, 2, 3]

export default function HomeScreen() {
  return (
    <>
    <Stack.Screen 
    options={{ title: 'Polls'}}
    />
      <FlatList
      data={polls}
      contentContainerStyle={styles.container}
      renderItem={() => (
       <View style={styles.pollQuestion}>
         <Text
         style={styles.pollTxt}
         >
          Poll Question ❓
          </Text>
       </View>
      )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5
  },
  pollQuestion: {
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  pollTxt: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

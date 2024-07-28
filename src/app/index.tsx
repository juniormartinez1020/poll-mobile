import { Link, Stack } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const polls = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default function HomeScreen() {
  return (
    <>
    <Stack.Screen 
    options={{ 
      title: 'Polls',
      headerRight: () => (
        <Link href={'/polls/new'}>
         <AntDesign name="plussquareo" size={20} color="gray" />
        </Link>
      )
    }}
    />
      <FlatList
      data={polls}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
      <Link
      style={styles.pollQuestion}
      href={`/polls/${item.id}`}
      >
         <Text
         style={styles.pollTxt}
         >
         {item.id}: Poll Question ❓
          </Text>
      </Link>
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

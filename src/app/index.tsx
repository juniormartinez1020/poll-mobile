import { Link, router, Stack } from 'expo-router';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';


// const polls = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default function HomeScreen() {

  const [polls, setPolls] = useState([])

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('fetching...')

      
   let { data, error } = await supabase
    .from('polls')
     .select('*')

     if (error) {
      Alert.alert('error fetch data.')
     }
     setPolls(data)
    }
    fetchPolls()
  }, [])
  

  return (
    <>
    <Stack.Screen 
    options={{ 
      title: 'Polls',
      headerRight: () => (
      <AntDesign 
      onPress={() => router.push('/polls/new')}
      name="plussquareo" 
      size={20} color="gray" 
      />
      ),
      headerLeft: () => (
        <AntDesign 
        onPress={() => router.push('/profile')}
        name="user" 
        size={20} color="gray" 
        />
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

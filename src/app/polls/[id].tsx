import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Poll } from "@/src/types/db";
import { supabase } from "@/src/lib/supabase";

// const poll = {
//     options: ["Option 1", "Option 2", "Option 3"] // Ejemplo de inicialización correcta
// };

export default function PollDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [poll, setPoll] = useState<Poll>(null)

    const [select, setSelect] = useState('')

    
  useEffect(() => {
    const fetchPolls = async () => {
      console.log('fetching...')

      
   let { data, error } = await supabase
    .from('polls')
     .select('*')
     .eq('id', Number.parseInt(id))
     .single()

     if (error) {
      Alert.alert('error fetch data.')
     }
     setPoll(data)
    }
    fetchPolls()
  }, [])
  

    const choose = () => {
        console.warn('choose ', select)
    }

    if (!poll) {
        return <ActivityIndicator />
    }
   
    return (
        <View style={styles.container}>
            <Stack.Screen 
            options={{ title: 'Poll choosing' }}
            />
            <Text style={styles.question}> 
                {poll.question}
            </Text>


          <View style={{ gap: 5 }}>
          {Array.isArray(poll.options) && poll.options.map((option) => (
      <Pressable
        onPress={() => setSelect(option)}
        key={option}
        style={styles.optContainer}
      >
        <AntDesign
          name={option === select ? "checkcircleo" : "circledown"}
          size={16}
          color={option === select ? 'green' : 'gray'}
        />
        <Text>{option}</Text>
      </Pressable>
       ))}
          </View>

          <Button 
          onPress={choose}
          title="Choose"
          />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 18
    },
    question: {
        fontSize: 20,
        fontWeight: '700'
    },
    optContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})
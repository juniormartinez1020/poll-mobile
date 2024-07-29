import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Poll, Vote } from "@/src/types/db";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";


export default function PollDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [poll, setPoll] = useState<Poll>(null)
    const [userVote, setUserVote] = useState<Vote>(null)

    const [select, setSelect] = useState<string>('')

    const { user } = useAuth()

    
  useEffect(() => {
    const fetchPolls = async () => {     
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

    const fetchUserVote = async () => {
      let { data, error } = await supabase
      .from('votes')
       .select('*')
       .eq('poll_id', Number.parseInt(id))
       .eq('user_id', user?.id)
       .limit(1)
       .single()
  
       if (error) {
        Alert.alert('error fetch user vote.')
       }
       setUserVote(data)
       if (data) {
        setSelect(data.option)
       }
      }
      fetchPolls()
      fetchUserVote()
 }, [])
  

    const choose = async () => {     
      const newVote = { 
        option: select,
        poll_id: poll?.id,
        user_id: user?.id
       }
       if (userVote) {
        newVote.id = userVote.id
       }
         const { data, error } = await supabase
         .from('votes')
         .upsert([newVote])
         .select()
         .single()

         
         if (error) {
          Alert.alert('failed to vote.')
         } else {
          setUserVote(data)
          Alert.alert('thanks for voting.')
         }
        
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
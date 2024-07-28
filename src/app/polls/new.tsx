import { Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";

export default function CreatePoll() {

    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [error, setError] = useState('')

    
    const { user } = useAuth()


    const createPoll = async () => {
        setError('')
        if (!question) {
            setError('please provide the question.')
            return
        }

        const validOption = options.filter(o => !!o)
        if (validOption.length < 2) {
            setError('please provide or least 2 valid options.')
            return
        }

        
          const { data, error } = await supabase
          .from('polls')
          .insert([{ question, options: validOption }])
          .select()
          if (error) {
            Alert.alert('failed to create poll')
            console.log(error)
            return
          }
          router.back()

        
        console.warn('create')
    }

    if (!user) {
        return <Redirect href='/login'/>
    }


    return (
        <View style={styles.container}>
            <Stack.Screen 
            options={{ title: 'Create poll'}}
            />
            <Text style={styles.label}>Text</Text>
            <TextInput
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
            placeholder="Write your question here"
            />

            <Text style={styles.label}>Options</Text>
            
            {options.map((option, index) => (
                <View 
                key={index}
                style={{ justifyContent: 'center' }}
                >
                 <TextInput
                 value={option}
                 onChangeText={(text) => {
                    const update = [...options]
                    update[index] = text
                    setOptions(update)
                 }}
                 style={styles.input}
                placeholder={`Opt 2 ${index + 1}`}
                />
                <AntDesign 
                name="close" 
                size={20} 
                color="gray"
                onPress={() => {
                    // delete option based on index
                    const update = [...options]
                    update.splice(index, 1)
                    setOptions(update)
                }}
                style={{ 
                    position: 'absolute',
                    right: 10
                 }} 
                />
                </View>
            ))}

            <Button
            title="Add option"
            onPress={() => setOptions([...options, ''])}
            />

            <Button
            onPress={createPoll}
            title="Create poll"
            />

            <Text style={{ color: 'crimson' }}>
                {error}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10
    },
    label: {
        fontWeight: '400',
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    }
})
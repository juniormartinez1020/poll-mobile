import { Stack } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function CreatePoll() {

    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])

    const createPoll = () => {
        console.warn('create')
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
                <View style={{ justifyContent: 'center' }}>
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
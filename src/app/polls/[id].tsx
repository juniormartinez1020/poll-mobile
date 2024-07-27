import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

const poll = {
    question: 'Vue JS vs React Vite?',
    options: [
        'Vue JS',
        'React Vite',
        'Next JS'
    ]
}

export default function PollDetails() {
    const { id } = useLocalSearchParams<{ id: String }>()

    const [select, setSelect] = useState('Vue JS')

    const choose = () => {
        console.warn('choose ', select)
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
            {poll.options.map((option) => (
                <Pressable 
                onPress={() => setSelect(option)}
                key={option} 
                style={styles.optContainer}
                >
                    <AntDesign name={
                        option === select ? "checkcircleo" : "circledown"
                        } 
                        size={16} 
                        color={
                            option === select ? 'green' : 'gray'
                        }
                        />
                    <Text>
                        {option}
                    </Text>
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
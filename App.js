import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
    const [health, setHealth] = useState(50);
    const [food, setFood] = useState(50);
    const [hungryText, setHungryText] = useState('');

    //this is going to set the health and set the take away from health/hunger bar. -1.2points/1.25 seconds.
    useEffect(() => {
        const interval = setInterval(() => {
            setHealth(prevfood => (prevfood > 0 ? prevfood - 1.2 : 0));
        }, 1250);
        return () => clearInterval(interval);
    }, []);

    // this is going to set the mood bar . also the take away from mood bar. -2/1.5seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFood(prevmood => (prevmood > 0 ? prevmood - 2 : 0));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    //display message when food bar reachers 0 or low levels.
    useEffect(() => {
        if (food === 0) {
            setHungryText('HUNGRY');
        } else {
            setHungryText('');
        }
    }, [food]);
    //the bar and max limit
    const happypet = () => {
        if (food > 0) {
            setFood(prevmood => (prevmood <= 70 ? Math.min(prevmood + 10, 60) : 70));
            setHungryText('');
        }
    };
    //the bar and max limit
    const petPet = () => {
        setHealth(prevfood => (prevfood <= 70 ? Math.min(prevfood + 10, 60) : 70));
    };

    //image display as well changees depending on the bar level.
    const petImageSource =
        health === 0
            ? require('./images/dead.png')
            : health >= 50
                ? require('./images/happy.png')
                : require('./images/sad.png');

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/main.png')} style={styles.background}>
                <Image source={petImageSource} style={styles.petImage} />
                <Text style={styles.hungryText}>{hungryText}</Text>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={petPet}>
                        <Text style={styles.buttonText}>Feed ME</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={happypet}>
                        <Text style={styles.buttonText}>Pet</Text>
                    </Pressable>
                </View>

                <View style={styles.barContainer}>
                    <Text style={styles.barText}>Health</Text>
                    <View style={[styles.bar, { width: health + '%' }]} />
                </View>

                <View style={styles.barContainer}>
                    <Text style={styles.barText}>MOOD</Text>
                    <View style={[styles.bars, { width: food + '%' }]} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: 500,
    },
    petImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    barText: {
        marginRight: 10,
    },
    bar: {
        height: 20,
        backgroundColor: '#4caf50',
        minWidth: 20,
        borderRadius: 15,
    },

    bars: {
        height: 20,
        backgroundColor: 'blue',
        minWidth: 20,
        borderRadius: 15,
    },
    hungryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
    },
});

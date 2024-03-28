import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ImageBackground } from 'react-native';

export default function App() {
    const [health, setHealth] = useState(50);
    const [food, setFood] = useState(50);

    useEffect(() => {
        const interval = setInterval(() => {
            setHealth(prevHealth => (prevHealth > 0 ? prevHealth - 1.5 : 0)); 
        }, 1250);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const intervaal = setInterval(() => {
            setFood(prevHappyness => (prevHappyness > 0 ? prevHappyness - 2 : 0));
        }, 1000);
        return () => clearInterval(intervaal);
    }, []);

    const feedPet = () => {
        if (food > 0) {
            setFood(prevHappyness => (prevHappyness <= 70 ? prevHappyness + 10 : 0));
        }
    };

    const petPet = () => {
        setHealth(prevHealth => (prevHealth <= 70 ? Math.min(prevHealth + 10, 50) : 70)); 
    };


    const petImageSource = health === 0
        ? require('./images/dead.png')
        : health >= 50
            ? require('./images/happy.png')
            : require('./images/sad.png');


    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/main.png')} style={styles.background}>
            <Image source={petImageSource} style={styles.petImage} />

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={petPet}>
                    <Text style={styles.buttonText}>Feed ME</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={feedPet}>
                    <Text style={styles.buttonText}>pet</Text>
                </Pressable>
            </View>

            <View style={styles.barContainer}>
                <Text style={styles.barText}>Health/FOOD</Text>
                <View style={[styles.bar, { width: health + '%' }]} />
            </View>

            <View style={styles.barContainer}>
                <Text style={styles.barText}>MOOD</Text>
                <View style={[styles.bar, { width: food + '%' }]} />
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
});

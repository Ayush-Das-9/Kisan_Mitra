import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, STRINGS } from '../utils/constants';

interface AudioPlayerProps {
    isSpeaking: boolean;
    onStop: () => void;
}

export default function AudioPlayer({ isSpeaking, onStop }: AudioPlayerProps) {
    if (!isSpeaking) return null;

    return (
        <View style={styles.container}>
            <View style={styles.indicator}>
                <Ionicons name="volume-high" size={24} color={COLORS.primary} />
                <Text style={styles.text}>{STRINGS.speaking}</Text>
                {/* Simple animated dots */}
                <View style={styles.dots}>
                    <View style={[styles.dot, styles.dot1]} />
                    <View style={[styles.dot, styles.dot2]} />
                    <View style={[styles.dot, styles.dot3]} />
                </View>
            </View>
            <TouchableOpacity style={styles.stopButton} onPress={onStop}>
                <Ionicons name="stop-circle" size={28} color={COLORS.error} />
                <Text style={styles.stopText}>{STRINGS.stopSpeaking}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    indicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        fontSize: 16,
        color: COLORS.primaryDark,
        fontWeight: '600',
    },
    dots: {
        flexDirection: 'row',
        gap: 4,
        marginLeft: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
    },
    dot1: { opacity: 1.0 },
    dot2: { opacity: 0.6 },
    dot3: { opacity: 0.3 },
    stopButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    stopText: {
        fontSize: 14,
        color: COLORS.error,
        fontWeight: '500',
    },
});

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS, STRINGS } from '../utils/constants';

interface LoadingSpinnerProps {
    message?: string;
}

export default function LoadingSpinner({
    message = STRINGS.processing,
}: LoadingSpinnerProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        gap: 12,
    },
    text: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: '600',
    },
});

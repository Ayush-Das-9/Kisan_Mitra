import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type ViewStyle,
} from 'react-native';
import { COLORS, NUMPAD_ROWS, STRINGS } from '../utils/constants';

interface NumpadProps {
    value: string;
    onNumberPress: (num: string) => void;
    onClear: () => void;
    onSubmit: () => void;
    disabled?: boolean;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_SIZE = Math.min((SCREEN_WIDTH - 80) / 3, 80);

export default function Numpad({
    value,
    onNumberPress,
    onClear,
    onSubmit,
    disabled = false,
}: NumpadProps) {
    const handlePress = (key: string) => {
        if (disabled) return;
        if (key === 'C') {
            onClear();
        } else if (key === '✓') {
            onSubmit();
        } else {
            onNumberPress(key);
        }
    };

    const getButtonStyle = (key: string): ViewStyle[] => {
        const base: ViewStyle[] = [styles.button];
        if (key === 'C') base.push(styles.clearButton);
        else if (key === '✓') base.push(styles.submitButton);
        else base.push(styles.numberButton);
        if (disabled) base.push(styles.disabledButton);
        return base;
    };

    const getTextStyle = (key: string) => {
        if (key === 'C') return [styles.buttonText, styles.clearText];
        if (key === '✓') return [styles.buttonText, styles.submitText];
        return [styles.buttonText];
    };

    return (
        <View style={styles.container}>
            {/* Display area */}
            <View style={styles.display}>
                <Text style={styles.displayText}>
                    {value || STRINGS.enterNumber}
                </Text>
            </View>

            {/* Numpad grid */}
            {NUMPAD_ROWS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={getButtonStyle(key)}
                            onPress={() => handlePress(key)}
                            disabled={disabled}
                            activeOpacity={0.7}
                        >
                            <Text style={getTextStyle(key)}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    display: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
        alignItems: 'center',
    },
    displayText: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.text,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 12,
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    numberButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    clearButton: {
        backgroundColor: COLORS.error,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 28,
        fontWeight: '600',
        color: COLORS.text,
    },
    clearText: {
        color: COLORS.white,
    },
    submitText: {
        color: COLORS.white,
    },
});

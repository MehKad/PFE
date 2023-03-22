import React from 'react';
import Animated, { Layout, FadeInUp, FadeInDown } from 'react-native-reanimated';

const FadeIn = ({ children }) => {
    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeInUp}
            layout={Layout.stiffness()}
        >
            {children}
        </Animated.View>
    )
}

export default FadeIn;

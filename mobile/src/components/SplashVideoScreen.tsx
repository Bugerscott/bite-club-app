import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useEventListener } from 'expo';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../theme';

export interface SplashVideoScreenProps {
  onFinish: () => void;
}

/**
 * Splash animado de Bite Club.
 * El splash nativo permanece encima hasta que el MP4 renderiza su primer frame,
 * evitando un flash entre la pantalla nativa y la animación React Native.
 */
export function SplashVideoScreen({ onFinish }: SplashVideoScreenProps) {
  const finishedRef = useRef(false);
  const firstFrameRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    SplashScreen.hideAsync().catch(() => {});
    onFinish();
  }, [onFinish]);

  const player = useVideoPlayer(require('../../assets/app/splash-animation.mp4'), (instance) => {
    instance.loop = false;
    instance.muted = true;
    instance.play();
  });

  useEventListener(player, 'playToEnd', finish);

  const handleFirstFrame = useCallback(() => {
    if (firstFrameRef.current) return;
    firstFrameRef.current = true;
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  // Fallback para no bloquear la app si el video no logra reproducirse en un dispositivo.
  useEffect(() => {
    const timeout = setTimeout(finish, 10000);
    return () => clearTimeout(timeout);
  }, [finish]);

  return (
    <View style={styles.container} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
        allowsPictureInPicture={false}
        onFirstFrameRender={handleFirstFrame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

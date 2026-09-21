import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, EmptyState } from '../../src/components';
import { spacing } from '../../src/theme';
import { mockOffers } from '../../src/mocks';

export default function OffersScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        {mockOffers.length === 0 ? (
          <EmptyState
            icon="tag"
            title="Sin ofertas activas"
            description="Las promociones disponibles aparecerán aquí."
          />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: spacing.xxxl,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, EmptyState } from '../../src/components';
import { spacing } from '../../src/theme';
import { mockOffers } from '../../src/mocks';

// Pantalla Ofertas — instrucciones, sección 26: no hay promociones oficiales
// con descuento todavía. No se inventan porcentajes, 2x1, combos, fechas ni
// precios especiales. Se muestra EmptyState mientras mockOffers esté vacío.
export default function OffersScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        {mockOffers.length === 0 ? (
          <EmptyState
            icon="tag"
            title="Todavía no hay ofertas"
            description="Estamos preparando promociones. Vuelve pronto — algo rico está por venir."
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

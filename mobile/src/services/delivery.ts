export type DeliveryDispatchRequest = {
  orderId: string;
  address: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
};

// Delivery Master must be called by a trusted backend/Edge Function, never directly
// from the mobile app with privileged credentials. This client intentionally exposes
// no Delivery Master secret or direct database connection.
export async function requestDeliveryDispatch(_request: DeliveryDispatchRequest): Promise<never> {
  throw new Error('DELIVERY_BACKEND_NOT_CONFIGURED');
}

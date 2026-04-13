export interface LatLng {
  lat: number;
  lng: number;
}

export type Unit = "m" | "km" | "mi" | "nmi";

const EARTH_RADIUS_M = 6_371_008.8;

const UNIT_FACTORS: Record<Unit, number> = {
  m: 1,
  km: 1 / 1000,
  mi: 1 / 1609.344,
  nmi: 1 / 1852,
};

const toRad = (deg: number): number => (deg * Math.PI) / 180;
const toDeg = (rad: number): number => (rad * 180) / Math.PI;

function validate({ lat, lng }: LatLng): void {
  if (lat < -90 || lat > 90) throw new Error("lat out of range");
  if (lng < -180 || lng > 180) throw new Error("lng out of range");
}

export function haversine(a: LatLng, b: LatLng, unit: Unit = "km"): number {
  validate(a);
  validate(b);
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.asin(Math.min(1, Math.sqrt(h)));
  return EARTH_RADIUS_M * c * UNIT_FACTORS[unit];
}

/** Initial bearing in degrees from a to b. */
export function bearing(a: LatLng, b: LatLng): number {
  validate(a);
  validate(b);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Midpoint between two coordinates. */
export function midpoint(a: LatLng, b: LatLng): LatLng {
  validate(a);
  validate(b);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const bx = Math.cos(lat2) * Math.cos(dLng);
  const by = Math.cos(lat2) * Math.sin(dLng);
  const lat = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2),
  );
  const lng = toRad(a.lng) + Math.atan2(by, Math.cos(lat1) + bx);
  return { lat: toDeg(lat), lng: ((toDeg(lng) + 540) % 360) - 180 };
}

export function isWithin(a: LatLng, b: LatLng, radius: number, unit: Unit = "km"): boolean {
  return haversine(a, b, unit) <= radius;
}

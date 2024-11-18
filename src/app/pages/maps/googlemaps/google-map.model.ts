export interface MapConfig {
    lat: number;
    lng: number;
    title?: string;
    zoom?: number;
    markers?: MapConfig[];
    styles?: any[];
    paths?: { lat: number, lng: number }[][]
    ponits?: { lat: number, lng: number }[]
}

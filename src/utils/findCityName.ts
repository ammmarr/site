import { City } from "containers/ListingBusPage/ListingBusPage";

export function cityName(cities: City[], id: number): string | undefined {
    const city = cities.find((city) => city.id === id);
    return city ? city.name : undefined;
}
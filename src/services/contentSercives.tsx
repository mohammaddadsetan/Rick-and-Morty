import axios from "axios";
const URL = "https://rickandmortyapi.com/api";
export function GetLocations() {
  const url = `${URL}/location`;
  return axios.get(url);
}
export function GetCaracters() {
  const url = `${URL}/character`;
  return axios.get(url);
}
export function GetLocationsById(id: number) {
  const url = `${URL}/location/${id}`;
  return axios.get(url);
}

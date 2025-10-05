import axios from "axios";
const URL = "https://rickandmortyapi.com/api";
export function GetLocations() {
  const url = `${URL}/location`;
  return axios.get(url);
}

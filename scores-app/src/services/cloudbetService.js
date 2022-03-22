import axios from "axios";
import { SPORTS, EVENTS, COMPETITIONS } from "../assets/constants/constants";
const API_KEY = `eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MTk1Njk0MTc5OCwiaWF0IjoxNjQxNTgxNzk4LCJqdGkiOiI0NmYxZWVhYi0wYmQwLTQ4ZGEtYmRjOC03MjU4NGUwYjA4M2QiLCJzdWIiOiIxZDIxMDZhYy1iZmM5LTQzYTYtOTM5Ni0zNWIxNTEzMjMxODciLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiIxZDIxMDZhYy1iZmM5LTQzYTYtOTM5Ni0zNWIxNTEzMjMxODcifQ.RNaH28T-I0SoDbfIoS3wnPq3o_CV1KxEUq9FEfynW8BCe_Hih4IVJFon3N1AKC2d95C1wE8-Q2uzG9c7ODxv2AcqQEsOCEMPxXW9tw5wA4AwgfqfoMhgcR10AqZW4B3EmmppF5Mv31lyXmLl8ThaLSg3iDlaf-yH4lrGsu3Wiy_W_xbj5VGgipQw8jdOlto0JnlUsEESZY3tSjk7D0n_4c8sM2s5OJiat0-i-o8E8RYQ28Qo7_MueLtNS4MVQwS-cKPaYg-oj3v6h3TDixkQqBkqjBSNNHrlQYRtZE3lGa4CjFSLR4aO2mHQHOt_3RR5CEM4thq-gH874xWlZ6510A`;
const BASE_URL = "https://sports-api.cloudbet.com/pub/v2/odds";

const config = {
  headers: { "X-API-Key": API_KEY },
};

export const getEvents = async (competitionKey) => {
  return EVENTS;
  //   return axios
  //     .get(`${BASE_URL}/competitions/${competitionKey}`, config)
  //     .then((response) => response.data)
  //     .catch((err) => err);
};

export const getCompetitions = async (sportKey) => {
  return COMPETITIONS;
  //   return axios
  //     .get(`${BASE_URL}/sports/${sportKey}`, config)
  //     .then((response) => response.data)
  //     .catch((ignore) => null);
};

export const getSports = (sportKey) => {
  return SPORTS;
};

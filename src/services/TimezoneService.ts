import { Timezone } from "../store/timezone.slice";

const timezonesJson = require("./timezones.json");

export const fetchTimezonesFromService = async (): Promise<Timezone[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500 - Имитация задержки
    return timezonesJson;
  } catch (error: any) {
    console.error("Error fetching timezones:", error);
    throw new Error("Failed to fetch timezones");
  }
};

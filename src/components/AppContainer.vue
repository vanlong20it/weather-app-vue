<script setup>
import { ref } from "vue";
import DetailList from "./WeatherDetails/DetailList.vue";
import LocationList from "./Locations/LocationList.vue";
import ErrorAlert from "./ErrorAlert.vue";
import { LOCATIONS, convertTemp } from "../helper";
import { fetchWeatherByLocation } from "../service/weather";
import WeatherMainInfo from "./WeatherMainInfo.vue";
import EmptyInfo from "./EmptyInfo.vue";
import Copyright from "./Copyright.vue";
const location = ref("");
const listLocations = ref(LOCATIONS);
const weatherDetails = ref([]);
const weatherCommon = ref(null);
const notFoundError = ref(false);

const handleSearchLocation = async () => {
  try {
    const response = await fetchWeatherByLocation(location.value);
    const data = await response.data;
    const humidity = data.main.humidity; //78
    const wind = data.wind.speed; //6.17
    const cloudy = data.clouds.all; //40
    const temp = data.main.temp; // 301.64
    const name = data.name; // Ho Chi Minh City
    const weather = data.weather[0].main; // Clouds
    const weatherDescription = data.weather[0].description; // Scattered clouds
    const country = data.sys.country; // VN
    const date = new Date(data.dt * 1000); // 1673400152
    const icon = data.weather[0].icon;
    weatherCommon.value = {
      temp: convertTemp(temp),
      country,
      name,
      weather,
      icon,
      description: weatherDescription,
      time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    };

    weatherDetails.value = [
      {
        id: 0,
        title: "Cloudy",
        number: cloudy + "%",
      },
      {
        id: 1,
        title: "Humidity",
        number: humidity + "%",
      },
      {
        id: 2,
        title: "Wind",
        number: wind + "m/s",
      },
    ];
    notFoundError.value = false;
  } catch (error) {
    weatherDetails.value = null;
    weatherCommon.value = null;
    if (error && error.response) {
      if (error.response.data.cod === "404") {
        notFoundError.value = true;
      }
    }
  }
};

const handleSelect = (value) => {
  location.value = value;
  handleSearchLocation();
};
</script>
<template>
  <div
    class="lg:fixed lg:top-0 lg:left-0 px-4 lg:px-4 w-full h-screen lg:bg-[url('../assets/images/weather-bg.jpg')] bg-no-repeat bg-cover bg-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white/20 lg:before:backdrop-blur-xl font-light selection:bg-orange-300"
  >
    <div class="relative w-full h-full">
      <h1 class="text-xl uppercase py-5 lg:text-white">Weather app</h1>
      <div
        class="static lg:absolute lg:top-1/2 lg:left-1/2 lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2 max-w-6xl mx-auto lg:bg-black/50 lg:text-white lg:h-[80vh]"
      >
        <div
          class="relative grid grid-rows-3 lg:grid-rows-2 grid-cols-8 gap-4 h-full"
        >
          <div
            class="col-span-8 lg:col-span-5 row-span-1 lg:row-start-1 lg:row-end-3 p-10 relative"
          >
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 text-center"
            >
              <ErrorAlert v-if="notFoundError" />
              <EmptyInfo v-else-if="!weatherCommon" />
            </div>
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5"
            >
              <WeatherMainInfo :data="weatherCommon" />
            </div>
          </div>
          <div
            class="col-span-8 lg:col-span-3 row-span-1 row-start-1 row-end-2 lg:row-start-1 lg:row-end-2 relative overflow-y-auto"
          >
            <form
              @submit.prevent="handleSearchLocation"
              class="p-10 pr-20 pb-0 relative"
            >
              <div>
                <input
                  type="text"
                  v-model="location"
                  placeholder="Ex: Ho Chi Minh City"
                  class="w-full h-10 border-b border-solid border-black lg:border-white focus:border-orange-600 transition-all bg-transparent focus:outline-none focus:ring-0 outline-none text-black lg:text-white placeholder:text-black lg:placeholder:text-white pr-12"
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 h-20 w-20 flex items-center justify-center bg-orange-400 hover:bg-orange-600 transition-all"
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
              <ul class="bg-black/10">
                <LocationList
                  v-if="listLocations"
                  :list="listLocations"
                  @select="handleSelect"
                />
              </ul>
            </form>
          </div>
          <div
            class="col-span-8 lg:col-span-3 row-span-1 lg:row-start-2 lg:row-end-3"
          >
            <div class="py-5 px-10">
              <DetailList v-if="weatherDetails" :data="weatherDetails" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Copyright />
  </div>
</template>
<style>
.inactive {
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
}
.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0rem);
}
</style>

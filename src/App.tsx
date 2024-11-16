import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimezones } from "./store/timezone.slice";
import { addClock, removeClock } from "./store/clock.slice";
import Clock from "./components/Clock";
import TimezoneSelector from "./components/TimezoneSelector";
import { AppState, AppDispatch } from "./store/store";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clocks = useSelector((state: AppState) => state.clock.clocks);
  const isLoading = useSelector((state: AppState) => state.timezone.isLoading);
  const selectedTimezones = useSelector(
    (state: AppState) => state.timezone.selectedTimezones,
  );

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  const maxClocks = 24; // Ограничение на количество часов - 24 штуки

  return (
    <div className="App">
      <button className="add-button" onClick={() => dispatch(addClock())}>
        Добавить часы
      </button>
      <div className="clocks-container">
        {isLoading ? (
          <p>Загрузка часовых поясов...</p>
        ) : (
          clocks.slice(0, maxClocks).map((clock) => (
            <div key={clock.id}>
              <TimezoneSelector clockId={clock.id} />
              <Clock
                clockId={clock.id}
                timezoneId={selectedTimezones[clock.id]}
              />
              <button
                className="delete-button"
                onClick={() => dispatch(removeClock(clock.id))}
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

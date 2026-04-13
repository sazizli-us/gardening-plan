import { gardenData } from "./data.js";

const fmtShort = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const fmtLong = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

const startDate = new Date(`${gardenData.startDate}T12:00:00`);
const today = new Date();
const rawElapsedDays = Math.floor((today - startDate) / 86400000);
const currentIndex = rawElapsedDays < 0 ? 0 : Math.min(rawElapsedDays, gardenData.days.length - 1);

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function renderPlants() {
  const plantGrid = document.getElementById("plantGrid");
  plantGrid.innerHTML = gardenData.plants
    .map(
      (plant) => `
        <article class="plant-card">
          <span class="card-label">${plant.nickname}</span>
          <h3>${plant.plant}</h3>
          <p class="subtle">${plant.location}</p>
          <p class="subtle">${plant.shortCare}</p>
          <ul>
            ${plant.notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderRoutines() {
  const routineGrid = document.getElementById("routineGrid");
  routineGrid.innerHTML = gardenData.routines
    .map(
      (routine) => `
        <article class="routine-card">
          <span class="card-label">Routine</span>
          <h3>${routine.title}</h3>
          <p class="subtle">${routine.body}</p>
          <ul>
            ${routine.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderForecast() {
  const forecastGrid = document.getElementById("forecastGrid");
  forecastGrid.innerHTML = gardenData.forecast
    .map(
      (entry) => `
        <article class="forecast-card">
          <span class="card-label">Forecast</span>
          <h3>${entry.date}</h3>
          <p class="forecast-meta">${entry.weather}</p>
          <p class="subtle">${entry.action}</p>
        </article>
      `,
    )
    .join("");
}

function renderRules() {
  const rulesGrid = document.getElementById("rulesGrid");
  rulesGrid.innerHTML = gardenData.rules
    .map(
      (rule) => `
        <article class="rule-card">
          <span class="card-label">Rule</span>
          <h3>${rule.title}</h3>
          <p class="subtle">${rule.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderHero() {
  const heroMetrics = document.getElementById("heroMetrics");
  heroMetrics.innerHTML = `
    <span class="metric">${gardenData.location}</span>
    <span class="metric">${gardenData.plants.length} plants</span>
    <span class="metric">Weekday check: 6:15 a.m.</span>
    <span class="metric">30-day starter plan</span>
  `;
}

function renderTodayCard() {
  const todayCard = document.getElementById("todayCard");
  const activeDay = gardenData.days[currentIndex];
  const activeDate = addDays(startDate, currentIndex);
  const currentLabel =
    rawElapsedDays < 0 ? "Starts soon" : rawElapsedDays >= gardenData.days.length ? "Month complete" : "Today";

  todayCard.innerHTML = `
    <span class="today-chip">${currentLabel}</span>
    <h2>Day ${activeDay.day}: ${activeDay.title}</h2>
    <p class="day-date">${fmtLong.format(activeDate)}</p>
    <p class="day-summary">${activeDay.summary}</p>
    <ul>
      ${activeDay.tips.map((tip) => `<li>${tip}</li>`).join("")}
    </ul>
    <div class="note">${activeDay.note}</div>
  `;
}

function renderPlan() {
  const planGrid = document.getElementById("planGrid");
  planGrid.innerHTML = gardenData.days
    .map((day) => {
      const index = day.day - 1;
      const date = addDays(startDate, index);
      const isCurrent = index === currentIndex;

      return `
        <article class="day-card" data-current="${isCurrent}">
          <div class="day-head">
            <div>
              <span class="day-number">Day ${day.day}</span>
              <div class="day-date">${fmtShort.format(date)}</div>
            </div>
          </div>
          <h3>${day.title}</h3>
          <p class="day-summary">${day.summary}</p>
          <ul>
            ${day.tips.map((tip) => `<li>${tip}</li>`).join("")}
          </ul>
          <div class="note">${day.note}</div>
        </article>
      `;
    })
    .join("");
}

function renderSources() {
  const sourcesCard = document.getElementById("sourcesCard");
  sourcesCard.innerHTML = `
    <span class="card-label">References</span>
    <h3>Reputable guides used for this plan</h3>
    <ul class="source-list">
      ${gardenData.sources
        .map(
          (source) =>
            `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>: ${source.note}</li>`,
        )
        .join("")}
    </ul>
  `;
}

renderHero();
renderTodayCard();
renderPlants();
renderRoutines();
renderForecast();
renderRules();
renderPlan();
renderSources();

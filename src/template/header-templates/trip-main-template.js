export function createTripMainTemplate({ totalPrice, date, title }) {
  return (
    `<div class="trip-main">
      <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${title}</h1>
          <p class="trip-info__dates">${date}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice ? totalPrice : ''}</span>
        </p>
      </section>
    </div>`
  );
}

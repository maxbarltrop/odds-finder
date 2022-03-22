const round = (ml) => {
  return Math.round(ml / 10) * 10;
};

const convertFromDecimal = (probability) => {
  if (probability <= 2.0) {
    return -1 * round(100 / (probability - 1));
  }
  return round((probability - 1) * 100);
};

export const getMoneyLines = (markets) => {
  const moneyLine =
    markets["american_football.moneyline"] ||
    markets["basketball.moneyline"] ||
    markets["baseball.moneyline"];
  const home = convertFromDecimal(
    moneyLine.submarkets["period=ot&period=ft"].selections.filter(
      (s) => s.outcome === "home"
    )[0].price
  );
  const away = convertFromDecimal(
    moneyLine.submarkets["period=ot&period=ft"].selections.filter(
      (s) => s.outcome === "away"
    )[0].price
  );
  return { home, away };
};

// Een "bespreek"- of "offerte"-link bij de diensten en prijzen vult het
// bericht in het contactformulier alvast in. Een DOM-event in plaats van context,
// zodat het formulier (lazy geladen) en de knoppen elkaar niet hoeven te kennen.
// Een keuze van vóór het formulier gemount is blijft als `pending` bewaard.
export const INTENT_EVENT = "bluestar:intent";

let pending = null;

export function sendIntent(message) {
  pending = message;
  window.dispatchEvent(new CustomEvent(INTENT_EVENT, { detail: message }));
}

export function takePendingIntent() {
  const message = pending;
  pending = null;
  return message;
}

export const departureSave = departure => ({
  type: "SAVE",
  departure: departure
});

export const departureAddressSave = departureAddress => ({
  type: "SAVE",
  departureAddress: departureAddress
});

export const arrivalSave = arrival => ({
  type: "SAVE",
  arrival: arrival
});

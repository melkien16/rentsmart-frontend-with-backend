// Helper to calculate price based on priceUnit
const calculateTotalPrice = (item, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let units = 1;

  switch (item.priceUnit) {
    case "hour":
      units = Math.max((end - start) / (1000 * 60 * 60), 1);
      break;
    case "day":
      units = Math.max((end - start) / (1000 * 60 * 60 * 24), 1);
      break;
    case "week":
      units = Math.max((end - start) / (1000 * 60 * 60 * 24 * 7), 1);
      break;
    default:
      units = 1;
  }

  return item.price * units;
};

export default calculateTotalPrice;
export function numberWithCommas(x = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const numberFormat2 = (num?: number | null): string =>
  typeof num === "number" ? (Math.round(num * 100) / 100).toFixed(2) : "0";

export const numberWithCommasFormat2 = (num = 0) => {
  const dotNum = numberFormat2(num);
  const tail = dotNum.split(".")[1];
  const commaNum = numberWithCommas(num);
  if (commaNum.includes(".")) return commaNum.replace(/\.[^.]*$/g, `.${tail}`);
  return commaNum.concat(`.${tail}`);
};

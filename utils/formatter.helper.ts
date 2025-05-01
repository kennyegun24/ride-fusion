export const date_formatter = (param: string) => {
  const date = new Date(param);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};

export const number_formatter = (param: number) => {
  const absNum = Math.abs(param);
  const sign = Math.sign(param);

  if (absNum >= 1e9) {
    return (sign * (absNum / 1e9)).toFixed(2) + "B";
  } else if (absNum >= 1e6) {
    return (sign * (absNum / 1e6)).toFixed(2) + "M";
  } else if (absNum >= 1e3) {
    return (sign * (absNum / 1e3)).toFixed(2) + "k";
  } else {
    return (sign * absNum).toString();
  }
};

export const capitalizeFirstLetter = (param: string) => {
  if (!param) return "";
  return param.charAt(0).toUpperCase() + param.slice(1);
};

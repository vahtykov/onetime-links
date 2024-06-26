const generateRandomString = (myLength: number): string => {
  const chars =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)],
  );

  const randomString = randomArray.join('');
  return randomString;
};

export { generateRandomString };

function convertCountryList(countries: string[] = []) {
  if (countries.length === 0) return;

  const countryMap: { [key: string]: string } = {
    대한민국: 'South Korea',
    중국: 'China',
    일본: 'Japan',
    미국: 'United States',
    북한: 'North Korea',
    러시아: 'Russia',
    프랑스: 'France',
    영국: 'England',
  };

  return countries.map(country => countryMap[country]);
}

export default convertCountryList;

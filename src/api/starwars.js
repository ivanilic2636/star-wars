export const fetchStarWarsData = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/films");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getHomeworldData = async (charactersData, homeworldCache) => {
  const charactersDataWithHomeworld = await Promise.all(
    charactersData.map(async (character) => {
      if (!homeworldCache[character.homeworld]) {
        const homeworldResponse = await fetch(character.homeworld);
        const homeworldData = await homeworldResponse.json();
        homeworldCache[character.homeworld] = homeworldData;
      }
      return {
        ...character,
        homeworldData: homeworldCache[character.homeworld],
      };
    })
  );
  return charactersDataWithHomeworld;
};

export const fetchStarWarsData = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/films");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch films failed: ${error.message}`);
  }
};

export const getHomeworldData = async (charactersData, homeworldCache) => {
  try {
    const charactersDataWithHomeworld = await Promise.all(
      charactersData.map(async (character) => {
        if (!homeworldCache[character.homeworld]) {
          const homeworldResponse = await fetch(character.homeworld);
          if (!homeworldResponse.ok) {
            throw new Error(
              `Homeworld response was not ok: ${homeworldResponse.status}`
            );
          }
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
  } catch (error) {
    throw new Error(`Homeworld data fetch failed: ${error.message}`);
  }
};

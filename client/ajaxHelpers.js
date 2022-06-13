// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2204-ftb-mt-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


export const fetchAllPlayers = async () => {
    try {
        let response = await fetch(`${APIURL}/players`);
        let result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
      } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
      }

};

export const fetchSinglePlayer = async (playerId) => {
  const response = await fetch(`${APIURL}/players/${playerId}`);
  const result = await response.json();
  return  result.data.player;
};

export const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(
      `${APIURL}players`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          playerObj

        ),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

export const removePlayer = async (playerId) => {
  try {
   const response = await fetch(`${APIURL}/players/${playerId}`, {
     method: 'DELETE',
   });
   const result = await response.json();
   if (result.error) throw result.error;
   return;
  } catch (err) {
   console.error(
     `Whoops, trouble removing player #${playerId} from the roster!`,
     err
   );
  }
  };
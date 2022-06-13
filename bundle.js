/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2204-ftb-mt-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


const fetchAllPlayers = async () => {
    try {
        let response = await fetch(`${APIURL}/players`);
        let result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
      } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
      }

};

const fetchSinglePlayer = async (playerId) => {
  const response = await fetch(`${APIURL}/players/${playerId}`);
  const result = await response.json();
  return  result.data.player;
};

const addNewPlayer = async (playerObj) => {
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

const removePlayer = async (playerId) => {
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

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}


init()


/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./client/index.js");



const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove-button" data-id=${pup.id}>Remove</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {

      let player = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id)
        renderSinglePlayer(player);
        
      
    });
  }

  let removeButton = [...document.getElementsByClassName('remove-button')];
  for (let i = 0; i < removeButton.length; i++){
    const button = removeButton[i];
    button.addEventListener('click', async (event) =>{
      event.preventDefault();
      await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(button.dataset.id);
      (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.init)();
    })
  }

};

const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

  playerContainer.innerHTML = pupHTML;

  console.log('gets to the listener');
  let back = document.querySelector("#see-all");
  back.addEventListener('click', function(event){

  (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.init)();

  })

};

const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {

    event.preventDefault();
    let inputs = form.elements;
   let playerData = {
    name: inputs['name'].value,
    breed: inputs['breed'].value}
    await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
    let players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
    renderAllPlayers(players)
  
    renderNewPlayerForm()
  

  });

};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC8uL2NsaWVudC9yZW5kZXJIZWxwZXJzLmpzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3Avd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsV0FBVzs7O0FBRy9EO0FBQ1A7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFTztBQUNQLGtDQUFrQyxPQUFPLFdBQVcsU0FBUztBQUM3RDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG1DQUFtQyxPQUFPLFdBQVcsU0FBUztBQUM5RDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQSxJOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUQrQztBQUN3Qjs7QUFFaEU7QUFDUCx3QkFBd0IsNkRBQWU7QUFDdkMsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsb0VBQW1CO0FBQ3JCOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1g2RjtBQUMzRDs7QUFFbEM7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBLG9CQUFvQixhQUFhLGtCQUFrQixTQUFTO0FBQzVELGdEQUFnRCxPQUFPO0FBQ3ZELGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7O0FBRUEseUJBQXlCLCtEQUFpQjtBQUMxQzs7O0FBR0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsaUJBQWlCLHlCQUF5QjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFZO0FBQ3hCLE1BQU0sK0NBQUk7QUFDVixLQUFLO0FBQ0w7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QyxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLGlCQUFpQixvREFBb0Q7QUFDckUsa0JBQWtCLGdCQUFnQjtBQUNsQyxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSwrQ0FBSTs7QUFFTixHQUFHOztBQUVIOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSwwREFBWTtBQUN0Qix3QkFBd0IsNkRBQWU7QUFDdkM7O0FBRUE7OztBQUdBLEdBQUc7O0FBRUg7Ozs7Ozs7VUMzSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFkZCB5b3VyIGNvaG9ydCBuYW1lIHRvIHRoZSBjb2hvcnROYW1lIHZhcmlhYmxlIGJlbG93LCByZXBsYWNpbmcgdGhlICdDT0hPUlQtTkFNRScgcGxhY2Vob2xkZXJcclxuY29uc3QgY29ob3J0TmFtZSA9ICcyMjA0LWZ0Yi1tdC13ZWItcHQnO1xyXG4vLyBVc2UgdGhlIEFQSVVSTCB2YXJpYWJsZSBmb3IgZmV0Y2ggcmVxdWVzdHNcclxuY29uc3QgQVBJVVJMID0gYGh0dHBzOi8vZnNhLXB1cHB5LWJvd2wuaGVyb2t1YXBwLmNvbS9hcGkvJHtjb2hvcnROYW1lfS9gO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEFsbFBsYXllcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSVVSTH0vcGxheWVyc2ApO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YS5wbGF5ZXJzO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdVaCBvaCwgdHJvdWJsZSBmZXRjaGluZyBwbGF5ZXJzIScsIGVycik7XHJcbiAgICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hTaW5nbGVQbGF5ZXIgPSBhc3luYyAocGxheWVySWQpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0FQSVVSTH0vcGxheWVycy8ke3BsYXllcklkfWApO1xyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICByZXR1cm4gIHJlc3VsdC5kYXRhLnBsYXllcjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGROZXdQbGF5ZXIgPSBhc3luYyAocGxheWVyT2JqKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgIGAke0FQSVVSTH1wbGF5ZXJzYCxcclxuICAgICAge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgIHBsYXllck9ialxyXG5cclxuICAgICAgICApLFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlUGxheWVyID0gYXN5bmMgKHBsYXllcklkKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElVUkx9L3BsYXllcnMvJHtwbGF5ZXJJZH1gLCB7XHJcbiAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgfSk7XHJcbiAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xyXG4gICByZXR1cm47XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgYFdob29wcywgdHJvdWJsZSByZW1vdmluZyBwbGF5ZXIgIyR7cGxheWVySWR9IGZyb20gdGhlIHJvc3RlciFgLFxyXG4gICAgIGVyclxyXG4gICApO1xyXG4gIH1cclxuICB9OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyB9IGZyb20gJy4vYWpheEhlbHBlcnMnXHJcbmltcG9ydCB7IHJlbmRlckFsbFBsYXllcnMsIHJlbmRlck5ld1BsYXllckZvcm0gfSBmcm9tICcuL3JlbmRlckhlbHBlcnMnXHJcblxyXG5leHBvcnQgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKClcclxuICByZW5kZXJBbGxQbGF5ZXJzKHBsYXllcnMpXHJcblxyXG4gIHJlbmRlck5ld1BsYXllckZvcm0oKVxyXG59XHJcblxyXG5cclxuaW5pdCgpXHJcbiIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyxmZXRjaFNpbmdsZVBsYXllcixhZGROZXdQbGF5ZXIsIHJlbW92ZVBsYXllciB9IGZyb20gJy4vYWpheEhlbHBlcnMnO1xyXG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9pbmRleC5qcyc7XHJcblxyXG5jb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsLXBsYXllcnMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG5ld1BsYXllckZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXBsYXllci1mb3JtJyk7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyQWxsUGxheWVycyA9IChwbGF5ZXJMaXN0KSA9PiB7XHJcbiAgLy8gRmlyc3QgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgZGF0YSBiZWZvcmUgdHJ5aW5nIHRvIHJlbmRlciBpdCFcclxuICBpZiAoIXBsYXllckxpc3QgfHwgIXBsYXllckxpc3QubGVuZ3RoKSB7XHJcbiAgICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gJzxoMz5ObyBwbGF5ZXJzIHRvIGRpc3BsYXkhPC9oMz4nO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsYXllcnMsIGFuZCBjb25zdHJ1Y3Qgc29tZSBIVE1MIHRvIGRpc3BsYXkgZWFjaCBvbmVcclxuICBsZXQgcGxheWVyQ29udGFpbmVySFRNTCA9ICcnO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcHVwID0gcGxheWVyTGlzdFtpXTtcclxuICAgIGxldCBwdXBIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLXBsYXllci1jYXJkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1pbmZvXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cHVwLm5hbWV9PC9wPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJwdXAtbnVtYmVyXCI+IyR7cHVwLmlkfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aW1nIHNyYz1cIiR7cHVwLmltYWdlVXJsfVwiIGFsdD1cInBob3RvIG9mICR7cHVwLm5hbWV9IHRoZSBwdXBweVwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJkZXRhaWwtYnV0dG9uXCIgZGF0YS1pZD0ke3B1cC5pZH0+U2VlIGRldGFpbHM8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLWJ1dHRvblwiIGRhdGEtaWQ9JHtwdXAuaWR9PlJlbW92ZTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XHJcbiAgfVxyXG5cclxuICAvLyBBZnRlciBsb29waW5nLCBmaWxsIHRoZSBgcGxheWVyQ29udGFpbmVyYCBkaXYgd2l0aCB0aGUgSFRNTCB3ZSBjb25zdHJ1Y3RlZCBhYm92ZVxyXG4gIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwbGF5ZXJDb250YWluZXJIVE1MO1xyXG5cclxuICAvLyBOb3cgdGhhdCB0aGUgSFRNTCBmb3IgYWxsIHBsYXllcnMgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTSxcclxuICAvLyB3ZSB3YW50IHRvIGdyYWIgdGhvc2UgXCJTZWUgZGV0YWlsc1wiIGJ1dHRvbnMgb24gZWFjaCBwbGF5ZXJcclxuICAvLyBhbmQgYXR0YWNoIGEgY2xpY2sgaGFuZGxlciB0byBlYWNoIG9uZVxyXG4gIGxldCBkZXRhaWxCdXR0b25zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RldGFpbC1idXR0b24nKV07XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXRhaWxCdXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkZXRhaWxCdXR0b25zW2ldO1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgICAgbGV0IHBsYXllciA9IGF3YWl0IGZldGNoU2luZ2xlUGxheWVyKGJ1dHRvbi5kYXRhc2V0LmlkKVxyXG4gICAgICAgIHJlbmRlclNpbmdsZVBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlbW92ZUJ1dHRvbiA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZW1vdmUtYnV0dG9uJyldO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlQnV0dG9uLmxlbmd0aDsgaSsrKXtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IHJlbW92ZUJ1dHRvbltpXTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT57XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGF3YWl0IHJlbW92ZVBsYXllcihidXR0b24uZGF0YXNldC5pZCk7XHJcbiAgICAgIGluaXQoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJTaW5nbGVQbGF5ZXIgPSAocGxheWVyT2JqKSA9PiB7XHJcbiAgaWYgKCFwbGF5ZXJPYmogfHwgIXBsYXllck9iai5pZCkge1xyXG4gICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiPGgzPkNvdWxkbid0IGZpbmQgZGF0YSBmb3IgdGhpcyBwbGF5ZXIhPC9oMz5cIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxldCBwdXBIVE1MID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInNpbmdsZS1wbGF5ZXItdmlld1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cclxuICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cGxheWVyT2JqLm5hbWV9PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwicHVwLW51bWJlclwiPiMke3BsYXllck9iai5pZH08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cD5UZWFtOiAke3BsYXllck9iai50ZWFtID8gcGxheWVyT2JqLnRlYW0ubmFtZSA6ICdVbmFzc2lnbmVkJ308L3A+XHJcbiAgICAgIDxwPkJyZWVkOiAke3BsYXllck9iai5icmVlZH08L3A+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHtwbGF5ZXJPYmouaW1hZ2VVcmx9XCIgYWx0PVwicGhvdG8gb2YgJHtcclxuICAgIHBsYXllck9iai5uYW1lXHJcbiAgfSB0aGUgcHVwcHlcIj5cclxuICAgICAgPGJ1dHRvbiBpZD1cInNlZS1hbGxcIj5CYWNrIHRvIGFsbCBwbGF5ZXJzPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICBgO1xyXG5cclxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcHVwSFRNTDtcclxuXHJcbiAgY29uc29sZS5sb2coJ2dldHMgdG8gdGhlIGxpc3RlbmVyJyk7XHJcbiAgbGV0IGJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlZS1hbGxcIik7XHJcbiAgYmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgaW5pdCgpO1xyXG5cclxuICB9KVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJOZXdQbGF5ZXJGb3JtID0gKCkgPT4ge1xyXG4gIGxldCBmb3JtSFRNTCA9IGBcclxuICAgIDxmb3JtPlxyXG4gICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPk5hbWU6PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiAvPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiYnJlZWRcIj5CcmVlZDo8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYnJlZWRcIiAvPlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuICBgO1xyXG4gIG5ld1BsYXllckZvcm1Db250YWluZXIuaW5uZXJIVE1MID0gZm9ybUhUTUw7XHJcblxyXG4gIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wbGF5ZXItZm9ybSA+IGZvcm0nKTtcclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgaW5wdXRzID0gZm9ybS5lbGVtZW50cztcclxuICAgbGV0IHBsYXllckRhdGEgPSB7XHJcbiAgICBuYW1lOiBpbnB1dHNbJ25hbWUnXS52YWx1ZSxcclxuICAgIGJyZWVkOiBpbnB1dHNbJ2JyZWVkJ10udmFsdWV9XHJcbiAgICBhd2FpdCBhZGROZXdQbGF5ZXIocGxheWVyRGF0YSk7XHJcbiAgICBsZXQgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpXHJcbiAgICByZW5kZXJBbGxQbGF5ZXJzKHBsYXllcnMpXHJcbiAgXHJcbiAgICByZW5kZXJOZXdQbGF5ZXJGb3JtKClcclxuICBcclxuXHJcbiAgfSk7XHJcblxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY2xpZW50L2luZGV4LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //prompt
      let mulitSearch = promptFor(
        "Do you want to search for mulitple traits?",
        yesNo
      ).toLowerCase();
      if (mulitSearch === "yes") {
        searchResults = searchByTraits(people).pop();
      } else {
        let searchOne = promptFor(
          "What do you want to search by ? \n gender? \n eye color? \n height and weight? \n occupation? ",
          autoValid
        );
        switch (searchOne) {
          case "gender":
            displayPeople(searchByGender(people));
            break;
          case "eye color":
            displayPeople(searchByEyeColor(people));
            break;
          case "height":
            displayPeople(searchByHeight(people));
            break;
          case "weight":
            displayPeople(searchByWeight(people));
            break;
          case "occupation":
            displayPeople(searchByOccupation(people));
            break;
          case "quit":
            return; // stop execution
          default:
            return mainMenu(person, people); // ask again
        }
      }
      //searchResults = searchByEyeColor(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      displayFamily(person, people);
      break;
    case "descendants":
      displayDescendants(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson[0];
}

function searchByTraits(people, traitsToSearch, traitValue) {
  if (traitsToSearch === undefined) {
    let numberOfTraits = promptFor(
      "You can search by 1-5 traits. Please enter the number of traits to search by.",
      autoValid
    );
    traitsToSearch = [];
    traitValue = [];
    let traits;
    for (let i = 0; i < numberOfTraits; i++) {
      traits = promptFor(
        "Enter one of the following traits:\n eye color, date of birth, height, weight, occupation, gender",
        autoValid
      );
      traitValue.push(promptFor("Enter value for " + traits, autoValid));
      traitsToSearch.push(traits);
      switch (traitsToSearch[i]) {
        case "eye color":
          traitsToSearch[i] = "eyeColor";
          break;
        case "date of birth":
          traitsToSearch[i] = "dob";
          break;
        default:
          break;
      }
    }
  }
  if (traitsToSearch.length > 0) {
    let foundPerson = people.filter(function (potentialMatch) {
      if (
        eval("potentialMatch." + traitsToSearch[0] + " == " + "traitValue[0]")
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (traitsToSearch.length > 1) {
      traitsToSearch.shift();
      traitValue.shift();
      return (foundPerson = searchByTraits(
        foundPerson,
        traitsToSearch,
        traitValue
      ));
    } else {
      return foundPerson;
    }
  }
}

function searchByEyeColor(people) {
  let eyeColor = prompt("What is the person's eye color?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByDOB(people) {
  let dateOfBirth = prompt("What is the person's date of birth?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dateOfBirth) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByHeight(people) {
  let height = prompt("What is the person's height?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.height === height) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByWeight(people) {
  let weight = prompt("What is the person's weight?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === weight) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByOccupation(people) {
  let occupation = prompt("What is the person's occupation", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByGender(people) {
  let gender = prompt("What is the person's gender?", autoValid);
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
//DONE
function searchByID(id, people) {
  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.id === id) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson[0];
}
//DONE
function searchForParents(person, people) {
  if (person.parents.length == 1) {
    let parent = searchByID(person.parents[0], people);
    return giveName(parent);
  } else if (person.parents.length == 2) {
    let parent0 = searchByID(person.parents[0], people);
    let parent1 = searchByID(person.parents[1], people);
    let parents = giveName(parent0) + giveName(parent1);

    return parents
  } else {
    return "No Parents";
  }
}
//DONE
function searchForSpouse(person, people) {
  let spouse = searchByID(person.currentSpouse, people);
  if (spouse) {
    spouse = spouse.firstName + " " + spouse.lastName;
  } else {
    spouse = "No Spouse";
  }
  return spouse;
}
//DONE
function searchForKids(person, people) {
  let kids = [];
  kids = people.filter(function (potentialMatch) {
    if (potentialMatch.parents.includes(person.id)) {
      return true;
    } else {
      return false;
    }
  });
  if (kids) {
    let descendants = searchForGrandkids(kids, people);
    if (descendants !== "No Grandchildren") {
      return giveName(kids) + "\n" + "Grandchildren: " + descendants;
    } else {
      return giveName(kids);
    }
  } else {
    return "No Children";
  }
}
//DONE
function searchForGrandkids(parents, people) {
  let grandKids = parents.map(function (parent) {
    return people.filter(function (potentialMatch) {
      if (potentialMatch.parents.includes(parent.id)) {
        return true;
      } else {
        return false;
      }
    });
  });
  for (let i = 0; i < grandKids.length; i++) {
    if (grandKids[i].length < 1) {
      grandKids.splice(i, 1);
      i--;
    }
  }
  if (grandKids.length > 0) {
    let newGrandkids = [];
    for (let i = 0; i < grandKids.length; i++) {
      newGrandkids[i] = grandKids[i].pop();
    }
    return giveName(newGrandkids);
  } else {
    return "No Grandchildren";
  }
}
//DONE
function searchForSiblings(person, people) {
  let siblings = [];
  if (person.parents.length === 2) {
    for (let i = 0; i < person.parents.length; i++) {
      siblings = people.filter(function (potentialMatch) {
        if (
          potentialMatch.parents.includes(person.parents[i]) &&
          potentialMatch.id != person.id
        ) {
          return true;
        } else {
          return false;
        }
        //breakpoint
      });
    }
    return giveName(siblings);
  } else if (person.parents.length === 1) {
    siblings = people.filter(function (potentialMatch) {
      if (
        potentialMatch.parents.includes(person.parents[0]) &&
        potentialMatch.id != person.id
      ) {
        return true;
      } else {
        return false;
      }
    });
    return giveName(siblings);
    //breakpoint
  } else {
    siblings = "No siblings";
  }
  return siblings;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}
//DONE
function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo +=
    "Height and Weight: " +
    person.height +
    " inches, " +
    person.weight +
    " lbs" +
    "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}
//DONE
function displayFamily(person, people) {
  let spouse = searchForSpouse(person, people);
  let parents = searchForParents(person, people);
  let siblings = searchForSiblings(person, people);
  alert(
    "Spouse: " +
      spouse +
      " \n" +
      "Parent(s): " +
      parents +
      "\nSibling(s): " +
      siblings
  );
}
//DONE
function displayDescendants(person, people) {
  let kids = searchForKids(person, people);
  alert("Kids: " + kids);
}
//DONE
// function giveName(names) {
//   let namesCompleted = names;
//   if (Array.isArray(namesCompleted)) {
//     namesCompleted.map(function (namesCompleted) {
//       return namesCompleted.firstName + " " + namesCompleted.lastName + "\n";
//     });
//     namesCompleted.join("\n");
//   } else {
//     return namesCompleted.firstName + " " + namesCompleted.lastName + "\n";
//   }
//   return namesCompleted;
// }
function giveName(names) {
  let namesCompleted = names;
  if (namesCompleted.length > 1) {
    namesCompleted.map(function (names) {
      return names.firstName + " " + names.lastName + "\n";
    });
    names.join("\n");
  } else if (names.length === 1) {
    namesCompleted = names.firstName + " " + names.lastName + "\n";
  }
  return namesCompleted;
}
//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

function isObject(val) {
  return val instanceof Object;
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion

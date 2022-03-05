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
      searchResults = searchByEyeColor(people);
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
      // TODO: get person's descendants
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

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
//TODO: add other trait filter functions here.
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

function searchForParents(person, people) {
  if (person.parents.length == 1) {
    let parent = searchByID(person.parents[0], people);
    parent = parent.firstName + " " + parent.lastName;
    return parent;
  } else if (person.parents.length == 2) {
    let parent0 = searchByID(person.parents[0], people);
    let parent1 = searchByID(person.parents[1], people);
    let parents =
      parent0.firstName +
      " " +
      parent0.lastName +
      " & " +
      parent1.firstName +
      " " +
      parent1.lastName;
    return parents;
  } else {
    return "No Parents";
  }
}

function searchForSpouse(person, people) {
  let spouse = searchByID(person.currentSpouse, people);
  if (spouse) {
    spouse = spouse.firstName + " " + spouse.lastName;
  } else {
    spouse = "No Spouse";
  }
  return spouse;
}
function searchForKids(person, people) {
  let kids = [];
  kids = people.filter(function (potentialMatch) {
    if (potentialMatch.parents.includes(person.id)) {
      return true;
    } else {
      return false;
    }
  });
  if (kids.length > 0) {
    for (let i = 0; i < kids.length; i++) {
      searchForKids(kids[i]);
    }
  }
}
function searchForSiblings(person, people) {
  let siblings= [];
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
    };
    siblings = siblings.map(function(name){
      return name.firstName + ' ' + name.lastName 
    })
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
    siblings = siblings.map(function(name){
      return name.firstName + ' ' + name.lastName 
    })
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

function displayFamily(person, people) {
  let spouse = searchForSpouse(person, people);
  let parents = searchForParents(person, people);
  let siblings = searchForSiblings(person, people);
  alert(
    "Spouse: " + spouse + " " + "Parent(s): " + parents + ", Sibling(s): " + siblings
  );
}

function displayDescendants(person, people) {
  let kids = searchForKids(person, people);
  alert("Kids: " + kids);
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

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion

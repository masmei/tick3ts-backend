const db = require("../db/dbConfig.js");

const getAllEvents = async () => {
    try {
        const allEvents = await db.any("SELECT * FROM events");
        return allEvents;
      } catch (error) {
        return error;
      }
};

const getEvent = async (id) => {
  try {
    // db one takes a string of SQL command;
    // id=$1 allows us to interpolate our second parameter safely
    // we CAN pass multiple values to one query in this manner
    const one = await db.one("SELECT * FROM events WHERE id=$1", id);
    return one;
  } catch (error) {
    // with using db.one() we will not hit our catch block even if we have no
    // record with the corresponding ID - there are MANY ways to handle this
    // db.oneOrNone() is one way - there are also others.
    return error;
  }
};

const createEvent = async (event) => {
  let { title, category, date, location, image, contract } = event;

  if(!picture){
    picture = "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-logo-6278329_960_720.png"
  }

  try {
    const newEvent = await db.one(
      "INSERT INTO events (title, category, date, location, image, contract) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, category, date, location, image, contract]
    );
    return newEvent;
  } catch (error) {
    return error;
  }
};

const deleteEvent = async (id) => {
  try {
    const deletedEvent = await db.one("DELETE FROM events WHERE id = $1 RETURNING *", id);
    return deletedEvent;
  } catch (err) {
    return err;
  }
};

const updateEvent = async (event, id) => {
  let { title, category, date, location, image, contract } = event;

  if(!picture){
    picture = "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-logo-6278329_960_720.png"
  }

  try {
    // first argument is the QUERY string
    // second argument is the actual DATA 
    const updatedEvent = await db.one("UPDATE events SET title = $1, category = $2, date = $3, location = $4, image = $5, contract = $6 WHERE id = $7 RETURNING *",
    // remember the order MATTERS here 
    // $1  $2   $3        $4           $5
    [title, category, date, location, image, contract]);
    return updatedEvent;
  } catch (err) {
    return err;
  }
}


module.exports = { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent };
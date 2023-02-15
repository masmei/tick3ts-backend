const express = require("express");
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../queries/events");

// Configuration
const events = express.Router();

// INDEX
events.get("/", async (req, res) => {
  const allEvents = await getAllEvents();
  if (allEvents[0]) {
    res.status(200).json(allEvents);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

events.get("/:id", async (req, res) => {
  const { id } = req.params;
  const event = await getEvent(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

events.post("/", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

events.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await deleteEvent(id);
  // if our response has an ID we are good to go!
  // an error will NOT have an id
  if (deletedEvent.id) {
    res.status(200).json(deletedEvent);
  } else {
    res.status(404).json("event not found!");
  }
});

events.put("/:id", async (req, res) => {
  const { id } = req.params;
  // updatedevent will either be a MASSIVE error object from SQL
  // OR it will be a event with the keys and values we expected
  const updatedEvent = await updateEvent(req.body, id);
  if (updatedEvent.id) {
    res.status(200).json(updatedEvent);
  } else {
    res.status(422).json({ error: "event not updated for some reason...." });
  }
});

module.exports = events;

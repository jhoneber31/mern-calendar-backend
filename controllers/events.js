
const {response} = require('express');
const Event = require('../models/Event');

const getEvent = async (req, res = response) => {

  const event = await Event.find()
                            .populate('user', 'name');

  res.json({
    ok: true,
    event
  })
}

const createEvent = async (req, res = response) => {

  const event = new Event(req.body);

  try {

    event.user = req.uid;

    const eventSave = await event.save();
    res.json({
      ok: true,
      evento: eventSave
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }
}

const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid

  try {

    const event = await Event.findById(eventId);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found by ID'
      })
    }

    if(event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to edit this event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const evenUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

    res.json({
      ok: true,
      event: evenUpdated
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }
}

const deleteEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid
  
  try {

    const event = await Event.findById(eventId);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found by ID'
      })
    }

    if(event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to delete this event'
      })
    }


    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: 'Event deleted'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }

}

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}
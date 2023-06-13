// import dependencies
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");

// function to read data from the file
async function readData() {
  try {
    const data = await fs.readFile("./db/db.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

// route for getting notes
router.get("/", async (req, res) => {
  const data = await readData();
  res.json(data);
});

// route for adding a note
router.post("/", async (req, res) => {
  if (req.body) {
    const { title, text } = req.body;
    const notes = await readData();
    notes.push({ title, text, id: uuidv4() });
    await fs.writeFile("./db/db.json", JSON.stringify(notes));
    res.json("Note added successfully!");
  } else {
    res.error("Invalid post entry");
  }
});

// route for deleting a note
router.delete("/:id", async (req, res) => {
  const notes = await readData();
  const newNotes = notes.filter((note) => req.params.id !== note.id);
  await fs.writeFile("./db/db.json", JSON.stringify(newNotes));
  res.json("Note deleted successfully!");
});

// Export the router module
module.exports = router;

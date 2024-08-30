const express = require("express");
const bodyParser = require("body-parser");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://myntra-clone-frontend-five.vercel.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../3-myntra-react-clone/build")));

app.get("/items", async (req, res) => {
  const storedItems = await getStoredItems();
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
  res.json({ items: storedItems });
});

app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});
// All other GET requests not handled by API routes return the React app
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../3-myntra-react-clone/build", "index.html")
  );
});

app.listen(8080);

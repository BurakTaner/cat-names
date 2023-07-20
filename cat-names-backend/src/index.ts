import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
dotenv.configDotenv();
const app: Application = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "It's working" });
});

app.get("/getallnames", async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const names: CatName[] = await readNames();
  return res.json(names);
});

app.post("/createname", async (req: Request, res: Response) => {
  try {
    const catName: CatName = req.body;
    const names: CatName[] = await readNames();
    names.push(catName);
    await fs.promises.writeFile("./data/names.json", JSON.stringify(names));
    res.json(names);
  }
  catch (e) {
    res.json(e);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

interface CatName {
  name: string;
  surname?: string;
  sex: "Male" | "Female"
}

const readNames = async () => {
  const namesFile: string = await fs.promises.readFile("./data/names.json", { encoding: "utf8" });
  const names: CatName[] = JSON.parse(namesFile);
  return names;
}

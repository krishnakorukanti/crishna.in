import fs from 'fs';
import {NextApiRequest, NextApiResponse} from "next";

const fileName = "/persona-ai.html";

export default async function personaAi(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const data = await fs.promises.readFile(fileName, "utf-8");
    res.write(data);
    res.end();
}
import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT

  app.get("/filteredimage", async (request: Request, response: Response) => {
    const { image_url } = request.query;

    if (!image_url) return response.status(422).send("invalid image url"); //    1. validate the image_url query
    const filteredImage: string = await filterImageFromURL(String(image_url)); //    2. call filterImageFromURL(image_url) to filter the image

    setTimeout(() => {
      deleteLocalFiles([filteredImage]); //    4. deletes any files on the server on finish of the response
    }, 60 * 0.1);
    response.status(200).sendFile(filteredImage); //    3. send the resulting file in the response
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (request: Request, response: Response) => {
    response.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();

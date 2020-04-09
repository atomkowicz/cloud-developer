import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  //
  app.get("/filteredimage/", async (req, res) => {
    const { image_url } = req.query;

    //    validate the image_url query
    const isUrlValid = image_url && /^http[s]:\/\//.test(image_url);
    if (!isUrlValid) res.send("Url is not a valid url");

    try {
      //    call filterImageFromURL(image_url) to filter the image
      const processedImage = await filterImageFromURL(image_url);
      //    send the resulting file in the response
      //    deletes any files on the server on finish of the response

      res.sendFile(processedImage, async () => {
        const isImageDeleted = await deleteLocalFiles([processedImage]);
      });
    } catch (e) {
      res.status(500).send(`Something went wrong. Make sure the image url you provided is valid: ${image_url}`);
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
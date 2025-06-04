# DisculpAngelita

This project shows a collection of images for a personal page. To make the site easier to extend, it now runs on a small Express server and loads images dynamically.

## Usage

```
# install dependencies
npm install

# start the server
npm start
```

Then open `http://localhost:3000` in your browser. The server exposes several endpoints:

- `GET /api/images` - list available images.
- `POST /api/images` - upload a new image using `multipart/form-data` with the field `image`.
- `DELETE /api/images/:name` - remove an image by filename.

Images are stored under `public/images`.

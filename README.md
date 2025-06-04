# DisculpAngelita

This project shows a collection of images for a personal page. To make the site easier to extend, it now runs on a small Express server and loads images dynamically.

## Usage

```
# install dependencies
npm install

# start the server
npm start
```

Then open `http://localhost:3000` in your browser. The server exposes `/api/images` which returns the list of available images under `public/images`.

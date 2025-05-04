import app from "../src/app.js";

app.listen(8080, '0.0.0.0', () => {
    console.log('[SERVER]: Running on http://localhost:' + PORT);
});

module.exports = app;

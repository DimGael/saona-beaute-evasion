import chokidar from 'chokidar';
import renderViews from "./generate.js";

const watcher = chokidar.watch('./views', {
    ignored: (path, stats) => stats?.isFile() && !path.endsWith('.hbs'),
    persistent: true
  });

watcher
  .on('change', () => {renderViews()});

  renderViews();

console.log("Watching views directory for changes ...");
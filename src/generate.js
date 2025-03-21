import fs from 'fs';
import Handlebars from 'handlebars';
import camelCase from './helpers/camelCase.js';

Handlebars.registerHelper("camelCase", camelCase);

const render = function(filename, data, baseTemplateFilename = "./views/layouts/base.hbs") {
    let source = fs.readFileSync(filename, 'utf8').toString();
    let template = Handlebars.compile(source);
    let targetOutput = template(data);

    let baseSource = fs.readFileSync(baseTemplateFilename, 'utf8').toString();
    let baseTemplate = Handlebars.compile(baseSource);

    let finalOutput = baseTemplate({
        body: targetOutput
    });

    return finalOutput;
}

export default function renderViews() {
    // RENDER INDEX.HBS
    const tarifsData = JSON.parse(fs.readFileSync("src/data/tarifs.json", 'utf8'));
    const indexRendered = render("./views/index.hbs", tarifsData);
    fs.writeFile('./public/index.html', indexRendered, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("Generated public/index.html")
        }
    });
}

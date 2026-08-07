const fs = require('fs');
const path = require('path');

function replaceImages(content) {
  // We want to find the images array and image2 property for each project in the object.
  // Using regex to match each project block
  const projectBlockRegex = /("[0-9]+"|'[0-9]+'|[0-9]+):\s*\{([\s\S]*?)\},?\n/g;
  
  let newContent = content.replace(projectBlockRegex, (match, id, body) => {
    // Extract image2
    const image2Match = body.match(/image2:\s*["'](.*?)["']/);
    let heroImage = "";
    if (image2Match) {
      heroImage = image2Match[1];
    } else {
      // Try to get the first image in images array
      const imagesMatch = body.match(/images:\s*\[([\s\S]*?)\]/);
      if (imagesMatch) {
        const firstImageMatch = imagesMatch[1].match(/["'](.*?)["']/);
        if (firstImageMatch) {
          heroImage = firstImageMatch[1];
        }
      }
    }
    
    if (!heroImage) return match; // No hero image found, don't change
    
    // Count how many images are in the array
    const imagesMatch = body.match(/images:\s*\[([\s\S]*?)\]/);
    if (!imagesMatch) return match;
    
    const count = (imagesMatch[1].match(/["']/g) || []).length / 2;
    
    // Create new images array
    const newImages = Array.from({length: count}).map(() => `      "${heroImage}"`).join(',\n');
    
    const newBody = body.replace(/images:\s*\[[\s\S]*?\]/, `images: [\n${newImages}\n    ]`);
    
    return `${id}: {${newBody}}, \n`;
  });
  
  return newContent;
}

const file1 = path.join(process.cwd(), 'src/data/project-details.ts');
const file2 = path.join(process.cwd(), 'src/app/project/[id]/page.tsx');

let content1 = fs.readFileSync(file1, 'utf8');
content1 = replaceImages(content1);
// Fix syntax issues if trailing commas got messed up
content1 = content1.replace(/\}, \n\};/g, '}\n};');
fs.writeFileSync(file1, content1);

let content2 = fs.readFileSync(file2, 'utf8');
content2 = replaceImages(content2);
content2 = content2.replace(/\}, \n\};/g, '}\n};');
fs.writeFileSync(file2, content2);

console.log('Images replaced!');

const fs = require('fs');
const path = require('path');

// Read projects.ts to get all hero images
const projectsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/projects.ts'), 'utf8');
const heroImagesMap = {}; // image url -> project id
const projectBlockRegex = /id:\s*["']([^"']+)["'].*?image:\s*["']([^"']+)["']/g;
let match;
while ((match = projectBlockRegex.exec(projectsContent)) !== null) {
  const [_, id, img] = match;
  // Normalize ID to string without leading zero (e.g., "01" -> "1")
  const normId = parseInt(id, 10).toString();
  heroImagesMap[img] = normId;
}

function replaceImages(content) {
  const blockRegex = /("[0-9]+"|'[0-9]+'|[0-9]+):\s*\{([\s\S]*?)\},?\n/g;
  
  return content.replace(blockRegex, (match, id, body) => {
    // Clean quotes from id
    const cleanId = id.replace(/["']/g, '');
    
    // Get image2 for this project
    const image2Match = body.match(/image2:\s*["'](.*?)["']/);
    const thisHero = image2Match ? image2Match[1] : '';
    
    const imagesMatch = body.match(/images:\s*\[([\s\S]*?)\]/);
    if (!imagesMatch) return match;
    
    // Extract all current image URLs
    const currentImages = [];
    const urlRegex = /["'](.*?)["']/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(imagesMatch[1])) !== null) {
      currentImages.push(urlMatch[1]);
    }
    
    // Filter images
    let newImages = [];
    let heroAdded = false;
    for (const img of currentImages) {
      if (img === thisHero) {
        if (!heroAdded) {
          newImages.push(img);
          heroAdded = true;
        }
      } else {
        // Is it another project's hero?
        if (heroImagesMap[img] && heroImagesMap[img] !== cleanId) {
          // It's another project's hero image, exclude it!
        } else {
          // Keep it
          newImages.push(img);
        }
      }
    }
    
    const newImagesStr = newImages.map(img => `      "${img}"`).join(',\n');
    const newBody = body.replace(/images:\s*\[[\s\S]*?\]/, `images: [\n${newImagesStr}\n    ]`);
    
    return `"${cleanId}": {${newBody}}, \n`;
  });
}

const file1 = path.join(process.cwd(), 'src/data/project-details.ts');
const file2 = path.join(process.cwd(), 'src/app/project/[id]/page.tsx');

let content1 = fs.readFileSync(file1, 'utf8');
content1 = replaceImages(content1);
content1 = content1.replace(/\}, \n\};/g, '}\n};');
fs.writeFileSync(file1, content1);

let content2 = fs.readFileSync(file2, 'utf8');
content2 = replaceImages(content2);
content2 = content2.replace(/\}, \n\};/g, '}\n};');
fs.writeFileSync(file2, content2);

console.log('Images fixed properly!');

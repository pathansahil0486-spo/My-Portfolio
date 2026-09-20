import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '../../projects.html');

const html = fs.readFileSync(htmlPath, 'utf8');

// Regex to capture project cards
// <div class="project-item" data-cat="...">
//   <div class="project-card tilt-card">
//     <div class="card-placeholder"><img src="..." alt="..." class="project-thumb" /></div>
//     <div class="project-info">
//       <h3>...</h3>
//       <div class="project-tags">...</div>
//       <p>...</p>
//       <a href="..." class="btn-sm" ...>...</a>
//     </div>
//   </div>
// </div>

const itemRegex = /<div\s+class=["']project-item["']\s+data-cat=["']([^"']+)["']>([\s\S]*?)(?=(?:<div\s+class=["']project-item["'])|(?:<\/div>\s*<\/section>)|(?:<\/div>\s*<\/div>\s*<\/section>))/gi;

const projects = [];
let match;

while ((match = itemRegex.exec(html)) !== null) {
  const cat = match[1];
  const block = match[2];

  // extract img
  const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  const image = imgMatch ? imgMatch[1] : '/images/saffron.png';

  // extract title
  const titleMatch = block.match(/<h3>([^<]+)<\/h3>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // extract tags
  const tags = [];
  const tagRegex = /<span\s+class=["']tag["']>([^<]+)<\/span>/gi;
  let tMatch;
  while ((tMatch = tagRegex.exec(block)) !== null) {
    tags.push(tMatch[1].trim());
  }

  // extract paragraph description
  const pMatch = block.match(/<p>([\s\S]*?)<\/p>/i);
  const desc = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // extract link
  const linkMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
  const link = linkMatch ? linkMatch[1] : '';

  if (title) {
    let normalizedCategory = 'fullstack';
    const cLower = cat.toLowerCase();
    if (cLower.includes('mern')) normalizedCategory = 'mern';
    else if (cLower.includes('react')) normalizedCategory = 'react';
    else if (cLower.includes('fullstack')) normalizedCategory = 'fullstack';
    else if (cLower.includes('frontend')) normalizedCategory = 'frontend';
    else if (cLower.includes('tools')) normalizedCategory = 'tools';
    else if (cLower.includes('ai')) normalizedCategory = 'ai-ml';
    else normalizedCategory = 'frontend';

    projects.push({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: normalizedCategory,
      shortDescription: desc || `${title} built with modern web technologies.`,
      fullDescription: desc || `${title} built with modern web technologies.`,
      technologies: tags.length > 0 ? tags : ['JavaScript', 'HTML5', 'CSS3'],
      image: image.startsWith('/') ? image : '/' + image,
      liveUrl: link,
      githubUrl: 'https://github.com/spcoder0486-leg',
      featured: projects.length < 8,
      order: projects.length + 1
    });
  }
}

console.log(`Successfully parsed ${projects.length} projects from projects.html!`);
if (projects.length > 0) {
  console.log('Sample parsed project:', JSON.stringify(projects[0], null, 2));
}

// Export parsed JSON for the seeder
fs.writeFileSync(path.join(__dirname, 'all_parsed_projects.json'), JSON.stringify(projects, null, 2));

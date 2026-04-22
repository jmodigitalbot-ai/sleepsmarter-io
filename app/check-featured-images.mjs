import fs from 'fs';
import path from 'path';

const articlesPath = path.join(process.cwd(), 'src', 'data', 'articles.ts');
const publicDir = path.join(process.cwd(), 'public');

const content = fs.readFileSync(articlesPath, 'utf8');
const matches = [...content.matchAll(/featuredImage:\s*['"`]([^'"`]+)['"`]/g)];
let missing = [];

matches.forEach(m => {
  const imagePath = m[1];
  const fullPath = path.join(publicDir, imagePath);
  if (!fs.existsSync(fullPath)) {
    missing.push(imagePath);
  }
});

if (missing.length > 0) {
  console.error('\n❌ ERROR: Build failed. The following featured images are referenced in articles.ts but missing from the public/ folder:');
  missing.forEach(f => console.error(`  - ${f}`));
  console.error('\nPlease generate and add these images before building.\n');
  process.exit(1);
} else {
  console.log('✅ Featured image disk check passed. All referenced images exist.');
}

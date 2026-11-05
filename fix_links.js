import fs from 'fs';
import path from 'path';

const directory = 'd:\\Blog\\a Yen\\toolvector\\toolvector\\src\\content\\blog';

fs.readdirSync(directory).forEach(file => {
    if (file.endsWith('.mdx')) {
        const filePath = path.join(directory, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Cập nhật cả link trong frontmatter và component props
        let newContent = content.replace(/link:\s*"(\/go\/[^/"]+)"/g, 'link: "$1/"');
        newContent = newContent.replace(/link="(\/go\/[^/"]+)"/g, 'link="$1/"');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});

import path from 'node:path'
import { fileURLToPath } from 'url';

const temp = 'C:\\Users\\jenil\\OneDrive\\Desktop\\interview-prep\\Nodejs\\File System\\pilupao.txt';

path.basename(temp);
// pilupao.txt

path.dirname(temp)
// C:\Users\jenil\OneDrive\Desktop\interview-prep\Nodejs\File System

path.extname(temp)
// .txt


// console.log(path.parse(temp))
path.parse(temp);

// {
//   root: 'C:\\',
//   dir: 'C:\\Users\\jenil\\OneDrive\\Desktop\\interview-prep\\Nodejs\\File System',
//   base: 'pilupao.txt',
//   ext: '.txt',
//   name: 'pilupao'
// }





// Joins paths
// Does not care about absolute/relative meaning
path.join(
    'C:\\Users\\jenil',
    'OneDrive',
    'Desktop',
    'interview-prep',
    'Nodejs',
    'File System',
    'pilupao.txt'
);

// C:\Users\jenil\OneDrive\Desktop\interview-prep\Nodejs\File System\pilupao.txt




//  You can get the absolute path calculation of a relative path using path.resolve():

// Resolves to an absolute path
// Uses current working directory

path.resolve('./pilupao.txt')

// relative path -> absolute path
// ./pilupao.txt -> C:\Users\jenil\OneDrive\Desktop\interview-prep\Nodejs\File System\pilupao.txt



// checks if given path is absolute
path.isAbsolute('./00 stats.mjs')
// false



path.normalize(
    'C:\\Users\\jenil\\OneDrive\\\\Desktop\\..\\Desktop\\interview-prep\\Nodejs\\File System\\pilupao.txt'
);

// C:\Users\jenil\OneDrive\Desktop\interview-prep\Nodejs\File System\pilupao.txt




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use __dirname as you would in a CommonJS module
console.log('Directory name:', __dirname);

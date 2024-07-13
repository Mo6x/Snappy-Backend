export function generateCode(prefix = 'WP') {
   const length = 13;
   let numericPart = '';

   for (let i = 0; i < length; i++) {
       numericPart += Math.floor(Math.random() * 10);
   }

   return `${numericPart}-${prefix}`;
}
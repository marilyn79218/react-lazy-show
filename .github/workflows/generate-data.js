const data = [];
for (let i=0; i<3; i++) {
  data.push(`idx: ${i} - time: ${new Date().toISOString()}`);
};

console.log(JSON.stringify(data));

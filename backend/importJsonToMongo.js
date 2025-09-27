const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

// === CONFIG ===
const uri = 'mongodb://localhost:27017';
const dbName = 'onroad';
const dataDir = path.join(__dirname, '../db'); // Your JSON files folder

// Function to process and convert $date fields
function processDates(doc) {
  for (const key in doc) {
    if (doc[key] && typeof doc[key] === 'object') {
      // Handle $date fields
      if (doc[key].$date) {
        doc[key] = new Date(doc[key].$date);
      }
      // Recursively process nested objects
      if (typeof doc[key] === 'object') {
        processDates(doc[key]);
      }
    }
  }
}

async function importJSONFiles() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const files = fs.readdirSync(dataDir);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const fileParts = file.split('.'); // Example: ['ExpensesTest', 'Budget', 'json']
        if (fileParts.length < 2) {
          console.warn(`⚠️ Skipped '${file}' — invalid file naming format.`);
          continue;
        }

        const collectionName = fileParts[1]; // Use only 'Budget' from 'ExpensesTest.Budget.json'
        const filePath = path.join(dataDir, file);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (Array.isArray(jsonData)) {
          const processedData = jsonData.map(doc => {
            // Handle ObjectId and $date fields
            if (doc._id && typeof doc._id === 'object' && doc._id.$oid) {
              doc._id = new ObjectId(doc._id.$oid);
            }
            delete doc._id;
            
            // Process any $date fields
            processDates(doc);
            return doc;
          });

          // ✅ Insert into collection (automatically creates if it doesn’t exist)
          console.log(`🆕 Creating and importing into collection: '${collectionName}'`);
          await db.collection(collectionName).insertMany(processedData);
          console.log(`✅ Imported '${file}' into '${collectionName}'`);
        } else {
          console.warn(`⚠️ Skipped '${file}' — not an array of documents.`);
        }
      }
    }
  } catch (err) {
    console.error('❌ Error importing JSON files:', err);
  } finally {
    await client.close();
  }
}

importJSONFiles();

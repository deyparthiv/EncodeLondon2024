"use server";

import fs from 'fs/promises';

export async function submitBusiness(prevState, formData) {
  console.log(formData)
  console.log(formData.get('businessName'))

  // Convert FormData to JSON
  const jsonData = Object.fromEntries(formData.entries());
      
  // Read the existing JSON data, or create an empty array if the file doesn't exist
  let existingData = [];
  try {
    const fileData = await fs.readFile("./businesses.json", 'utf-8');
    existingData = JSON.parse(fileData);
  } catch (error) {
  }

  console.log(existingData)
  // Append the new data to the existing array
  existingData.push(jsonData);

  // Write the updated data back to the file
  await fs.writeFile("./businesses.json", JSON.stringify(existingData));

  return "success"
}
import { Builder, By, Key, until,Browser } from 'selenium-webdriver';
import { assert } from 'chai'; // Import assert function from Chai
// Import Axios if you haven't already
import axios from 'axios';

// Function to delete user by email
const deleteUserByEmail = async (email) => {
  try {
    const response = await axios.delete('/delete', {
      data: { email: email }, // Send email in the request body
    });

    // Check response status
    if (response.status === 200) {
      console.log('User deleted successfully');
      // Optionally, you can perform additional actions after successful deletion
    } else {
      console.log('Failed to delete user');
      // Handle other status codes if needed
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle errors
  }
};

describe("register test",function(){
    it("register test",async function(){
      await deleteUserByEmail('example@gmail.com');
    });
});







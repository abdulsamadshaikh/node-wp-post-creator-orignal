const path = require("path"); // Handles file and directory paths
const fs = require("fs");     // File system module for reading files
require("dotenv").config({ path: __dirname + '/.env' }); // Load .env file

// Import node-fetch for CommonJS
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Uploads an image to WordPress and creates a blog post with the uploaded image as the featured media.
 */
async function CreateWordPressPost() {
    // Load credentials and API endpoints from .env
    const ourusername = process.env.WORDPRESS_USERNAME;
    const ourpassword = process.env.WORDPRESS_PASSWORD;
    const mediaEndpoint = process.env.MEDIA_ENDPOINT;
    const postsEndpoint = process.env.POSTS_ENDPOINT;
    const githubProfileLink = process.env.GITHUB_PROFILE_LINK;

    // Validate environment variables
    // if (!ourusername || !ourpassword || !mediaEndpoint || !postsEndpoint || !githubProfileLink) {
    //     console.error("❌ Missing environment variables. Please check your .env file.");
    //     return;
    // }

    // console.log("Media Endpoint:", mediaEndpoint);
    // console.log("Posts Endpoint:", postsEndpoint);
    // console.log("GitHub Link:", githubProfileLink);

    // ================================
    // Step 1: Upload Image to WordPress
    // ================================

    // Get the image path from the local directory
    const imagepath = path.join(__dirname, "./assets/img/sample-1.jpg");

    // Read the image file as a buffer
    const imagebuffer = fs.readFileSync(imagepath);

    // Dynamically extract the file name from the path
    const filename = path.basename(imagepath); // This will return 'sample-1.jpg'

    // Create headers for the image upload request
    const { Headers } = require("node-fetch");
    const imagerequestheaders = new Headers();
    imagerequestheaders.set("Content-Type", "image/jpeg"); // Define content type as JPEG
    imagerequestheaders.set("Content-Disposition", `attachment; filename=${filename}`); // Set the file name
    imagerequestheaders.set("Authorization", "Basic " + Buffer.from(`${ourusername}:${ourpassword}`).toString("base64")); // Basic Auth

    // Make a POST request to upload the image to WordPress media library
    const imagepromise = await fetch(mediaEndpoint, { // Set your Media REST API endpoint
        method: "POST",
        headers: imagerequestheaders,
        body: imagebuffer // Attach image buffer as body
    });

    // Get the uploaded image response (contains media ID, URL, etc.)
    const imageresult = await imagepromise.json();

    // Check if the image was uploaded successfully
    if (!imageresult.id) {
        console.error("Image upload failed:", imageresult);
        return;
    }

    // ===============================
    // Step 2: Create Blog Post in WP
    // ===============================

    // Create headers for the blog post request
    const blogpostheaders = new Headers();
    blogpostheaders.set("Content-Type", "application/json"); // Sending JSON data
    blogpostheaders.set("Authorization", "Basic " + Buffer.from(`${ourusername}:${ourpassword}`).toString("base64")); // Basic Auth

    // Make a POST request to create a new blog post
    const blogPostResponse = await fetch(postsEndpoint, { // Set your Posts REST API endpoint
        method: "POST",
        headers: blogpostheaders,
        body: JSON.stringify({
            title: "Automated Post Creation Using Node.js and WordPress API - ENV", // Post title
            featured_media: imageresult.id,      // Attach uploaded image as featured image
            status: "publish",                   // Immediately publish the post
            content: `
                    <!-- wp:paragraph -->
                    <p>✨ This post was auto-generated using Node.js and the WordPress API.</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph -->
                    <p>🔗 <strong>Check out the creator's GitHub:</strong> <a href="${githubProfileLink}" target="_blank">${githubProfileLink}</a></p>
                    <!-- /wp:paragraph -->
                    `,                          // Post content
            comment_status: "closed"            // Disables comments for the post
        })
    });

    // Get the blog post response (contains post ID, status, etc.)
    const blogPostResult = await blogPostResponse.json();

    // Check if the post was created successfully
    if (blogPostResult.id) {
        console.log("✅ Post Created Successfully with ID:", blogPostResult.id);
    } else {
        console.error("❌ Post creation failed:", blogPostResult);
    }
}

// Run the function
CreateWordPressPost();
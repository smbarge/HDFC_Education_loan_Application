# start from the official Node.js 20 image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code
COPY . .

# Set environment variables
ENV PORT 5176
ENV MAX_REQUEST_SIZE=10mb
# ENV VITE_AUTH_API_SERVER=https://termloan2.mamfdc.in
ENV DB_URL=postgresql://hdfc_user:Admin@2024@65.1.113.133:5432/prodcopy_hdfc_db
ENV BODY_SIZE_LIMIT=10485760  
ENV VITE_KEYCLOAK_URL=https://keycloak.chanakyasoft.com
ENV VITE_FILE_URL=https://mamfdc.in
# Expose the port
EXPOSE 5176

# Build the app using npm run build
# RUN VITE_AUTH_API_SERVER=https://termloan2.mamfdc.in DB_URL=postgresql://hdfc_user:Admin@2024@65.1.113.133:5432/prodcopy_hdfc_db 
RUN npm run build

# Start the application and pass the BODY_SIZE_LIMIT environment variable
CMD ["sh", "-c", "BODY_SIZE_LIMIT=$BODY_SIZE_LIMIT node build/index.js"]


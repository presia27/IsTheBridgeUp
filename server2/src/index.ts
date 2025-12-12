/**
 * Server management code for the IsTheBridgeUp API
 * 
 * @author Preston Sia
 */

import createApp from "@/app";

const PORT = process.env.PORT || 8000;

/**
 * START the server
 * Includes graceful shutdown
 */
const startServer = async(): Promise<void> => {
  try {
    // Validate environment
    // todo

    // Connect to database
    // todo

    const app = createApp();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // GRACEFUL Shutdown Handling
    const gracefulShutdown = (sig: string) => {
      console.log(`\n Received ${sig}. Starting graceful shutdown...`);

      server.close(async(err) => {
        if (err) {
          console.error('Error during server shutdown: ', err);
          process.exit(1);
        }

        // todo disconnect from database
        
        console.log('Server closed successfully. Goodbye!');
        process.exit(0);
      });
    };

    // Register SIGNAL HANDLERS for graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));   // SIGTERM
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));     // SIGINT
  } catch (err) {
    console.error('Failed to start the server: ', err);
    process.exit(1);
  }
}
